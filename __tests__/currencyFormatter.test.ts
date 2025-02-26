import { currency } from "../src";

test("Formatting currency for Uzbekistan", () => {
    expect(currency(1000, 'UZ')).resolves.toBe("1,000.00 UZS");
});

test("Formatting currency for Kazakhstan", () => {
    expect(currency(1000, "KZ")).resolves.toBe("1,000.00 ₸");
});