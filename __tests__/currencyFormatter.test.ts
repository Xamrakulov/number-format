import { currency } from "../src";

test("Форматирование валюты для Узбекистана", () => {
    expect(currency(1000, "UZ")).toBe("1,000.00 UZS");
});