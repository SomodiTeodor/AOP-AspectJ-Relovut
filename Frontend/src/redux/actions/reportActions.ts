import moment from "moment";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StoreState } from "./../index";
import { ActionCreator, AnyAction } from "redux";
import axios from "axios";
import { backendUri } from "../../config/config";
import { ErrorActions, setError } from "./errorActions";

// prettier-ignore
export const sendReport: ActionCreator<ThunkAction<Promise<void | ErrorActions>, StoreState, {}, AnyAction>> =
(fromDate: Date, toDate: Date) => {
  return async (dispatch: ThunkDispatch<StoreState, {}, AnyAction>): Promise<void | ErrorActions> => {
  try {
      let data = {
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD")
      };
      await axios.post(backendUri + '/api/documents/report', data);
    }
    catch (err) {
      return dispatch(setError(err ? err.response : err));
    }
  };
};
