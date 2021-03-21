export interface AppError {
  name: string;
  message?: string;
}

// Redux action types
export const SET_ERRORS = "SET_ERRORS";
export type SET_ERRORS = typeof SET_ERRORS;

export const CLEAR_ERROR = "CLEAR_ERROR";
export type CLEAR_ERROR = typeof CLEAR_ERROR;

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export type CLEAR_ERRORS = typeof CLEAR_ERRORS;
