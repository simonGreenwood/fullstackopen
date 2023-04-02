import { Gender } from "./types";
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
