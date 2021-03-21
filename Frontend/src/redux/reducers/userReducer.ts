import {
  AccountDetails,
  SET_ACCOUNT_DETAILS,
  Friend,
  SET_FRIENDS,
  CLEAR_FRIENDS,
  SET_SEARCH_FRIENDS,
  CLEAR_SEARCH_FRIENDS
} from "./../types/userTypes";
import { UserActions } from "./../actions/userActions";
import { Reducer } from "redux";
import { User } from "../types/userTypes";

export interface UserState {
  user: User | null;
  accountDetails: AccountDetails | null;
  friends: Friend[];
  searchFriends: Friend[];
}

const initialUserState: UserState = {
  user: null,
  accountDetails: null,
  friends: [],
  searchFriends: []
};

export const userReducer: Reducer<UserState, UserActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action.user
      };
    case "LOGOUT_USER":
      return {
        ...initialUserState
      };
    case SET_ACCOUNT_DETAILS:
      return {
        ...state,
        accountDetails: action.accountDetails
      };
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.friends
      };
    case CLEAR_FRIENDS:
      return {
        ...state,
        friends: initialUserState.friends
      };
    case SET_SEARCH_FRIENDS:
      return {
        ...state,
        searchFriends: action.friends
      };
    case CLEAR_SEARCH_FRIENDS:
      return {
        ...state,
        searchFriends: initialUserState.searchFriends
      };
    default:
      return state;
  }
};
