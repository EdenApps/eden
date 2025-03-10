/** @eden-module */

import { EdenUIPlugin } from "@spreadsheet/plugins";
import { helpers } from "@eden/o-spreadsheet";

const { UNDO_REDO_PIVOT_COMMANDS } = helpers;
UNDO_REDO_PIVOT_COMMANDS.push("UPDATE_EDEN_PIVOT_DOMAIN");

export class PivotEdenUIPlugin extends EdenUIPlugin {
    static getters = /** @type {const} */ ([]);

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "REFRESH_ALL_DATA_SOURCES":
                this.refreshAllPivots();
                break;
        }
    }

    /**
     * Refresh the cache of all the pivots
     */
    refreshAllPivots() {
        for (const pivotId of this.getters.getPivotIds()) {
            this.dispatch("REFRESH_PIVOT", { id: pivotId });
        }
    }
}
