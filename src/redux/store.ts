import {applyMiddleware, combineReducers, createStore} from "redux";
import {changeFindOptionsReducer} from "./find-options-reducer";
import {findReducer} from "./find-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    findOptions: changeFindOptionsReducer,
    bookItems: findReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStoreType = ReturnType<typeof rootReducer>