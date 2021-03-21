import {
  SET_ERRORS,
  CLEAR_ERROR,
  CLEAR_ERRORS,
  AppError
} from "../types/errorTypes";
import { Action } from "redux";

export interface ISetErrors extends Action<SET_ERRORS> {
  errors: AppError[];
}
export interface IClearError extends Action<CLEAR_ERROR> {
  error: AppError;
}
export interface IClearErrors extends Action<CLEAR_ERRORS> {}
export type ErrorActions = ISetErrors | IClearError | IClearErrors;

export const clearErrors = (): ErrorActions => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearError = (error: AppError): ErrorActions => {
  return {
    type: CLEAR_ERROR,
    error
  };
};

export const setError = (error: AppError): ErrorActions => {
  if (error === undefined)
    return {
      type: SET_ERRORS,
      errors: []
    };
  return {
    type: SET_ERRORS,
    errors: [error]
  };
};

export const setErrors = (errors: AppError[]): ErrorActions => {
  return {
    type: SET_ERRORS,
    errors
  };
};
