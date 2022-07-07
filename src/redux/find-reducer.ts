import {
    changeResultCount,
    LastSearchOptionsType,
    saveLastSearch,
    toggleLoading
} from "./find-options-reducer";
import axios from "axios";
import {Dispatch} from "redux";
import {APIKey, CategoriesType, paginationCount, SortType} from "../settings";

//Helper variables
const SET_BOOKS = 'SET-BOOKS';
const SET_MORE_BOOKS = 'SET-MORE-BOOKS';
const SET_CURRENT_BOOK = 'SET-CURRENT-BOOK';

//Types
type SetBooksActionType = {
    type: 'SET-BOOKS',
    payload: CurrentBookType[]
}
type SetMoreBooksActionType = {
    type: 'SET-MORE-BOOKS',
    payload: BookItemType[]
}
type SetCurrentBookActionType = {
    type: 'SET-CURRENT-BOOK',
    payload: CurrentBookType
}
export type BookActionTypes = SetBooksActionType | SetMoreBooksActionType | SetCurrentBookActionType;
type BookItemType = {
    id: string,
    imageURL: string,
    categories: string[],
    title: string,
    authors: string[],
    description: string,
}
type BooksStateType = {
    items: BookItemType[],
    currentBook: CurrentBookType,
}
export type CurrentBookType = {
    id: string,
    imageURL: string,
    title: string,
    categories: string[],
    authors: string[],
    description: string,
}


//Initial State
const initialState: BooksStateType = {
    items: [],
    currentBook: {
        id: '',
        imageURL: '',
        title: '',
        categories: [''],
        authors: [''],
        description: '',
    },
}


//Main Reducer
export const findReducer = (state = initialState, action: BookActionTypes): BooksStateType => {
    switch (action.type) {
        case SET_BOOKS:
            return {...state, items: action.payload}
        case SET_MORE_BOOKS:
            return {...state, items: [...state.items, ...action.payload]}
        case SET_CURRENT_BOOK:
            return {...state, currentBook: {...state.currentBook, ...action.payload}}
        default:
            return state
    }
}


//Action creators
export const setBooks = (books: BookItemType[]): SetBooksActionType => ({type: SET_BOOKS, payload: books});
export const setMoreBooks = (books: BookItemType[]): SetMoreBooksActionType => ({type: SET_MORE_BOOKS, payload: books});
export const setCurrentBook = (currentBook: CurrentBookType): SetCurrentBookActionType => ({
    type: SET_CURRENT_BOOK,
    payload: currentBook
})

//Thunks
export const getBooks = (searchText: string, sortBy: SortType, category: CategoriesType) => (dispatch: Dispatch) => {
    dispatch(toggleLoading())
    dispatch(saveLastSearch(searchText, category, sortBy))
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}${category !== 'all' ? `+subject:${category}` : ''}&maxResults=${paginationCount}&orderBy=${sortBy}&key=${APIKey}`).then(response => {
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
    }).catch((error: any) => {
        console.log(error.response ? error.response.data.message : 'Server error')
        dispatch(toggleLoading())
        return Promise.reject(error)
    })
}
export const getMoreBooks = (lastSearch: LastSearchOptionsType, itemsLength: number) => (dispatch: Dispatch) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${lastSearch.text}${lastSearch.categories !== 'all' ? `+subject:${lastSearch.categories}` : ''}&maxResults=${paginationCount}&startIndex=${itemsLength}&orderBy=${lastSearch.sortBy}&key=${APIKey}`).then(response => {
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
    }).catch((error: any) => {
        console.log(error.response.data.error.message)
        return Promise.reject(error)
    })
}
export const getBookInformation = (id: string) => (dispatch: Dispatch) => {
    dispatch(toggleLoading())
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${APIKey}`).then(response => {
        let imageLink = '';
        if (response.data.volumeInfo.imageLinks) {
            imageLink = response.data.volumeInfo.imageLinks.thumbnail
        }
        const book = {
            id: response.data.id,
            imageURL: imageLink,
            title: response.data.volumeInfo.title,
            categories: response.data.volumeInfo.categories,
            authors: response.data.volumeInfo.authors,
            description: response.data.volumeInfo.description,
        }
        dispatch(setCurrentBook(book))
        dispatch(toggleLoading())
    }).catch((error: any) => {
        console.log(error.response.data.error.message)
        dispatch(toggleLoading())
        return Promise.reject(error)
    })
}

