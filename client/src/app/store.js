//the rootReducer containers both the reducers

//import store
import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/rootReducer";

//export store
export const store = configureStore({
    reducer: rootReducer,
})