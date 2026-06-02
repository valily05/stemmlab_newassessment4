import { containsOffensiveContent } from "./profanityFilter";

const commonPasswords = ['123456', 'password', 'qwerty', '111111', 'abc123', 'letmein'];

export interface PasswordValidationResult {
    hasMinLength: boolean,
    hasLowercase: boolean,
    hasUppercase: boolean,
    hasNumber: boolean,
    hasSpecial: boolean,
    isCommonPassword: boolean,
    isOffensive: boolean,
    isValid: boolean,
    score: number,
}

export function validatePassword(password: string): PasswordValidationResult {
    const hasMinLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isCommonPassword = commonPasswords.includes(password.toLowerCase());
    const isOffensive = containsOffensiveContent(password);

    let score = 0;

    if(hasMinLength) score++;
    if(hasLowercase) score++;
    if(hasUppercase) score++;
    if(hasNumber) score++;
    if(hasSpecial) score++;

    const isValid = 
        hasMinLength &&
        hasLowercase &&
        hasUppercase &&
        hasNumber &&
        hasSpecial &&
        !isCommonPassword &&
        !isOffensive;
    
    return {
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasNumber,
        hasSpecial,
        isCommonPassword,
        isOffensive,
        isValid,
        score
    };
}