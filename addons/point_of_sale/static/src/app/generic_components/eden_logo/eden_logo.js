import { Component } from "@eden/owl";

export class EdenLogo extends Component {
    static template = "point_of_sale.EdenLogo";
    static props = {
        class: { type: String, optional: true },
        style: { type: String, optional: true },
        monochrome: { type: Boolean, optional: true },
    };
    static defaultProps = {
        class: "",
        style: "",
        monochrome: false,
    };
}
