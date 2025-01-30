import countries from "./countries";
const config = require("../number-format.config");

export function currency(amount: number, countryCode?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const code = countryCode || config.defaultCountry;

        if (!countries[code]) {
            return reject(new Error(`Страна ${code} не найдена`));
        }

        let { currency } = countries[code];

        if (config.currency && config.currency[code]) {
            currency = {
                ...currency,
                ...config.currency[code],
                format: {
                    ...currency.format,
                    ...config.currency[code].format,
                },
            };
        }

        const { symbol, symbol_offset, format } = currency;

        const formattedNumber = amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        }).replace(",", format.thousands).replace(".", format.decimal);

        resolve(symbol_offset === "left" ? `${symbol} ${formattedNumber}` : `${formattedNumber} ${symbol}`);
    });
}