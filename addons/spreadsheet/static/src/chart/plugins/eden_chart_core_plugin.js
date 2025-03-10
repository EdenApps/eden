/** @eden-module */
import { globalFiltersFieldMatchers } from "@spreadsheet/global_filters/plugins/global_filters_core_plugin";
import { checkFilterFieldMatching } from "@spreadsheet/global_filters/helpers";
import { CommandResult } from "../../o_spreadsheet/cancelled_reason";
import { Domain } from "@web/core/domain";
import { EdenCorePlugin } from "@spreadsheet/plugins";
import { _t } from "@web/core/l10n/translation";

/**
 * @typedef {Object} Chart
 * @property {Object} fieldMatching
 *
 * @typedef {import("@spreadsheet").FieldMatching} FieldMatching
 */

const CHART_PLACEHOLDER_DISPLAY_NAME = {
    eden_bar: _t("Eden Bar Chart"),
    eden_line: _t("Eden Line Chart"),
    eden_pie: _t("Eden Pie Chart"),
};

export class EdenChartCorePlugin extends EdenCorePlugin {
    static getters = /** @type {const} */ ([
        "getEdenChartIds",
        "getChartFieldMatch",
        "getEdenChartDisplayName",
        "getEdenChartFieldMatching",
    ]);

    constructor(config) {
        super(config);

        /** @type {Object.<string, Chart>} */
        this.charts = {};

        globalFiltersFieldMatchers["chart"] = {
            getIds: () => this.getters.getEdenChartIds(),
            getDisplayName: (chartId) => this.getters.getEdenChartDisplayName(chartId),
            getFieldMatching: (chartId, filterId) =>
                this.getEdenChartFieldMatching(chartId, filterId),
            getModel: (chartId) =>
                this.getters.getChart(chartId).getDefinitionForDataSource().metaData.resModel,
        };
    }

    allowDispatch(cmd) {
        switch (cmd.type) {
            case "ADD_GLOBAL_FILTER":
            case "EDIT_GLOBAL_FILTER":
                if (cmd.chart) {
                    return checkFilterFieldMatching(cmd.chart);
                }
        }
        return CommandResult.Success;
    }

    /**
     * Handle a spreadsheet command
     *
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "CREATE_CHART": {
                switch (cmd.definition.type) {
                    case "eden_pie":
                    case "eden_bar":
                    case "eden_line":
                        this._addEdenChart(cmd.id);
                        break;
                }
                break;
            }
            case "DELETE_FIGURE": {
                const charts = { ...this.charts };
                delete charts[cmd.id];
                this.history.update("charts", charts);
                break;
            }
            case "REMOVE_GLOBAL_FILTER":
                this._onFilterDeletion(cmd.id);
                break;
            case "ADD_GLOBAL_FILTER":
            case "EDIT_GLOBAL_FILTER":
                if (cmd.chart) {
                    this._setEdenChartFieldMatching(cmd.filter.id, cmd.chart);
                }
                break;
        }
    }

    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------

    /**
     * Get all the eden chart ids
     * @returns {Array<string>}
     */
    getEdenChartIds() {
        return Object.keys(this.charts);
    }

    /**
     * @param {string} chartId
     * @returns {string}
     */
    getChartFieldMatch(chartId) {
        return this.charts[chartId].fieldMatching;
    }

    /**
     *
     * @param {string} chartId
     * @returns {string}
     */
    getEdenChartDisplayName(chartId) {
        const { title, type } = this.getters.getChart(chartId);
        const name = title.text || CHART_PLACEHOLDER_DISPLAY_NAME[type];
        return `(#${this.getEdenChartIds().indexOf(chartId) + 1}) ${name}`;
    }

    /**
     * Import the charts
     *
     * @param {Object} data
     */
    import(data) {
        for (const sheet of data.sheets) {
            if (sheet.figures) {
                for (const figure of sheet.figures) {
                    if (figure.tag === "chart" && figure.data.type.startsWith("eden_")) {
                        this._addEdenChart(figure.id, figure.data.fieldMatching);
                    }
                }
            }
        }
    }
    /**
     * Export the chart
     *
     * @param {Object} data
     */
    export(data) {
        for (const sheet of data.sheets) {
            if (sheet.figures) {
                for (const figure of sheet.figures) {
                    if (figure.tag === "chart" && figure.data.type.startsWith("eden_")) {
                        figure.data.fieldMatching = this.getChartFieldMatch(figure.id);
                        figure.data.searchParams.domain = new Domain(
                            figure.data.searchParams.domain
                        ).toJson();
                    }
                }
            }
        }
    }
    // -------------------------------------------------------------------------
    // Private
    // -------------------------------------------------------------------------

    /**
     * Get the current edenChartFieldMatching of a chart
     *
     * @param {string} chartId
     * @param {string} filterId
     */
    getEdenChartFieldMatching(chartId, filterId) {
        return this.charts[chartId].fieldMatching[filterId];
    }

    /**
     * Sets the current edenChartFieldMatching of a chart
     *
     * @param {string} filterId
     * @param {Record<string,FieldMatching>} chartFieldMatches
     */
    _setEdenChartFieldMatching(filterId, chartFieldMatches) {
        const charts = { ...this.charts };
        for (const [chartId, fieldMatch] of Object.entries(chartFieldMatches)) {
            charts[chartId].fieldMatching[filterId] = fieldMatch;
        }
        this.history.update("charts", charts);
    }

    _onFilterDeletion(filterId) {
        const charts = { ...this.charts };
        for (const chartId in charts) {
            this.history.update("charts", chartId, "fieldMatching", filterId, undefined);
        }
    }

    /**
     * @param {string} chartId
     * @param {Object} fieldMatching
     */
    _addEdenChart(chartId, fieldMatching = undefined) {
        const charts = { ...this.charts };
        if (!fieldMatching) {
            const model = this.getters.getChartDefinition(chartId).metaData.resModel;
            fieldMatching = this.getters.getFieldMatchingForModel(model);
        }
        charts[chartId] = {
            fieldMatching,
        };
        this.history.update("charts", charts);
    }
}
