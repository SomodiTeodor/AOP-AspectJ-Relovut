export interface TransactionChartDto {
  amount: number;
  date: Date;
}

export interface TransactionChartDtoFromBack {
  amount: number;
  date: number;
}

// Redux action types
export const SET_INCOMING_TRANSACTIONS_THIS_MONTH =
  "SET_INCOMING_TRANSACTIONS_THIS_MONTH";
export type SET_INCOMING_TRANSACTIONS_THIS_MONTH = typeof SET_INCOMING_TRANSACTIONS_THIS_MONTH;

export const SET_OUTGOING_TRANSACTIONS_THIS_MONTH =
  "SET_OUTGOING_TRANSACTIONS_THIS_MONTH";
export type SET_OUTGOING_TRANSACTIONS_THIS_MONTH = typeof SET_OUTGOING_TRANSACTIONS_THIS_MONTH;
