import { chartsReducer } from "./reducers/chartReducer";
import { transactionReducer } from "./reducers/transactionReducer";
import { errorReducer } from "./reducers/errorReducer";
import { userReducer } from "./reducers/userReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { currencyReducer } from "./reducers/currencyReducer";

export const rootReducer = combineReducers({
  userState: userReducer,
  errorState: errorReducer,
  currencyState: currencyReducer,
  transactionState: transactionReducer,
  chartsState: chartsReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));

export type StoreState = ReturnType<typeof rootReducer>;
