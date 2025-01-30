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

const format = (number: string): string => {
    // Убираем все нецифровые символы
    number = number.replace(/\D/g, "");

    for (const country in countryData) {
        const { phone } = countryData[country];

        // Получаем префикс страны и вычисляем длину номера
        const prefix = phone.prefix.toString();
        const localLength = phone.length - prefix.length;

        // Если номер без префикса, то проверяем длину номера и код оператора
        if (number.length === localLength) {
            // Проверяем наличие оператора по коду
            const operator = phone.operators.find((operator: any) =>
                operator.codes.some((code: string) => number.startsWith(code))
            );

            if (operator) {
                // Если оператор найден, добавляем префикс и начинаем форматировать
                let formattedNumber = '+';

                // Убираем префикс и получаем местный номер
                let localNumber = `${prefix}${number}`;

                // Форматируем номер в зависимости от entities
                phone.entities.forEach((entity: any) => {
                    const part = localNumber.slice(entity.offset, entity.offset + entity.length);

                    // Если это операторский код, то помещаем в скобки
                    if (entity.type === "operator_code") {
                        formattedNumber += `(${part}) `;
                    } else {
                        formattedNumber += part + " ";
                    }
                });

                return formattedNumber.trim();
            }
        } else if (number.startsWith(prefix)) {
            // Если номер уже начинается с префикса, начинаем с местной части
            let formattedNumber = `+`;

            // Форматируем номер в зависимости от entities
            phone.entities.forEach((entity: any) => {
                const part = number.slice(entity.offset, entity.offset + entity.length);

                // Если это операторский код, то помещаем в скобки
                if (entity.type === "operator_code") {
                    formattedNumber += `(${part}) `;
                } else {
                    formattedNumber += part + " ";
                }
            });

            return formattedNumber.trim();
        }
    }

    // Если не удалось определить страну, используем дефолтную из `numberformat.config.js`
    const defaultPhone = countryData[config.defaultCountry]?.phone;
    if (defaultPhone) {
        let formattedNumber = `+${defaultPhone.prefix} ${number.slice(defaultPhone.prefix.toString().length)}`;
        return formattedNumber;
    }

    return number; // Возвращаем номер в исходном виде, если ничего не найдено
}

const data = (number: string) => {
    number = number.replace(/\D/g, ""); // Убираем все нецифровые символы

    for (const countryCode in countryData) {
        const { phone } = countryData[countryCode];

        // Проверка, начинается ли номер с префикса страны
        const prefix = phone.prefix.toString();
        if (number.startsWith(prefix)) {
            // Убираем префикс из номера и проверяем на оператора
            let localNumber = number.slice(prefix.length);

            // Ищем оператора по коду
            for (const operator of phone.operators) {
                for (const code of operator.codes) {
                    if (localNumber.startsWith(code.toString())) {
                        // Если нашли операторский код, возвращаем информацию
                        return {
                            country: countryData[countryCode].country, // Название страны
                            region: countryData[countryCode].region, // Регион
                            result: {
                                name: operator.operator,
                                legal: operator.legal,
                                technologies: operator.technologies,
                                codes: operator.codes,
                                type: operator.type,
                                length: operator.length
                            }
                        };
                    }
                }
            }
        }
    }

    return null; // Если оператор не найден
}

export const phone = {
    format,
    data
}