/** @eden-module */

import { EdenCorePlugin } from "@spreadsheet/plugins";
import { coreTypes, helpers } from "@eden/o-spreadsheet";
import { omit } from "@web/core/utils/objects";
const { deepEquals } = helpers;

/** Plugin that link charts with Eden menus. It can contain either the Id of the eden menu, or its xml id. */
export class ChartEdenMenuPlugin extends EdenCorePlugin {
    static getters = /** @type {const} */ (["getChartEdenMenu"]);
    constructor(config) {
        super(config);
        this.edenMenuReference = {};
    }

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "LINK_EDEN_MENU_TO_CHART":
                this.history.update("edenMenuReference", cmd.chartId, cmd.edenMenuId);
                break;
            case "DELETE_FIGURE":
                this.history.update("edenMenuReference", cmd.id, undefined);
                break;
            case "DUPLICATE_SHEET":
                this.updateOnDuplicateSheet(cmd.sheetId, cmd.sheetIdTo);
                break;
        }
    }

    updateOnDuplicateSheet(sheetIdFrom, sheetIdTo) {
        for (const oldChartId of this.getters.getChartIds(sheetIdFrom)) {
            if (!this.edenMenuReference[oldChartId]) {
                continue;
            }
            const oldChartDefinition = this.getters.getChartDefinition(oldChartId);
            const oldFigure = this.getters.getFigure(sheetIdFrom, oldChartId);
            const newChartId = this.getters.getChartIds(sheetIdTo).find((newChartId) => {
                const newChartDefinition = this.getters.getChartDefinition(newChartId);
                const newFigure = this.getters.getFigure(sheetIdTo, newChartId);
                return (
                    deepEquals(oldChartDefinition, newChartDefinition) &&
                    deepEquals(omit(newFigure, "id"), omit(oldFigure, "id")) // compare size and position
                );
            });

            if (newChartId) {
                this.history.update(
                    "edenMenuReference",
                    newChartId,
                    this.edenMenuReference[oldChartId]
                );
            }
        }
    }

    /**
     * Get eden menu linked to the chart
     *
     * @param {string} chartId
     * @returns {object | undefined}
     */
    getChartEdenMenu(chartId) {
        const menuId = this.edenMenuReference[chartId];
        return menuId ? this.getters.getIrMenu(menuId) : undefined;
    }

    import(data) {
        if (data.chartEdenMenusReferences) {
            this.edenMenuReference = data.chartEdenMenusReferences;
        }
    }

    export(data) {
        data.chartEdenMenusReferences = this.edenMenuReference;
    }
}

coreTypes.add("LINK_EDEN_MENU_TO_CHART");
