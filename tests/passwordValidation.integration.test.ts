import { validatePassword } from "../utils/passwordValidation";
import { containsOffensiveContent } from "../utils/profanityFilter";

jest.mock("../utils/profanityFilter", () => ({
  containsOffensiveContent: jest.fn(),
}));

const mockedContains =
  containsOffensiveContent as jest.Mock;

describe("Password Validation Integration", () => {

  beforeEach(() => {
    mockedContains.mockReset();
  });

  test("accepts a valid password when no offensive content is found", () => {

    mockedContains.mockReturnValue(false);

    const result = validatePassword("StrongPass123!");

    expect(result.isValid).toBe(true);
    expect(result.isOffensive).toBe(false);

  });

  test("rejects a password containing offensive content", () => {

    mockedContains.mockReturnValue(true);

    const result = validatePassword("StrongPass123!");

    expect(result.isValid).toBe(false);
    expect(result.isOffensive).toBe(true);

  });

});