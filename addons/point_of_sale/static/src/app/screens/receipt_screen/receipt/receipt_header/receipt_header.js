import { _t } from "@web/core/l10n/translation";
import { Component } from "@eden/owl";

export class ReceiptHeader extends Component {
    static template = "point_of_sale.ReceiptHeader";
    static props = {
        data: {
            type: Object,
            shape: {
                company: Object,
                header: { type: [String, { value: false }], optional: true },
                cashier: { type: String, optional: true },
                "*": true,
            },
        },
    };
}
