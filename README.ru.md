#  Формирования 📞 номеров и 💰 валют

Мощная и гибкая библиотека для форматирования телефонных номеров и валют на основе кодов стран, а также с автоматическим определением страны. Эта библиотека поддерживает конфигурации для конкретных стран, используя коды стран ISO 3166-1 Alpha-2. 🇺🇳

## 🚀 Установка

```sh
npm install @xamrakulov/number-format
```

или

```sh
yarn add @xamrakulov/number-format
```

## 📌 Использование

### 💰 Форматирование валюты

```ts
import { currency } from "@xamrakulov/number-format";

currency(1000, "UZ").then(console.log);
// "1,000.00 UZS"

currency(1000, "KZ").then(console.log);
// "₸ 1 000,00"
```

### 📄 Гибкая конфигурация (number-format.config.js)

Вы можете переопределить настройки форматирования через файл `number-format.config.js` в корне проекта.

```js
module.exports = {
    defaultCountry: "KZ",
    currency: {
        KZ: {
            symbol_offset: "left",
            format: {
                thousands: " ",
                decimal: ","
            }
        }
    }
};
```

**Объяснение параметров:**

- `defaultCountry` — страна по умолчанию (ISO 3166-1 Alpha-2 код)
- `currency.KZ.symbol_offset` — позиция символа валюты (`left` или `right`)
- `currency.KZ.format.thousands` — разделитель тысяч
- `currency.KZ.format.decimal` — разделитель дробной части

### 📞 Форматирование номера телефона

##### Пример использования
```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone("901234567");
```

##### Результат

```
{
  format: "+998 (90) 123 45 67",
  data: {
    country: "Uzbekistan",
    region: "Central Asia",
    phone: {
      operator: "Beeline",
      legal: "Unitel LLC",
      technologies: ["GSM"],
      codes: [90, 91],
      type: "mobile",
      length: 2
    }
  }
}
```

#### Получение только форматированного номера

```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone.format("901234567");
console.log(formatted); // "+998 (90) 123 45 67"
```

#### Получение только данных

```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone.data("901234567");
console.log(formatted); // { country: "Uzbekistan", region: "Central Asia", ... }
```

## 📌 Структура данных

Каждая страна имеет свой JSON-файл с информацией о форматах номеров и валюте. Файлы хранятся в директории `countries/` и именуются по ISO 3166-1 Alpha-2 (например, `uz.json`, `kz.json`).

### Пример `kz.json`

```json
{
  "country": "Kazahstan",
  "region": "Central Asia",
  "phone": {
    "entities": [ /*...*/ ],
    "prefix": 7,
    "length": 11,
    "operators": [
      {
        "operator": "Altel",
        "legal": "Altel JV JSC",
        "technologies": ["GSM"],
        "codes": [700, 708],
        "types": "mobile",
        "length": 3
      },
      /*...*/
    ]
  },
  "currency": {
    "code": "KZT",
    "name": "Kazakhstani tenge",
    "symbol": "₸",
    "symbol_offset": "right",
    "minor": 100,
    "format": {
      "thousands": ",",
      "decimal": "."
    }
  }
}
```

## 🌎 Поддерживаемые страны

| Страна                                  | Код (ISO 3166-1 Alpha-2) |
|-----------------------------------------|--------------------------|
| 🇺🇿 Узбекистан                         | `UZ`                     |
| 🇰🇿 Казахстан                          | `KZ`                     |
| 🌐 Другие страны добавляются постепенно | `...`                    | 

## 📜 Лицензия
MIT

## 📫 Контакты

Автор: @Xamrakulov

