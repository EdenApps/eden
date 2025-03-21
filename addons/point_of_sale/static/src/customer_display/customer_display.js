import { Component, useState, whenReady } from "@eden/owl";
import { EdenLogo } from "@point_of_sale/app/generic_components/eden_logo/eden_logo";
import { OrderWidget } from "@point_of_sale/app/generic_components/order_widget/order_widget";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";
import { MainComponentsContainer } from "@web/core/main_components_container";
import { session } from "@web/session";
import { useService } from "@web/core/utils/hooks";
import { mountComponent } from "@web/env";
import { roundPrecision as round_pr } from "@web/core/utils/numbers";

export class CustomerDisplay extends Component {
    static template = "point_of_sale.CustomerDisplay";
    static components = { EdenLogo, OrderWidget, Orderline, MainComponentsContainer };
    static props = [];
    setup() {
        this.session = session;
        this.dialog = useService("dialog");
        this.order = useState(useService("customer_display_data"));
    }

    get netWeight() {
        const weight = round_pr(this.order.weight || 0, this.order.scaleData.uomRounding);
        const weightRound = weight.toFixed(
            Math.ceil(Math.log(1.0 / this.order.scaleData.uomRounding) / Math.log(10))
        );
        return weightRound - parseFloat(this.order.tare);
    }
}
whenReady(() => mountComponent(CustomerDisplay, document.body));
