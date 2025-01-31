/** @eden-module */
// @ts-check

import { parse, helpers, iterateAstNodes } from "@eden/o-spreadsheet";
import { isLoadingError } from "@spreadsheet/o_spreadsheet/errors";
import { loadBundle } from "@web/core/assets";
import { EdenSpreadsheetModel } from "@spreadsheet/model";
import { EdenDataProvider } from "@spreadsheet/data_sources/eden_data_provider";

const { formatValue, isDefined, toCartesian, toXC } = helpers;
import {
    isMarkdownViewUrl,
    isMarkdownIrMenuIdUrl,
    isIrMenuXmlUrl,
} from "@spreadsheet/ir_ui_menu/eden_menu_link_cell";

/**
 * @typedef {import("@spreadsheet").EdenSpreadsheetModel} EdenSpreadsheetModel
 */

export async function fetchSpreadsheetModel(env, resModel, resId) {
    const { data, revisions } = await env.services.orm.call(resModel, "join_spreadsheet_session", [
        resId,
    ]);
    return createSpreadsheetModel({ env, data, revisions });
}

export function createSpreadsheetModel({ env, data, revisions }) {
    const edenDataProvider = new EdenDataProvider(env);
    const model = new EdenSpreadsheetModel(data, { custom: { edenDataProvider } }, revisions);
    return model;
}

/**
 * @param {EdenSpreadsheetModel} model
 */
export async function waitForEdenSources(model) {
    const promises = model.getters
        .getEdenChartIds()
        .map((chartId) => model.getters.getChartDataSource(chartId).load());
    promises.push(
        ...model.getters
            .getPivotIds()
            .filter((pivotId) => model.getters.getPivotCoreDefinition(pivotId).type === "EDEN")
            .map((pivotId) => model.getters.getPivot(pivotId))
            .map((pivot) => pivot.load())
    );
    promises.push(
        ...model.getters
            .getListIds()
            .map((listId) => model.getters.getListDataSource(listId))
            .map((list) => list.load())
    );
    await Promise.all(promises);
}

/**
 * Ensure that the spreadsheet does not contains cells that are in loading state
 * @param {EdenSpreadsheetModel} model
 * @returns {Promise<void>}
 */
export async function waitForDataLoaded(model) {
    await waitForEdenSources(model);
    const edenDataProvider = model.config.custom.edenDataProvider;
    if (!edenDataProvider) {
        return;
    }
    await new Promise((resolve, reject) => {
        function check() {
            model.dispatch("EVALUATE_CELLS");
            if (isLoaded(model)) {
                edenDataProvider.removeEventListener("data-source-updated", check);
                resolve();
            }
        }
        edenDataProvider.addEventListener("data-source-updated", check);
        check();
    });
}

function containsLinkToEden(link) {
    if (link && link.url) {
        return (
            isMarkdownViewUrl(link.url) ||
            isIrMenuXmlUrl(link.url) ||
            isMarkdownIrMenuIdUrl(link.url)
        );
    }
}

/**
 * @param {EdenSpreadsheetModel} model
 * @returns {Promise<object>}
 */
export async function freezeEdenData(model) {
    await waitForDataLoaded(model);
    const data = model.exportData();
    for (const sheet of Object.values(data.sheets)) {
        sheet.formats ??= {};
        for (const [xc, cell] of Object.entries(sheet.cells)) {
            const { col, row } = toCartesian(xc);
            const sheetId = sheet.id;
            const position = { sheetId, col, row };
            const evaluatedCell = model.getters.getEvaluatedCell(position);
            if (containsEdenFunction(cell.content)) {
                const pivotId = model.getters.getPivotIdFromPosition(position);
                if (pivotId && model.getters.getPivotCoreDefinition(pivotId).type !== "EDEN") {
                    continue;
                }
                cell.content = evaluatedCell.value.toString();
                if (evaluatedCell.format) {
                    sheet.formats[xc] = getItemId(evaluatedCell.format, data.formats);
                }
                const spreadZone = model.getters.getSpreadZone(position);
                if (spreadZone) {
                    const { left, right, top, bottom } = spreadZone;
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            const xc = toXC(col, row);
                            const evaluatedCell = model.getters.getEvaluatedCell({
                                sheetId,
                                col,
                                row,
                            });
                            sheet.cells[xc] = {
                                ...sheet.cells[xc],
                                content: evaluatedCell.value.toString(),
                            };
                            if (evaluatedCell.format) {
                                sheet.formats[xc] = getItemId(evaluatedCell.format, data.formats);
                            }
                        }
                    }
                }
            }
            if (containsLinkToEden(evaluatedCell.link)) {
                cell.content = evaluatedCell.link.label;
            }
        }
        for (const figure of sheet.figures) {
            if (figure.tag === "chart" && figure.data.type.startsWith("eden_")) {
                await loadBundle("web.chartjs_lib");
                const img = edenChartToImage(model, figure);
                figure.tag = "image";
                figure.data = {
                    path: img,
                    size: { width: figure.width, height: figure.height },
                };
            }
        }
    }
    if (data.pivots) {
        data.pivots = Object.fromEntries(
            Object.entries(data.pivots).filter(([id, def]) => def.type !== "EDEN")
        );
    }
    data.lists = {};
    exportGlobalFiltersToSheet(model, data);
    return data;
}

