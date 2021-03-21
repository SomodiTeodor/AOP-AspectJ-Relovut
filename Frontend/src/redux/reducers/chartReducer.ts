import { ChartActions } from "./../actions/chartActions";
import {
  TransactionChartDto,
  SET_INCOMING_TRANSACTIONS_THIS_MONTH,
  SET_OUTGOING_TRANSACTIONS_THIS_MONTH
} from "./../types/chartTypes";
import { Reducer } from "redux";

export interface ChartsState {
  incomingTransactionsThisMonth: TransactionChartDto[];
  outgoingTransactionsThisMonth: TransactionChartDto[];
}

const initialChartsState: ChartsState = {
  incomingTransactionsThisMonth: [],
  outgoingTransactionsThisMonth: []
};

export const chartsReducer: Reducer<ChartsState, ChartActions> = (
  state: ChartsState = initialChartsState,
  action: ChartActions
) => {
  switch (action.type) {
    case SET_INCOMING_TRANSACTIONS_THIS_MONTH:
      return {
        ...state,
        incomingTransactionsThisMonth: action.incomingTransactionsThisMonth
      };
    case SET_OUTGOING_TRANSACTIONS_THIS_MONTH:
      return {
        ...state,
        outgoingTransactionsThisMonth: action.outgoingTransactionsThisMonth
      };
    default:
      return state;
  }
};
