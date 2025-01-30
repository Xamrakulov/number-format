import { currency } from "../dist";

test("Formatting currency for Uzbekistan", () => {
    expect(currency(1000, "UZ")).toBe("1,000.00 UZS");
});

test("Formatting currency for Kazakhstan", () => {
    expect(currency(1000, "KZ")).toBe("1,000.00 ₸");
});