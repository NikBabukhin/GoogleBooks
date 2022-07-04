const CATEGORY = 'CATEGORY';
const SORT = 'SORT';
const CURRENT_SEARCH = 'CURRENT-SEARCH';
const TOGGLE_LOADING = 'TOGGLE-LOADING';
const CHANGE_RESULT_COUNT = 'CHANGE-RESULT-COUNT'

type ChangeCategoryActionType = { type: 'CATEGORY', payload: CategoriesType };
type ChangeSortActionType = { type: 'SORT', payload: SortType };
type ChangeCurrentSearchActionType = { type: 'CURRENT-SEARCH', payload: string };
type ChangeResultCountActionType = { type: 'CHANGE-RESULT-COUNT', payload: number };
type ToggleLoadingActionType = { type: 'TOGGLE-LOADING' };
type ActionTypes =
    ChangeCategoryActionType
    | ChangeSortActionType
    | ChangeCurrentSearchActionType
    | ToggleLoadingActionType | ChangeResultCountActionType;
export type SortType = 'relevance' | 'newest';
export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
type StateType = {
    categories: CategoriesType,
    sortBy: SortType,
    isLoading: boolean,
    currentSearch: string,
    resultCount: number,
}

const initialState: StateType = {
    categories: 'all',
    sortBy: 'relevance',
    isLoading: false,
    currentSearch: '',
    resultCount: 0,
}

export const changeFindOptionsReducer = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case CATEGORY:
            return {...state, categories: action.payload}
        case SORT:
            return {...state, sortBy: action.payload}
        case CURRENT_SEARCH:
            return {...state, currentSearch: action.payload}
        case TOGGLE_LOADING: {
            return {...state, isLoading: !state.isLoading}
        }
        case CHANGE_RESULT_COUNT: {
            return {...state, resultCount: action.payload}
        }
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
export const toggleLoading = () => ({type: TOGGLE_LOADING})
export const changeResultCount = (resultsCount: number) => ({type: CHANGE_RESULT_COUNT, payload: resultsCount})