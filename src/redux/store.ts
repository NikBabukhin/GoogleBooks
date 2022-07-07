import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {changeFindOptionsReducer} from "./find-options-reducer";
import {findReducer} from "./find-reducer";
import thunk, {ThunkMiddleware} from "redux-thunk";

const rootReducer = combineReducers({
    findOptions: changeFindOptionsReducer,
    bookItems: findReducer,
})

const middleWare: ThunkMiddleware<AppStoreType, AnyAction> = thunk
export const store = createStore(rootReducer, applyMiddleware(middleWare));
export type AppStoreType = ReturnType<typeof rootReducer>;