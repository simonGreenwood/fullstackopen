export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));
export const containsNotNumber = (argument: any[]) => {
  return argument.map((e) => isNaN(Number(e))).includes(false);
};
export const handleError = (error: unknown): string => {
  let errorMessage = "something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error;
  }
  return errorMessage;
};
