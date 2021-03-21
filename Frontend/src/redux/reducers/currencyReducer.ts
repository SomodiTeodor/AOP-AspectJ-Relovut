import { Currency, GET_CURRENCIES } from "./../types/currencyTypes";
import { CurrencyActions } from "./../actions/currencyActions";
import { Reducer } from "redux";

export interface CurrencyState {
  currencies: Currency[];
}

const initialCurrencyState: CurrencyState = {
  currencies: []
};

export const currencyReducer: Reducer<CurrencyState, CurrencyActions> = (
  state: CurrencyState = initialCurrencyState,
  action: CurrencyActions
) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies
      };
    default:
      return state;
  }
};
