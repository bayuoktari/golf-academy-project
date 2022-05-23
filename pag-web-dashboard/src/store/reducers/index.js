import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "../middlewares/thunk";
import StudentReducer from "./student";
import UserReducer from "./user";
import StaffReducer from "./staff";

export const rootReducer = combineReducers({
  student: StudentReducer,
  user: UserReducer,
  staff: StaffReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
