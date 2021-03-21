import { SET_TRANSACTIONS, Transaction } from "./../types/transactionTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreState } from "./../index";
import { Action, ActionCreator, AnyAction } from "redux";
import axios from "axios";
import { backendUri } from "../../config/config";
import { ErrorActions, setError } from "./errorActions";

export interface ISetTransactions extends Action<SET_TRANSACTIONS> {
  transactions: Transaction[];
}

export type TransactionActions = ISetTransactions;

// prettier-ignore
export const getTransactions: ActionCreator<ThunkAction<Promise<TransactionActions | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<TransactionActions | ErrorActions> => {
  try {
      const transactions = (await axios.get(backendUri + '/api/transactions')).data as Transaction[];
      return dispatch(setTransactions(transactions));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const addFunds: ActionCreator<ThunkAction<Promise<void | ErrorActions>, StoreState, {}, AnyAction>> =
(amount: number) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<void | ErrorActions> => {
  try {
      const data = { amount };
      await axios.post(backendUri + "/api/transactions/addFunds", data);
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const createTransaction: ActionCreator<ThunkAction<Promise<void | ErrorActions>, StoreState, {}, AnyAction>> =
(toAccountId: string, amount: number) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<void | ErrorActions> => {
  try {
      const data = {toAccountId, amount};
      await axios.post(backendUri + "/api/transactions", data);
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

export const setTransactions = (
  transactions: Transaction[]
): ISetTransactions => {
  return {
    type: SET_TRANSACTIONS,
    transactions
  };
};
