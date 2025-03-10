/** @eden-module */

import * as spreadsheet from "@eden/o-spreadsheet";

const { chartComponentRegistry } = spreadsheet.registries;
const { ChartJsComponent } = spreadsheet.components;

chartComponentRegistry.add("eden_bar", ChartJsComponent);
chartComponentRegistry.add("eden_line", ChartJsComponent);
chartComponentRegistry.add("eden_pie", ChartJsComponent);

import { EdenChartCorePlugin } from "./plugins/eden_chart_core_plugin";
import { ChartEdenMenuPlugin } from "./plugins/chart_eden_menu_plugin";
import { EdenChartUIPlugin } from "./plugins/eden_chart_ui_plugin";

export { EdenChartCorePlugin, ChartEdenMenuPlugin, EdenChartUIPlugin };
