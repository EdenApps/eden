/** @eden-module */

/**
 * This file is meant to load the different subparts of the module
 * to guarantee their plugins are loaded in the right order
 *
 * dependency:
 *             other plugins
 *                   |
 *                  ...
 *                   |
 *                filters
 *                /\    \
 *               /  \    \
 *           pivot  list  Eden chart
 */

/** TODO: Introduce a position parameter to the plugin registry in order to load them in a specific order */
import * as spreadsheet from "@eden/o-spreadsheet";
const { corePluginRegistry, coreViewsPluginRegistry } = spreadsheet.registries;

import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters/index";
import { PivotEdenCorePlugin, PivotUIGlobalFilterPlugin } from "@spreadsheet/pivot/index"; // list depends on filter for its getters
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list/index"; // pivot depends on filter for its getters
import {
    ChartEdenMenuPlugin,
    EdenChartCorePlugin,
    EdenChartUIPlugin,
} from "@spreadsheet/chart/index"; // Edenchart depends on filter for its getters
import { PivotCoreGlobalFilterPlugin } from "./pivot/plugins/pivot_core_global_filter_plugin";
import { PivotEdenUIPlugin } from "./pivot/plugins/pivot_eden_ui_plugin";

corePluginRegistry.add("EdenGlobalFiltersCorePlugin", GlobalFiltersCorePlugin);
corePluginRegistry.add("PivotEdenCorePlugin", PivotEdenCorePlugin);
corePluginRegistry.add("EdenPivotGlobalFiltersCorePlugin", PivotCoreGlobalFilterPlugin);
corePluginRegistry.add("EdenListCorePlugin", ListCorePlugin);
corePluginRegistry.add("edenChartCorePlugin", EdenChartCorePlugin);
corePluginRegistry.add("chartEdenMenuPlugin", ChartEdenMenuPlugin);

coreViewsPluginRegistry.add("EdenGlobalFiltersUIPlugin", GlobalFiltersUIPlugin);
coreViewsPluginRegistry.add("EdenPivotGlobalFilterUIPlugin", PivotUIGlobalFilterPlugin);
coreViewsPluginRegistry.add("EdenListUIPlugin", ListUIPlugin);
coreViewsPluginRegistry.add("edenChartUIPlugin", EdenChartUIPlugin);
coreViewsPluginRegistry.add("edenPivotUIPlugin", PivotEdenUIPlugin);
