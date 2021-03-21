import {
  SET_ACCOUNT_DETAILS,
  AccountDetails,
  SET_SEARCH_FRIENDS,
  SET_FRIENDS,
  Friend,
  CLEAR_FRIENDS,
  CLEAR_SEARCH_FRIENDS
} from "./../types/userTypes";
import { AppError } from "./../types/errorTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreState } from "./../index";
import { Action, ActionCreator, AnyAction } from "redux";
import {
  User,
  SET_USER,
  GET_CURRENT_USER,
  LOGOUT_USER
} from "../types/userTypes";
import axios from "axios";
import { backendUri } from "../../config/config";
import { ErrorActions, setError } from "./errorActions";
import setAuthToken from "../../utils/setAuthToken";

export interface ISetUser extends Action<SET_USER> {
  user: User;
}
export interface IGetCurrentUser extends Action<GET_CURRENT_USER> {
  user: User;
}
export interface ILogoutUser extends Action<LOGOUT_USER> {}
export interface ISetAccountDetails extends Action<SET_ACCOUNT_DETAILS> {
  accountDetails: AccountDetails;
}
export interface ISetSearchFriends extends Action<SET_SEARCH_FRIENDS> {
  friends: Friend[];
}
export interface IClearSearchFriends extends Action<CLEAR_SEARCH_FRIENDS> {}
export interface ISetFriends extends Action<SET_FRIENDS> {
  friends: Friend[];
}
export interface IClearFriends extends Action<CLEAR_FRIENDS> {}
export type UserActions =
  | ISetUser
  | IGetCurrentUser
  | ILogoutUser
  | ISetAccountDetails
  | ISetSearchFriends
  | IClearSearchFriends
  | ISetFriends
  | IClearFriends;

// prettier-ignore
export const login: ActionCreator<ThunkAction<Promise<UserActions | ErrorActions>, StoreState, {}, AnyAction>> = 
(username: string, password: string) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<UserActions | ErrorActions> => {
    try {
      let data = {
        email: username,
        password
      }
      let token = (await axios.post(backendUri + "/api/users/login", data)).data as string;
      // let token = data.username + data.password;
      setAuthToken(token);
      localStorage.setItem("jwtToken", token);
      return dispatch(getCurrentUser());
    }
    catch {
      let loginError: AppError = {
        name: 'password',
        message: 'Invalid username or password'
      }
      return dispatch(setError(loginError));
    }
  };
};

// prettier-ignore
export const registerUser: ActionCreator<ThunkAction<Promise<UserActions | ErrorActions>, StoreState, {}, AnyAction>> = 
(username: string, password: string, confirmPassword:string, fullname: string, currencyIsoName: string) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<UserActions | ErrorActions> => {
  try {
      let data = {
        email: username, password, fullname, currencyIsoName
      };

      if (username.length < 1) dispatch(setError({name: "username"}));
      if (password.length < 8) dispatch(setError({name: "password", message: "Password must be at least 8 characters long!"}));
      if (password !== confirmPassword) dispatch(setError({name: "confirmPassword", message: "Passwords must match!"}));

      let token = (await axios.post(backendUri + '/api/users/register', data)).data as string;
      setAuthToken(token);
      localStorage.setItem('jwtToken', token);
      return dispatch(getCurrentUser());
    }
    catch (err) {
      return dispatch(setError({name: "registerUser"}));
    }
  };
};

// prettier-ignore
export const getCurrentUser: ActionCreator<ThunkAction<Promise<UserActions | ErrorActions>, StoreState, {}, AnyAction>> = 
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<UserActions | ErrorActions> => {
  try {
      let user = (await axios.get(backendUri + "/api/users/current")).data as string;
      return dispatch(setUser({username: user}));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const getAccountDetails: ActionCreator<ThunkAction<Promise<UserActions | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<UserActions | ErrorActions> => {
  try {
      const accountDetails = (await axios.get(backendUri + "/api/users/myAccount")).data as AccountDetails;
      return dispatch(setAccountDetails(accountDetails));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const getFriends: ActionCreator<ThunkAction<Promise<ISetFriends | ErrorActions>, StoreState, {}, AnyAction>> =
() => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<ISetFriends | ErrorActions> => {
  try {
      const friends = (await axios.get(backendUri + "/api/users/myFriends")).data as Friend[];
      return dispatch(setFriends(friends));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const searchForFriends: ActionCreator<ThunkAction<Promise<ISetSearchFriends | ErrorActions>, StoreState, {}, AnyAction>> =
(email: string, fullname: string) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<ISetSearchFriends | ErrorActions> => {
  try {
      const data = {email, fullname}
      const friends = (await axios.post(backendUri + "/api/users/searchFriends", data)).data as Friend[];
      return dispatch(setSearchFriends(friends));
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const addFriend: ActionCreator<ThunkAction<Promise<void | ErrorActions>, StoreState, {}, AnyAction>> =
(email: string) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<void | ErrorActions> => {
  try {
      const data = {email};
      await axios.post(backendUri + "/api/users/addFriend", data);
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

// prettier-ignore
export const removeFriend: ActionCreator<ThunkAction<Promise<void | ErrorActions>, StoreState, {}, AnyAction>> =
(email: string) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<void | ErrorActions> => {
  try {
      const data = {email};
      await axios.post(backendUri + "/api/users/removeFriend", data);
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};

export const logoutUser = (): ILogoutUser => {
  localStorage.removeItem("jwtToken");
  setAuthToken("");

  return {
    type: LOGOUT_USER
  };
};

export const setUser = (user: User): ISetUser => {
  return {
    type: SET_USER,
    user
  };
};

export const setAccountDetails = (
  accountDetails: AccountDetails
): ISetAccountDetails => {
  return {
    type: SET_ACCOUNT_DETAILS,
    accountDetails
  };
};

export const setFriends = (friends: Friend[]): ISetFriends => {
  return {
    type: SET_FRIENDS,
    friends
  };
};

export const setSearchFriends = (friends: Friend[]): ISetSearchFriends => {
  return {
    type: SET_SEARCH_FRIENDS,
    friends
  };
};

export const clearFriends = (): IClearFriends => {
  return {
    type: CLEAR_FRIENDS
  };
};

export const clearSearchFriends = (): IClearSearchFriends => {
  return {
    type: CLEAR_SEARCH_FRIENDS
  };
};
