import { AppError } from "./../redux/types/errorTypes";
const findErrorInArray = (
  name: string,
  errors: AppError[]
): string | undefined => {
  let err = errors.find(err => err.name === name);
  let errMessage = err !== undefined ? err.message : undefined;
  return errMessage;
};

export default findErrorInArray;
