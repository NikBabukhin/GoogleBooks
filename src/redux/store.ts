import {combineReducers, createStore} from "redux";
import {changeFindOptionsReducer} from "./reducer";

const rootReducer = combineReducers({
    books: changeFindOptionsReducer,
})

export const store = createStore(rootReducer);
export type AppStoreType = ReturnType<typeof rootReducer>