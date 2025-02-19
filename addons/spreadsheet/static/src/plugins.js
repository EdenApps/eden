/** @eden-module */

import { CorePlugin, UIPlugin } from "@eden/o-spreadsheet";

/**
 * An o-spreadsheet core plugin with access to all custom Eden plugins
 * @type {import("@spreadsheet").EdenCorePluginConstructor}
 **/
export const EdenCorePlugin = CorePlugin;

/**
 * An o-spreadsheet UI plugin with access to all custom Eden plugins
 * @type {import("@spreadsheet").EdenUIPluginConstructor}
 **/
export const EdenUIPlugin = UIPlugin;
