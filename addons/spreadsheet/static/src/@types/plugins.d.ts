declare module "@spreadsheet" {
    import { CommandResult, CorePlugin, UIPlugin } from "@eden/o-spreadsheet";
    import { CommandResult as CR } from "@spreadsheet/o_spreadsheet/cancelled_reason";
    type EdenCommandResult = CommandResult | typeof CR;

    export interface EdenCorePlugin extends CorePlugin {
        getters: EdenCoreGetters;
        dispatch: EdenCoreDispatch;
        allowDispatch(command: AllCoreCommand): string | string[];
        beforeHandle(command: AllCoreCommand): void;
        handle(command: AllCoreCommand): void;
    }

    export interface EdenCorePluginConstructor {
        new (config: unknown): EdenCorePlugin;
    }

    export interface EdenUIPlugin extends UIPlugin {
        getters: EdenGetters;
        dispatch: EdenDispatch;
        allowDispatch(command: AllCommand): string | string[];
        beforeHandle(command: AllCommand): void;
        handle(command: AllCommand): void;
    }

    export interface EdenUIPluginConstructor {
        new (config: unknown): EdenUIPlugin;
    }
}
