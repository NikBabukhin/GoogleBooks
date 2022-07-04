import {CategoriesType, changeResultCount, SortType, toggleLoading} from "./find-options-reducer";
import axios from "axios";

const SET_BOOKS = 'SET-BOOKS';

type BooksStateType = {
    items: any[],
}

const initialState: BooksStateType = {
    items: [],
}

export const findReducer = (state = initialState, action: any): BooksStateType => {
    switch (action.type) {
        case SET_BOOKS:
            return {...state, items: action.payload}
        default:
            return state
    }
}

export const setBooks = (books: any[]) => ({type: SET_BOOKS, payload: books});

export const getBooks = (searchText: string, sortBy: SortType, category: CategoriesType) => (dispatch: any) => {
    dispatch(toggleLoading())
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}${category !== 'all' ? `+subject:${category}` : ''}&orderBy=${sortBy}&key=AIzaSyAUW0f_yW_WmR2kAMfclupp3OUO2aN-CW0`).then(response => {
        let booksItems = response.data.items.map((book: any) => ({
            id: book.id,
            imageURL: book.volumeInfo.imageLinks.thumbnail,
            categories: book.volumeInfo.categories,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
        }))
        dispatch(changeResultCount(response.data.totalItems))
        dispatch(setBooks(booksItems))
        dispatch(toggleLoading())
    })
}

