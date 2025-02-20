import { test } from "@eden/hoot";
import { testEditor } from "./_helpers/editor";

test("should remove empty class attribute", async () => {
    // content after is compared after cleaning up DOM
    await testEditor({
        contentBefore: '<div class=""></div>',
        contentAfter: "<div></div>",
    });
});
