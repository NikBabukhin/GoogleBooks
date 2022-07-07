import preloader from "../../images/Preloader.svg";
import {SearchResult} from "./SearchResult/SearchResult";
import React from "react";
import {BookList} from "./BookList/BookList";
import {AppStoreType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {getMoreBooks} from "../../redux/find-reducer";
import {AppDispatch} from "../../App";

export const BookListWrapper = () => {
    const state: AppStoreType = useSelector<AppStoreType, AppStoreType>(state => state)
    const dispatch: AppDispatch = useDispatch();

    const findMoreBooks = () => {
        dispatch(getMoreBooks(state.findOptions.lastSearch, state.bookItems.items.length))
    }


    return <div>
        {state.findOptions.isLoading ? <img src={preloader}/> :
            <SearchResult
                resultsCount={state.findOptions.resultCount}
            />
        }
        {state.bookItems.items.length > 0 && !state.findOptions.isLoading && <BookList
            bookItems={state.bookItems.items}
        />}
        {state.bookItems.items.length > 0 &&
            <button className={'button'} onClick={findMoreBooks}>load more</button>}
    </div>
}