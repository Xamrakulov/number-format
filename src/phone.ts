import fs from "fs";
import path from "path";
const config = require("../numberformat.config");

const countriesPath = path.join(__dirname, "countries");
const countryData: Record<string, any> = {};

// Загружаем все JSON-файлы
fs.readdirSync(countriesPath).forEach((file) => {
    if (file.endsWith(".json")) {
        const countryCode = file.replace(".json", "");
        const filePath = path.join(countriesPath, file);
        countryData[countryCode] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
});

const format = (number: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        number = number.replace(/\D/g, "");

        for (const country in countryData) {
            const { phone } = countryData[country];

            const prefix = phone.prefix.toString();
            const localLength = phone.length - prefix.length;

            if (number.length === localLength) {
                const operator = phone.operators.find((operator: any) =>
                    operator.codes.some((code: string) => number.startsWith(code))
                );

                if (operator) {
                    let formattedNumber = '+';
                    let localNumber = `${prefix}${number}`;

                    phone.entities.forEach((entity: any) => {
                        const part = localNumber.slice(entity.offset, entity.offset + entity.length);

                        if (entity.type === "operator_code") {
                            formattedNumber += `(${part}) `;
                        } else {
                            formattedNumber += part + " ";
                        }
                    });

                    resolve(formattedNumber.trim());
                }
            } else if (number.startsWith(prefix)) {
                let formattedNumber = `+`;

                phone.entities.forEach((entity: any) => {
                    const part = number.slice(entity.offset, entity.offset + entity.length);

                    if (entity.type === "operator_code") {
                        formattedNumber += `(${part}) `;
                    } else {
                        formattedNumber += part + " ";
                    }
                });

                resolve(formattedNumber.trim());
            }
        }

        const defaultPhone = countryData[config.defaultCountry]?.phone;
        if (defaultPhone) {
            resolve(`+${defaultPhone.prefix} ${number.slice(defaultPhone.prefix.toString().length)}`);
        }

        reject("Invalid number");
    });
}

const data = (number: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        number = number.replace(/\D/g, "");
        for (const country in countryData) {
            const { phone } = countryData[country];
            const prefix = phone.prefix.toString();
            const localLength = phone.length - prefix.length;

            if (number.length === localLength) {
                const operator = phone.operators.find((operator: any) =>
                    operator.codes.some((code: string) => number.startsWith(code))
                );

                if (operator) {
                    resolve(operator);
                }
            } else if (number.startsWith(prefix)) {
                const operator = phone.operators.find((operator: any) =>
                    operator.codes.some((code: string) => number.startsWith(code))
                );

                if (operator) {
                    resolve({
                        country: countryData[country].name,
                        region: countryData[country].region,
                        result: operator
                    });
                }
            }
        }

        reject("Operator not found");
    });
}

export const phone = {
    format,
    data
}

export default function (number: string): Promise<{ format: any, data: any }> {
    return new Promise((resolve, reject) => {
        try {
            if (!number || number.length < 7) {
                throw new Error("Invalid number"); // Добавляем проверку
            }

            const formatted = format(number);
            const operator = data(number);

            resolve({ format: formatted, data: operator });
        } catch (error) {
            reject(error);
        }
    });
};