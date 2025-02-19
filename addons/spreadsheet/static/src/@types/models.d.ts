declare module "@spreadsheet" {
    import { Model } from "@eden/o-spreadsheet";

    export interface EdenSpreadsheetModel extends Model {
        getters: EdenGetters;
        dispatch: EdenDispatch;
    }

    export interface EdenSpreadsheetModelConstructor {
        new (
            data: object,
            config: Partial<Model["config"]>,
            revisions: object[]
        ): EdenSpreadsheetModel;
    }
}
