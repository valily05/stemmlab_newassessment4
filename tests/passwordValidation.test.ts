jest.mock("../utils/profanityFilter", () => ({
  containsOffensiveContent: jest.fn(() => false),
}));

import { validatePassword } from "../utils/passwordValidation";


describe("validatePassword", () => {

    test("accepts a strong password", () => {
        const result = validatePassword("StrongPass123!");

        expect(result.isValid).toBe(true);
        expect(result.score).toBe(5);
    });

    test("rejects password shorter than 8 characters", () => {
        const result = validatePassword("Ab1!");

        expect(result.hasMinLength).toBe(false);
        expect(result.isValid).toBe(false);
    });

    test("rejects password without lowercase letters", () => {
        const result = validatePassword("PASSWORD123!");

        expect(result.hasLowercase).toBe(false);
        expect(result.isValid).toBe(false);
    });

    test("rejects password without uppercase letters", () => {
        const result = validatePassword("password123!");

        expect(result.hasUppercase).toBe(false);
        expect(result.isValid).toBe(false);
    });

    test("rejects password without numbers", () => {
        const result = validatePassword("Password!");

        expect(result.hasNumber).toBe(false);
        expect(result.isValid).toBe(false);
    });

    test("rejects password without special characters", () => {
        const result = validatePassword("Password123");

        expect(result.hasSpecial).toBe(false);
        expect(result.isValid).toBe(false);
    });

    test("detects common password", () => {
        const result = validatePassword("password");

        expect(result.isCommonPassword).toBe(true);
        expect(result.isValid).toBe(false);
    });

});