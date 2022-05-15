import { createStore } from "redux";
import authReducer from "../reducers/authReducer/authReducer";

const store: any = createStore(authReducer);

export default store;
