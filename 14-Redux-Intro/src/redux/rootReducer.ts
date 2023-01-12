import {combineReducers} from "@reduxjs/toolkit";
import * as counterReducer from "./counter/counter.slice";
import * as employeeReducer from "./employees/employees.slice";
import * as userReducer from "./users/user.slice";

/**
 *
 */
const rootReducer = combineReducers({
    [counterReducer.counterFeature]: counterReducer.counterSlice.reducer,
    [employeeReducer.employeeFeature]: employeeReducer.employeeSlice.reducer,
    [userReducer.userFeature]: userReducer.userSlice.reducer
});
export default rootReducer;