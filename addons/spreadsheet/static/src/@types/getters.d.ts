import { CorePlugin, Model, UID } from "@eden/o-spreadsheet";
import { ChartEdenMenuPlugin, EdenChartCorePlugin, EdenChartUIPlugin } from "@spreadsheet/chart";
import { CurrencyPlugin } from "@spreadsheet/currency/plugins/currency";
import { AccountingPlugin } from "addons/spreadsheet_account/static/src/plugins/accounting_plugin";
import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters";
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list";
import { IrMenuPlugin } from "@spreadsheet/ir_ui_menu/ir_ui_menu_plugin";
import { PivotEdenCorePlugin } from "@spreadsheet/pivot";
import { PivotCoreGlobalFilterPlugin } from "@spreadsheet/pivot/plugins/pivot_core_global_filter_plugin";

type Getters = Model["getters"];
type CoreGetters = CorePlugin["getters"];

/**
 * Union of all getter names of a plugin.
 *
 * e.g. With the following plugin
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type Names = GetterNames<typeof MyPlugin>
 * // is equivalent to "getCell" | "getCellValue"
 */
type GetterNames<Plugin extends { getters: readonly string[] }> = Plugin["getters"][number];

/**
 * Extract getter methods from a plugin, based on its `getters` static array.
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type MyPluginGetters = PluginGetters<typeof MyPlugin>;
 * // MyPluginGetters is equivalent to:
 * // {
 * //   getCell: () => ...,
 * //   getCellValue: () => ...,
 * // }
 */
type PluginGetters<Plugin extends { new (...args: unknown[]): any; getters: readonly string[] }> =
    Pick<InstanceType<Plugin>, GetterNames<Plugin>>;

declare module "@spreadsheet" {
    /**
     * Add getters from custom plugins defined in eden
     */

    interface EdenCoreGetters extends CoreGetters {}
    interface EdenCoreGetters extends PluginGetters<typeof GlobalFiltersCorePlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof ListCorePlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof EdenChartCorePlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof ChartEdenMenuPlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof IrMenuPlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof PivotEdenCorePlugin> {}
    interface EdenCoreGetters extends PluginGetters<typeof PivotCoreGlobalFilterPlugin> {}

    interface EdenGetters extends Getters {}
    interface EdenGetters extends EdenCoreGetters {}
    interface EdenGetters extends PluginGetters<typeof GlobalFiltersUIPlugin> {}
    interface EdenGetters extends PluginGetters<typeof ListUIPlugin> {}
    interface EdenGetters extends PluginGetters<typeof EdenChartUIPlugin> {}
    interface EdenGetters extends PluginGetters<typeof CurrencyPlugin> {}
    interface EdenGetters extends PluginGetters<typeof AccountingPlugin> {}
}
