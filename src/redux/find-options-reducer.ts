//Helper variables

import {categories, CategoriesType, SettingsStateType, sort, SortType} from "../settings";

const CATEGORY = 'CATEGORY';
const SORT = 'SORT';
const CURRENT_SEARCH = 'CURRENT-SEARCH';
const TOGGLE_LOADING = 'TOGGLE-LOADING';
const CHANGE_RESULT_COUNT = 'CHANGE-RESULT-COUNT';
const SAVE_SEARCH_RESULT = 'SAVE-SEARCH-RESULT'

//Types
type ChangeCategoryActionType = { type: 'CATEGORY', payload: CategoriesType };
type ChangeSortActionType = { type: 'SORT', payload: SortType };
type ChangeCurrentSearchActionType = { type: 'CURRENT-SEARCH', payload: string };
type SaveLastSearchActionType = { type: 'SAVE-SEARCH-RESULT', payload: { categories: CategoriesType, sortBy: SortType, text: string } }
type ChangeResultCountActionType = { type: 'CHANGE-RESULT-COUNT', payload: number };
type ToggleLoadingActionType = { type: 'TOGGLE-LOADING' };
export type FindActionTypes =
    ChangeCategoryActionType
    | ChangeSortActionType
    | ChangeCurrentSearchActionType
    | ToggleLoadingActionType | ChangeResultCountActionType | SaveLastSearchActionType;
export type LastSearchOptionsType = {
    categories: CategoriesType,
    sortBy: SortType,
    text: string,
}
type StateType = {
    categories: CategoriesType,
    sortBy: SortType,
    isLoading: boolean,
    currentSearch: string,
    lastSearch: LastSearchOptionsType,
    settings: SettingsStateType
    resultCount: number,
}


//Initial state
const initialState: StateType = {
    categories: 'all',
    sortBy: 'relevance',
    isLoading: false,
    currentSearch: '',
    lastSearch: {
        categories: 'all',
        sortBy: 'relevance',
        text: '',
    },
    settings: {
        settingsCategory: categories,
        settingsSort: sort,
    },
    resultCount: 0,
}


//Main Reducer
export const changeFindOptionsReducer = (state = initialState, action: FindActionTypes): StateType => {
    switch (action.type) {
        case CATEGORY:
            return {...state, categories: action.payload}
        case SORT:
            return {...state, sortBy: action.payload}
        case CURRENT_SEARCH:
            return {...state, currentSearch: action.payload}
        case TOGGLE_LOADING:
            return {...state, isLoading: !state.isLoading}
        case CHANGE_RESULT_COUNT:
            return {...state, resultCount: action.payload}
        case SAVE_SEARCH_RESULT:
            return {...state, lastSearch: {...action.payload}}
        //Default
        default:
            return state
    }
}


//Action creators
export const changeCategory = (newCategory: CategoriesType): ChangeCategoryActionType => ({
    type: CATEGORY,
    payload: newCategory,
})
export const changeSort = (newSort: SortType): ChangeSortActionType => ({type: SORT, payload: newSort})
export const changeCurrentSearch = (newText: string): ChangeCurrentSearchActionType => ({
    type: CURRENT_SEARCH,
    payload: newText,
})
export const toggleLoading = (): ToggleLoadingActionType => ({type: TOGGLE_LOADING})
export const saveLastSearch = (text: string, categories: CategoriesType, sortBy: SortType): SaveLastSearchActionType => ({
    type: SAVE_SEARCH_RESULT,
    payload: {text, categories, sortBy}
})
export const changeResultCount = (resultsCount: number): ChangeResultCountActionType => ({
    type: CHANGE_RESULT_COUNT,
    payload: resultsCount
})