import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {BookList} from "./components/BookList/BookList";
import {BookCard} from "./components/BookCard/BookCard";
import {SearchResult} from "./components/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./redux/store";
import {
    CategoriesType,
    changeCategory,
    changeCurrentSearch,
    changeSort,
    saveLastSearch,
    SortType
} from "./redux/find-options-reducer";
import {getBooks, getMoreBooks} from "./redux/find-reducer";
import preloader from './images/Preloader.svg'

function App() {

    const state: AppStoreType = useSelector<AppStoreType, AppStoreType>(state => state);
    const dispatch = useDispatch();


    const changeSearchText = (newText: string) => dispatch(changeCurrentSearch(newText))
    const changeSortOption = (newSort: SortType) => dispatch(changeSort(newSort));
    const changeCategoryOption = (newCategory: CategoriesType) => dispatch(changeCategory(newCategory));
    // @ts-ignore
    const findBooks = () => dispatch(getBooks(state.findOptions.currentSearch, state.findOptions.sortBy, state.findOptions.categories));
    const findMoreBooks = () => {
        // @ts-ignore
        dispatch(getMoreBooks(state.findOptions.lastSearch, state.bookItems.items.length))
    }
    

    return (
        <div className="App">
            <Header
                currentSearchText={state.findOptions.currentSearch}
                currentSort={state.findOptions.sortBy}
                currentCategory={state.findOptions.categories}
                changeSearchText={changeSearchText}
                changeSortOption={changeSortOption}
                changeCategoryOption={changeCategoryOption}
                findBooks={findBooks}
            />
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
            <BookCard/>

        </div>
    );
}

export default App;