/**
 * @param {EdenSpreadsheetModel} model
 * @returns {object}
 */
function exportGlobalFiltersToSheet(model, data) {
    model.getters.exportSheetWithActiveFilters(data);
    const locale = model.getters.getLocale();
    for (const filter of data.globalFilters) {
        const content = model.getters.getFilterDisplayValue(filter.label);
        filter["value"] = content
            .flat()
            .filter(isDefined)
            .map(({ value, format }) => formatValue(value, { format, locale }))
            .filter((formattedValue) => formattedValue !== "")
            .join(", ");
    }
}

/**
 * copy-pasted from o-spreadsheet. Should be exported
 * Get the id of the given item (its key in the given dictionnary).
 * If the given item does not exist in the dictionary, it creates one with a new id.
 */
export function getItemId(item, itemsDic) {
    for (const [key, value] of Object.entries(itemsDic)) {
        if (value === item) {
            return parseInt(key, 10);
        }
    }

    // Generate new Id if the item didn't exist in the dictionary
    const ids = Object.keys(itemsDic);
    const maxId = ids.length === 0 ? 0 : Math.max(...ids.map((id) => parseInt(id, 10)));

    itemsDic[maxId + 1] = item;
    return maxId + 1;
}

/**
 *
 * @param {string | undefined} content
 * @returns {boolean}
 */
function containsEdenFunction(content) {
    if (
        !content ||
        !content.startsWith("=") ||
        (!content.toUpperCase().includes("EDEN.") &&
            !content.toUpperCase().includes("_T") &&
            !content.toUpperCase().includes("PIVOT"))
    ) {
        return false;
    }
    try {
        const ast = parse(content);
        return iterateAstNodes(ast).some(
            (ast) =>
                ast.type === "FUNCALL" &&
                (ast.value.toUpperCase().startsWith("EDEN.") ||
                    ast.value.toUpperCase().startsWith("_T") ||
                    ast.value.toUpperCase().startsWith("PIVOT"))
        );
    } catch {
        return false;
    }
}

/**
 * @param {EdenSpreadsheetModel} model
 * @returns {boolean}
 */
function isLoaded(model) {
    for (const sheetId of model.getters.getSheetIds()) {
        for (const cell of Object.values(model.getters.getEvaluatedCells(sheetId))) {
            if (cell.type === "error" && isLoadingError(cell)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Return the chart figure as a base64 image.
 * "data:image/png;base64,iVBORw0KGg..."
 * @param {EdenSpreadsheetModel} model
 * @param {object} figure
 * @returns {string}
 */
function edenChartToImage(model, figure) {
    const runtime = model.getters.getChartRuntime(figure.id);
    // wrap the canvas in a div with a fixed size because chart.js would
    // fill the whole page otherwise
    const div = document.createElement("div");
    div.style.width = `${figure.width}px`;
    div.style.height = `${figure.height}px`;
    const canvas = document.createElement("canvas");
    div.append(canvas);
    canvas.setAttribute("width", figure.width);
    canvas.setAttribute("height", figure.height);
    // we have to add the canvas to the DOM otherwise it won't be rendered
    document.body.append(div);
    if (!("chartJsConfig" in runtime)) {
        return "";
    }
    runtime.chartJsConfig.plugins = [backgroundColorPlugin];
    // @ts-ignore
    const chart = new Chart(canvas, runtime.chartJsConfig);
    const img = chart.toBase64Image();
    chart.destroy();
    div.remove();
    return img;
}

/**
 * Custom chart.js plugin to set the background color of the canvas
 * https://github.com/chartjs/Chart.js/blob/8fdf76f8f02d31684d34704341a5d9217e977491/docs/configuration/canvas-background.md
 */
const backgroundColorPlugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    },
};
