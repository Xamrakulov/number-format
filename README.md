# 📞 Number & 💰 Currency Formatter

A powerful and flexible library for formatting phone numbers and currencies based on country codes, as well as with automatic country detection. This library supports country-specific configurations using ISO 3166-1 Alpha-2 country codes. 🇺🇳

## 🚀 Installation

```sh
npm install @xamrakulov/number-format
```

or

```sh
yarn add @xamrakulov/number-format
```

## 📌 Usage

### 💰 Formatting the currency

```ts
import { currency } from "@xamrakulov/number-format";

currency(1000, "UZ").then(console.log);
// "1,000.00 UZS"

currency(1000, "KZ").then(console.log);
// "₸ 1 000,00"
```

## 📄 Flexible configuration (number-format.config.js)

You can override the formatting settings via the `number-format.config' file.js` is at the root of the project.

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

**Explanation of the parameters:**

- `defaultCountry` — default country (ISO 3166-1 Alpha-2 code)
- `currency.KZ.symbol_offset` — currency symbol position (`left` or `right`)
- `currency.KZ.format.thousands` — thousands separator
- `currency.KZ.format.decimal` — decimal separator

### 📞 Formatting the phone number

##### Usage example
```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone("901234567");
```

##### Result

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

#### Getting formatted numbers only

```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone.format("901234567");
console.log(formatted); // "+998 (90) 123 45 67"
```

#### Getting data only

```ts
import { phone } from "@xamrakulov/number-format";

const formatted = phone.data("901234567");
console.log(formatted); // { country: "Uzbekistan", region: "Central Asia", ... }
```

## 📌 Data structure

Each country has its own JSON file with information about the number formats and currency. The files are stored in the directory `countries/` and are named according to ISO 3166-1 Alpha-2 (for example, `uz.json`, `kz.json`).

### Example of `kz.json`

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

## 🌎 Supported countries

| Country                                | Code (ISO 3166-1 Alpha-2) |
|----------------------------------------|---------------------------|
| 🇺🇿 Uzbekistan                        | `UZ`                      |
| 🇰🇿 Kazakhstan                        | `KZ`                      |
| 🌐 Other countries are added gradually | `...`                     | 

## 📜 License
MIT

## 📫 Contacts

Author: @Xamrakulov