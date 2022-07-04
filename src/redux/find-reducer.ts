import {
    CategoriesType,
    changeResultCount,
    LastSearchOptionsType,
    saveLastSearch,
    SortType,
    toggleLoading
} from "./find-options-reducer";
import axios from "axios";

const SET_BOOKS = 'SET-BOOKS';
const SET_MORE_BOOKS = 'SET-MORE-BOOKS';

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
        case SET_MORE_BOOKS:
            return {...state, items: [...state.items, ...action.payload]}
        default:
            return state
    }
}

export const setBooks = (books: any[]) => ({type: SET_BOOKS, payload: books});
export const setMoreBooks = (books: any[]) => ({type: SET_MORE_BOOKS, payload: books});

export const getBooks = (searchText: string, sortBy: SortType, category: CategoriesType) => (dispatch: any) => {
    dispatch(toggleLoading())
    dispatch(saveLastSearch(searchText, category, sortBy))
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}${category !== 'all' ? `+subject:${category}` : ''}&maxResults=3&orderBy=${sortBy}&key=AIzaSyAUW0f_yW_WmR2kAMfclupp3OUO2aN-CW0`).then(response => {
        let booksItems = response.data.items.map((book: any) => {
            let imageLink = '';
            if (book.volumeInfo.imageLinks) {
                imageLink = book.volumeInfo.imageLinks.thumbnail
            }

            return {
                id: book.id,
                imageURL: imageLink,
                categories: book.volumeInfo.categories,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
            }
        })
        dispatch(changeResultCount(response.data.totalItems))
        dispatch(setBooks(booksItems))
        dispatch(toggleLoading())
    })
}

export const getMoreBooks = (lastSearch: LastSearchOptionsType, itemsLength: number) => (dispatch: any) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${lastSearch.text}${lastSearch.categories !== 'all' ? `+subject:${lastSearch.categories}` : ''}&maxResults=3&startIndex=${itemsLength}&orderBy=${lastSearch.sortBy}&key=AIzaSyAUW0f_yW_WmR2kAMfclupp3OUO2aN-CW0`).then(response => {
        let booksItems = response.data.items.map((book: any) => {
            let imageLink = '';
            if (book.volumeInfo.imageLinks) {
                imageLink = book.volumeInfo.imageLinks.thumbnail
            }

            return {
                id: book.id,
                imageURL: imageLink,
                categories: book.volumeInfo.categories,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
            }
        })
        dispatch(setMoreBooks(booksItems))
    })
}

