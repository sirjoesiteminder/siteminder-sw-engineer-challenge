import { validateEmailArray } from "./validate-email-array.js";

it('returns true for hi@hi.com', () => {
  expect(validateEmailArray('hi@hi.com')).toBe(true);
});

it('returns false for invalid@invalid', () => {
  expect(validateEmailArray('invalid@invalid')).toBe(false);
});

it('returns false for hi@invalid, valid@valid.com', () => {
  expect(validateEmailArray('hi@invalid, valid@valid.com')).toBe(false);
});

it('returns false for valid@valid.com, valid@valid.com', () => {
  expect(validateEmailArray('valid@valid.com, valid@valid.com')).toBe(true);
});