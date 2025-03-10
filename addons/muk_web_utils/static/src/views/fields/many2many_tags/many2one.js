import { session } from "@web/session";
import { patch } from "@web/core/utils/patch";

import { many2ManyTagsField } from "@web/views/fields/many2many_tags/many2many_tags_field";

patch(many2ManyTagsField, {
    extractProps({ options }) {
        let res = super.extractProps(...arguments);
        if (
            session.disable_quick_create && 
            options.no_quick_create == undefined
        ) {
            res.canQuickCreate = false;
        }
        return res;
    }
});
