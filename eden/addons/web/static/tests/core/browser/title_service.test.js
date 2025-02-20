import { beforeEach, describe, expect, test } from "@eden/hoot";
import { getService, makeMockEnv } from "@web/../tests/web_test_helpers";

describe.current.tags("headless");

let titleService;

beforeEach(async () => {
    await makeMockEnv();
    titleService = getService("title");
});

test("simple title", () => {
    titleService.setParts({ one: "MyEden" });
    expect(titleService.current).toBe("MyEden");
});

test("add title part", () => {
    titleService.setParts({ one: "MyEden", two: null });
    expect(titleService.current).toBe("MyEden");
    titleService.setParts({ three: "Import" });
    expect(titleService.current).toBe("MyEden - Import");
});

test("modify title part", () => {
    titleService.setParts({ one: "MyEden" });
    expect(titleService.current).toBe("MyEden");
    titleService.setParts({ one: "Zopenerp" });
    expect(titleService.current).toBe("Zopenerp");
});

test("delete title part", () => {
    titleService.setParts({ one: "MyEden" });
    expect(titleService.current).toBe("MyEden");
    titleService.setParts({ one: null });
    expect(titleService.current).toBe("Eden");
});

test("all at once", () => {
    titleService.setParts({ one: "MyEden", two: "Import" });
    expect(titleService.current).toBe("MyEden - Import");
    titleService.setParts({ one: "Zopenerp", two: null, three: "Sauron" });
    expect(titleService.current).toBe("Zopenerp - Sauron");
});

test("get title parts", () => {
    expect(titleService.current).toBe("");
    titleService.setParts({ one: "MyEden", two: "Import" });
    expect(titleService.current).toBe("MyEden - Import");
    const parts = titleService.getParts();
    expect(parts).toEqual({ one: "MyEden", two: "Import" });
    parts.action = "Export";
    expect(titleService.current).toBe("MyEden - Import"); // parts is a copy!
});
