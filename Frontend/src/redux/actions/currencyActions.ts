import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreState } from "./../index";
import { Action, ActionCreator, AnyAction } from "redux";
import axios from "axios";
import { backendUri } from "../../config/config";
import { ErrorActions, setError } from "./errorActions";
import { GET_CURRENCIES, Currency } from "../types/currencyTypes";

export interface IGetCurrencies extends Action<GET_CURRENCIES> {
  currencies: Currency[];
}
export type CurrencyActions = IGetCurrencies;

// prettier-ignore
export const getCurrencies: ActionCreator<ThunkAction<Promise<CurrencyActions | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<CurrencyActions | ErrorActions> => {
  try {
      const currencies = (await axios.get(backendUri + "/api/currencies")).data as Currency[];
      return dispatch(setCurrencies(currencies));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

const setCurrencies = (currencies: Currency[]): IGetCurrencies => {
  return {
    type: GET_CURRENCIES,
    currencies
  };
};
