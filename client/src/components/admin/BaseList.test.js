import { mount } from "@vue/test-utils";
import BaseList from "./BaseList";
import Vue from "vue";

describe("Categories", () => {
    const getter = async () => {
        return {
            data: [
                {
                    col_0: "col_0_0",
                    col_1: "col_0_1",
                },
                {
                    col_0: "col_0_2",
                    col_1: "col_0_3",
                },
            ],
        };
    };
    const setter = async () => {
        return {};
    };
    test("test categories loading", async () => {
        const wrapper = mount(BaseList, {
            propsData: {
                icon: "fa fa-caret-down",
                tooltip: "tooltip",
                plural: "plural",
                success: "success",
                fields: ["execute", "col_0", "col_1"],
                getter: getter,
                setter: setter,
            },
        });
        await Vue.nextTick();
        expect(wrapper.find(".card-header").text()).toContain("There are 2");
        const th = wrapper.findAll("th");
        expect(th.length).toBe(3);
        expect(th.at(0).text()).toBe("Execute");
        expect(th.at(1).text()).toBe("Col 0");
        expect(th.at(2).text()).toBe("Col 1");
    });
});
