import { ErrorActions } from "./../actions/errorActions";
import { Reducer } from "redux";
import { AppError } from "../types/errorTypes";

export interface ErrorState {
  errors: AppError[];
}

const initialErrorState: ErrorState = {
  errors: []
};

export const errorReducer: Reducer<ErrorState, ErrorActions> = (
  state = initialErrorState,
  action
) => {
  switch (action.type) {
    case "SET_ERRORS":
      let stateErrors = [...state.errors];
      return {
        ...state,
        errors: stateErrors.concat(action.errors)
      };
    case "CLEAR_ERROR":
      let array = [...state.errors];
      let index = -1;
      do {
        index = array.findIndex(err => err.name === action.error.name);
        if (index !== -1) {
          array.splice(index, 1);
        }
      } while (index !== -1);

      return {
        ...state,
        errors: array
      };
    case "CLEAR_ERRORS":
      return {
        ...initialErrorState
      };
    default:
      return state;
  }
};
