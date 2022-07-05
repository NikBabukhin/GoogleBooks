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
const SET_CURRENT_BOOK = 'SET-CURRENT-BOOK';

export type CurrentBookType = {
    id: string,
    imageURL: string,
    title: string,
    categories: string[],
    authors: string[],
    description: string,
}
type BooksStateType = {
    items: any[],
    currentBook: CurrentBookType
}

const initialState: BooksStateType = {
    items: [],
    currentBook: {
        id: '',
        imageURL: '',
        title: '',
        categories: [''],
        authors: [''],
        description: '',
    }
}

export const findReducer = (state = initialState, action: any): BooksStateType => {
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

export const setBooks = (books: any[]) => ({type: SET_BOOKS, payload: books});
export const setMoreBooks = (books: any[]) => ({type: SET_MORE_BOOKS, payload: books});
export const setCurrentBook = (currentBook: CurrentBookType) => ({type: SET_CURRENT_BOOK, payload: currentBook})

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

export const getBookInformation = (id: string) => (dispatch: any) => {
    dispatch(toggleLoading())
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAUW0f_yW_WmR2kAMfclupp3OUO2aN-CW0`).then(response => {
        const book = {
            id: response.data.id,
            imageURL: response.data.volumeInfo.imageLinks.thumbnail,
            title: response.data.volumeInfo.title,
            categories: response.data.volumeInfo.categories,
            authors: response.data.volumeInfo.authors,
            description: response.data.volumeInfo.description,
        }
        dispatch(setCurrentBook(book))
        dispatch(toggleLoading())
    })
}

