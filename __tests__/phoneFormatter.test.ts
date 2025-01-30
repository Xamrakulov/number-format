import { phone } from "../src";

test("Форматирование узбекского номера", () => {
    expect(phone.format("998901234567")).toBe("+998 (90) 123 45 67");
});

test("Определения данных узбекского номера", () => {
    expect(phone.data("998901234567")).toEqual({
        country: "Uzbekistan",
        region: "Asia",
        result: {
            name: "Beeline",
            legal: "Unitel LLC",
            technologies: ["GSM"],
            codes: [90, 91],
            type: "mobile",
            length: 2
        }
    });
});