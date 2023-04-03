import { Gender, HealthCheckRating } from "./types";
export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const isGender = (newGender: string): newGender is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(newGender);
};

export const isHealthCheckRating = (
  param: number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(String(param));
};

export const isNumber = (n: unknown): n is number => {
  return typeof n === "number" || n instanceof Number;
};
