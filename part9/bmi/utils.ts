export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const handleError = (error: unknown): string => {
  let errorMessage = "something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error;
  }
  return errorMessage;
};
