import { Currency } from "./currencyTypes";

export interface Transaction {
  fromUser: UserDto | null;
  toUser: UserDto;
  amount: number;
  rate: number;
  date: Date;
}

interface UserDto {
  email: string;
  fullname: string;
  account: AccountDto;
}

interface AccountDto {
  id: string;
  currency: Currency;
}

// Redux action types
export const SET_TRANSACTIONS = "SET_TRANSACTIONS";
export type SET_TRANSACTIONS = typeof SET_TRANSACTIONS;
