import { SpreadsheetChildEnv as SSChildEnv } from "@eden/o-spreadsheet";
import { Services } from "services";

declare module "@spreadsheet" {
    import { Model } from "@eden/o-spreadsheet";

    export interface SpreadsheetChildEnv extends SSChildEnv {
        model: EdenSpreadsheetModel;
        services: Services;
    }
}
