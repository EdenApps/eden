import { FieldMatching } from "./global_filter.d";
import {
    CorePlugin,
    UIPlugin,
    DispatchResult,
    CommandResult,
    AddPivotCommand,
    UpdatePivotCommand,
    CancelledReason,
} from "@eden/o-spreadsheet";
import * as EdenCancelledReason from "@spreadsheet/o_spreadsheet/cancelled_reason";

type CoreDispatch = CorePlugin["dispatch"];
type UIDispatch = UIPlugin["dispatch"];
type CoreCommand = Parameters<CorePlugin["allowDispatch"]>[0];
type Command = Parameters<UIPlugin["allowDispatch"]>[0];

// TODO look for a way to remove this and use the real import * as EdenCancelledReason
type EdenCancelledReason = string;

declare module "@spreadsheet" {
    interface EdenCommandDispatcher {
        dispatch<T extends EdenCommandTypes, C extends Extract<EdenCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): EdenDispatchResult;
        dispatch<T extends EdenCommandTypes, C extends Extract<EdenCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): EdenDispatchResult;
    }

    interface EdenCoreCommandDispatcher {
        dispatch<T extends EdenCoreCommandTypes, C extends Extract<EdenCoreCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): EdenDispatchResult;
        dispatch<T extends EdenCoreCommandTypes, C extends Extract<EdenCoreCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): EdenDispatchResult;
    }

    interface EdenDispatchResult extends DispatchResult {
        readonly reasons: (CancelledReason | EdenCancelledReason)[];
        isCancelledBecause(reason: CancelledReason | EdenCancelledReason): boolean;
    }

    type EdenCommandTypes = EdenCommand["type"];
    type EdenCoreCommandTypes = EdenCoreCommand["type"];

    type EdenDispatch = UIDispatch & EdenCommandDispatcher["dispatch"];
    type EdenCoreDispatch = CoreDispatch & EdenCoreCommandDispatcher["dispatch"];

    // CORE

    export interface ExtendedAddPivotCommand extends AddPivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface ExtendedUpdatePivotCommand extends UpdatePivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface AddThreadCommand {
        type: "ADD_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    export interface EditThreadCommand {
        type: "EDIT_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
        isResolved: boolean;
    }

    export interface DeleteThreadCommand {
        type: "DELETE_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    // this command is deprecated. use UPDATE_PIVOT instead
    export interface UpdatePivotDomainCommand {
        type: "UPDATE_EDEN_PIVOT_DOMAIN";
        pivotId: string;
        domain: Array;
    }

    export interface AddGlobalFilterCommand {
        type: "ADD_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface EditGlobalFilterCommand {
        type: "EDIT_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface RemoveGlobalFilterCommand {
        type: "REMOVE_GLOBAL_FILTER";
        id: string;
    }

    export interface MoveGlobalFilterCommand {
        type: "MOVE_GLOBAL_FILTER";
        id: string;
        delta: number;
    }

    // UI

    export interface RefreshAllDataSourcesCommand {
        type: "REFRESH_ALL_DATA_SOURCES";
    }

    export interface SetGlobalFilterValueCommand {
        type: "SET_GLOBAL_FILTER_VALUE";
        id: string;
        value: any;
        displayNames?: string[];
    }

    export interface SetManyGlobalFilterValueCommand {
        type: "SET_MANY_GLOBAL_FILTER_VALUE";
        filters: { filterId: string; value: any }[];
    }

    export interface ClearGlobalFilterValueCommand {
        type: "CLEAR_GLOBAL_FILTER_VALUE";
        id: string;
    }

    type EdenCoreCommand =
        | ExtendedAddPivotCommand
        | ExtendedUpdatePivotCommand
        | UpdatePivotDomainCommand
        | AddThreadCommand
        | DeleteThreadCommand
        | EditThreadCommand
        | AddGlobalFilterCommand
        | EditGlobalFilterCommand
        | RemoveGlobalFilterCommand
        | MoveGlobalFilterCommand;

    export type AllCoreCommand = EdenCoreCommand | CoreCommand;

    type EdenLocalCommand =
        | RefreshAllDataSourcesCommand
        | SetGlobalFilterValueCommand
        | SetManyGlobalFilterValueCommand
        | ClearGlobalFilterValueCommand;

    type EdenCommand = EdenCoreCommand | EdenLocalCommand;

    export type AllCommand = EdenCommand | Command;
}
