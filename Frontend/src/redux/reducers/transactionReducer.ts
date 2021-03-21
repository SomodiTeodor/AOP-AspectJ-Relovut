import { Transaction, SET_TRANSACTIONS } from "./../types/transactionTypes";
import { TransactionActions } from "./../actions/transactionActions";
import { Reducer } from "redux";

export interface TransactionState {
  transactions: Transaction[];
}

const initialTransactionState: TransactionState = {
  transactions: []
};

export const transactionReducer: Reducer<
  TransactionState,
  TransactionActions
> = (
  state: TransactionState = initialTransactionState,
  action: TransactionActions
) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      };
    default:
      return state;
  }
};
