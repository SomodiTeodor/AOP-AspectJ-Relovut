import { Currency } from "./currencyTypes";
export interface User {
  username: string;
}

export interface AccountDetails {
  id: string;
  currency: Currency;
  amount: number;
  email: string;
  fullname: string;
}

export interface Friend {
  accountId: string;
  email: string;
  fullname: string;
}

// Redux action types
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export type GET_CURRENT_USER = typeof GET_CURRENT_USER;

export const SET_USER = "SET_USER";
export type SET_USER = typeof SET_USER;

export const LOGOUT_USER = "LOGOUT_USER";
export type LOGOUT_USER = typeof LOGOUT_USER;

// Account
export const SET_ACCOUNT_DETAILS = "SET_ACCOUNT_DETAILS";
export type SET_ACCOUNT_DETAILS = typeof SET_ACCOUNT_DETAILS;

// Friends
export const SET_SEARCH_FRIENDS = "SET_SEARCH_FRIENDS";
export type SET_SEARCH_FRIENDS = typeof SET_SEARCH_FRIENDS;

export const CLEAR_SEARCH_FRIENDS = "CLEAR_SEARCH_FRIENDS";
export type CLEAR_SEARCH_FRIENDS = typeof CLEAR_SEARCH_FRIENDS;

export const SET_FRIENDS = "SET_FRIENDS";
export type SET_FRIENDS = typeof SET_FRIENDS;

export const CLEAR_FRIENDS = "CLEAR_FRIENDS";
export type CLEAR_FRIENDS = typeof CLEAR_FRIENDS;
