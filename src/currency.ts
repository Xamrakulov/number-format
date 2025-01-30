import countries from "./countries";
const config = require("../numberformat.config");

export function currency(amount: number, countryCode?: string): string {
    const code = countryCode || config.defaultCountry;

    if (!countries[code]) {
        throw new Error(`Страна ${code} не найдена`);
    }

    const { currency } = countries[code];
    const { symbol, symbol_offset, format } = currency;

    // Форматируем число с разделителями
    const formattedNumber = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    }).replace(",", format.thousands).replace(".", format.decimal);

    // Определяем, куда ставить символ валюты
    return symbol_offset === "left" ? `${symbol} ${formattedNumber}` : `${formattedNumber} ${symbol}`;
}