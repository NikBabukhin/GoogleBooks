import {testBook} from "../testBook";

const CATEGORY = 'CATEGORY';
const SORT = 'SORT';
const CURRENT_SEARCH = 'CURRENT-SEARCH';

type ChangeCategoryActionType = { type: 'CATEGORY', payload: CategoriesType };
type ChangeSortActionType = { type: 'SORT', payload: SortType };
type ChangeCurrentSearchActionType = { type: 'CURRENT-SEARCH', payload: string };
type ActionTypes = ChangeCategoryActionType | ChangeSortActionType | ChangeCurrentSearchActionType;
export type SortType = 'relevance' | 'newest';
export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
type StateType = {
    categories: CategoriesType,
    sortBy: SortType,
    isLoading: boolean,
    currentSearch: string,
    resultCounter: number,
    items: any[],
}

const initialState: StateType = {
    categories: 'all',
    sortBy: 'relevance',
    isLoading: false,
    currentSearch: '',
    resultCounter: 0,
    items: [testBook, testBook],
}

export const changeFindOptionsReducer = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case CATEGORY:
            return {...state, categories: action.payload}
        case SORT:
            return {...state, sortBy: action.payload}
        case CURRENT_SEARCH:
            return {...state, currentSearch: action.payload}
        default:
            return state
    }
}

export const changeCategory = (newCategory: CategoriesType): ChangeCategoryActionType => ({
    type: CATEGORY,
    payload: newCategory,
})
export const changeSort = (newSort: SortType): ChangeSortActionType => ({type: SORT, payload: newSort})
export const changeCurrentSearch = (newText: string): ChangeCurrentSearchActionType => ({
    type: CURRENT_SEARCH,
    payload: newText,
})