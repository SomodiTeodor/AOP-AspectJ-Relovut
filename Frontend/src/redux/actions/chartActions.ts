import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreState } from "./../index";
import { Action, ActionCreator, AnyAction } from "redux";
import axios from "axios";
import { backendUri } from "../../config/config";
import { ErrorActions, setError } from "./errorActions";
import {
  SET_INCOMING_TRANSACTIONS_THIS_MONTH,
  SET_OUTGOING_TRANSACTIONS_THIS_MONTH,
  TransactionChartDto,
  TransactionChartDtoFromBack
} from "../types/chartTypes";
import moment from "moment";

export interface ISetIncomingTransactionsThisMonth
  extends Action<SET_INCOMING_TRANSACTIONS_THIS_MONTH> {
  incomingTransactionsThisMonth: TransactionChartDto[];
}
export interface ISetOutgoingTransactionsThisMonth
  extends Action<SET_OUTGOING_TRANSACTIONS_THIS_MONTH> {
  outgoingTransactionsThisMonth: TransactionChartDto[];
}
export type ChartActions =
  | ISetIncomingTransactionsThisMonth
  | ISetOutgoingTransactionsThisMonth;

// prettier-ignore
export const getIncomingTransactionsThisMonth: ActionCreator<ThunkAction<Promise<ISetIncomingTransactionsThisMonth | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<ISetIncomingTransactionsThisMonth | ErrorActions> => {
  try {
      // Transactions to me
      const incomingTransactionsThisMonthFromBack = (await axios.get(backendUri + "/api/transactions/getToTransactions")).data as TransactionChartDtoFromBack[];
      const incomingTransactionsThisMonth: TransactionChartDto[] = incomingTransactionsThisMonthFromBack.map(transaction => {
        return {
          amount: transaction.amount,
          date: moment().utc().date(transaction.date).hour(0).minute(0).second(0).millisecond(0).toDate()
        }
      });
      const daysInMonth = getDaysInMonth(moment().utc().month(), moment().utc().year());
      // add last day
      if (!incomingTransactionsThisMonth.some(transaction => transaction.date.getDate() === daysInMonth ))
        incomingTransactionsThisMonth.push({amount: 0, date: moment().utc().date(daysInMonth).hour(0).minute(0).second(0).millisecond(0).toDate()});
      // add first day
      if (!incomingTransactionsThisMonth.some(transaction => transaction.date.getDate() === 1 ))
        incomingTransactionsThisMonth.push({amount: 0, date: moment().utc().date(1).hour(0).minute(0).second(0).millisecond(0).toDate()});

      return dispatch(setIncomingTransactionsThisMonth(incomingTransactionsThisMonth));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const getOutgoingTransactionsThisMonth: ActionCreator<ThunkAction<Promise<ISetOutgoingTransactionsThisMonth | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<ISetOutgoingTransactionsThisMonth | ErrorActions> => {
  try {
      // Transactions from me
      const outgoingTransactionsThisMonthFromBack = (await axios.get(backendUri + "/api/transactions/getFromTransactions")).data as TransactionChartDtoFromBack[];
      const outgoingTransactionsThisMonth: TransactionChartDto[] = outgoingTransactionsThisMonthFromBack.map(transaction => {
        return {
          amount: transaction.amount,
          date: moment().utc().date(transaction.date).hour(0).minute(0).second(0).millisecond(0).toDate()
        }
      });
      const daysInMonth = getDaysInMonth(moment().utc().month(), moment().utc().year());
      // add last day
      if (!outgoingTransactionsThisMonth.some(transaction => transaction.date.getDate() === daysInMonth ))
        outgoingTransactionsThisMonth.push({amount: 0, date: moment().utc().date(daysInMonth).hour(0).minute(0).second(0).millisecond(0).toDate()});
      // add first day
      if (!outgoingTransactionsThisMonth.some(transaction => transaction.date.getDate() === 1 ))
        outgoingTransactionsThisMonth.push({amount: 0, date: moment().utc().date(1).hour(0).minute(0).second(0).millisecond(0).toDate()});

      return dispatch(setOutgoingTransactionsThisMonth(outgoingTransactionsThisMonth));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

export const setIncomingTransactionsThisMonth = (
  incomingTransactionsThisMonth: TransactionChartDto[]
): ISetIncomingTransactionsThisMonth => {
  return {
    type: SET_INCOMING_TRANSACTIONS_THIS_MONTH,
    incomingTransactionsThisMonth
  };
};

export const setOutgoingTransactionsThisMonth = (
  outgoingTransactionsThisMonth: TransactionChartDto[]
): ISetOutgoingTransactionsThisMonth => {
  return {
    type: SET_OUTGOING_TRANSACTIONS_THIS_MONTH,
    outgoingTransactionsThisMonth
  };
};

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};
