import { phone } from "../dist";
import format from "../dist/phone";

test("Formatting Uzbekistan phone number", () => {
    expect(phone.format("901234567")).resolves.toBe("+998 (90) 123 45 67");
});

test("Formatting Uzbekistan phone number with prefix", () => {
    expect(phone.format("998901234567")).resolves.toBe("+998 (90) 123 45 67");
});

test("Formatting Uzbekistan phone number with prefix and plus", () => {
    expect(phone.format("+998901234567")).resolves.toBe("+998 (90) 123 45 67");
});

test("Formatting Kazakhstan phone number", () => {
    expect(phone.format("7073456789")).resolves.toBe("+7 (707) 345 67 89");
});

test("Formatting Kazakhstan phone number with prefix", () => {
    expect(phone.format("77073456789")).resolves.toBe("+7 (707) 345 67 89");
});

test("Formatting Kazakhstan phone number with prefix and plus", () => {
    expect(phone.format("+77073456789")).resolves.toBe("+7 (707) 345 67 89");
});

test("Formatting invalid phone number", () => {
    expect(phone.format("123456789")).rejects.toBe("Invalid number");
});

// test format function from src/index.ts

describe('format', () => {
    it('should return formatted number and operator data', async () => {
        const mockNumber = '998901234567'; // Тестовый номер
        const result = await format(mockNumber);

        expect(result).toHaveProperty('format'); // Проверяем, что есть format
        expect(result).toHaveProperty('data'); // Проверяем, что есть data

        console.log(result); // Для дебага можно вывести результат
    });

    it('should throw an error if number is invalid', async () => {
        const invalidNumber = '123';

        await expect(format(invalidNumber)).rejects.toThrow();
    });
});