/** @eden-module */

import { useSpreadsheetNotificationStore } from "@spreadsheet/hooks";
import { Spreadsheet, Model } from "@eden/o-spreadsheet";
import { Component } from "@eden/owl";

/**
 * Component wrapping the <Spreadsheet> component from o-spreadsheet
 * to add user interactions extensions from eden such as notifications,
 * error dialogs, etc.
 */
export class SpreadsheetComponent extends Component {
    static template = "spreadsheet.SpreadsheetComponent";
    static components = { Spreadsheet };
    static props = {
        model: Model,
    };

    get model() {
        return this.props.model;
    }
    setup() {
        useSpreadsheetNotificationStore();
    }
}
