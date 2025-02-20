import {
    defineModels,
    fields,
    models,
    mountView,
    mountWithCleanup,
} from "@web/../tests/web_test_helpers";
import { Component, xml } from "@eden/owl";
import { expect, test } from "@eden/hoot";
import { DocumentationLink } from "@web/views/widgets/documentation_link/documentation_link";

class Partner extends models.Model {
    bar = fields.Boolean();
}

defineModels([Partner]);

test("documentation_link: default label and icon", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/this_is_a_test.html"/>
        </form>`,
    });
    expect(".o_doc_link").toHaveText("View Documentation");
    expect("a.alert-link").toHaveCount(0);
    expect(".o_doc_link .fa-external-link").toHaveCount(1);
});

test("documentationLink: alert-link", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/this_is_a_test.html" alert_link="true"/>
        </form>`,
    });
    expect("a.alert-link").toHaveCount(1);
});

test("DocumentationLink Component: alert-link", async () => {
    class Parent extends Component {
        static components = { DocumentationLink };
        static template = xml`
        <DocumentationLink path="'/this_is_a_test.html'" alertLink="true"/>`;
        static props = ["*"];
    }
    await mountWithCleanup(Parent);
    expect("a.alert-link").toHaveCount(1);
});

test("documentation_link: given label", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/this_is_a_test.html" label="docdoc"/>
        </form>`,
    });
    expect(".o_doc_link").toHaveText("docdoc");
    expect(".o_doc_link .fa").toHaveCount(0);
});

test("documentation_link: given icon", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/this_is_a_test.html" icon="fa-question-circle"/>
        </form>`,
    });
    expect(".o_doc_link").toHaveText("");
    expect(".o_doc_link .fa-question-circle").toHaveCount(1);
});

test("documentation_link: given label and icon", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/this_is_a_test.html" label="docdoc" icon="fa-question-circle"/>
        </form>`,
    });
    expect(".o_doc_link").toHaveText("docdoc");
    expect(".o_doc_link .fa-question-circle").toHaveCount(1);
});

test("documentation_link: relative path", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="/applications/technical/web/settings/this_is_a_test.html"/>
        </form>`,
    });
    expect(".o_doc_link").toHaveAttribute(
        "href",
        "https://www.edencloud.us/documentation/1.0/applications/technical/web/settings/this_is_a_test.html"
    );
});

test("documentation_link: absolute path (http)", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
            <form>
                <field name="bar"/>
                <widget name="documentation_link" path="http://www.edencloud.us/"/>
            </form>`,
    });
    expect(".o_doc_link").toHaveAttribute("href", "http://www.edencloud.us/");
});

test("documentation_link: absolute path (https)", async () => {
    await mountView({
        type: "form",
        resModel: "partner",
        arch: /* xml */ `
        <form>
            <field name="bar"/>
            <widget name="documentation_link" path="https://www.edencloud.us/"/>
        </form>`,
    });

    expect(".o_doc_link").toHaveAttribute("href", "https://www.edencloud.us/");
});
