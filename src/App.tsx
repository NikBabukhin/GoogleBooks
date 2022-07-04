import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {BookList} from "./components/BookList/BookList";
import {BookCard} from "./components/BookCard/BookCard";
import {SearchResult} from "./components/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./redux/store";
import {CategoriesType, changeCategory, changeCurrentSearch, changeSort, SortType} from "./redux/find-options-reducer";
import {getBooks} from "./redux/find-reducer";

function App() {

    const state: AppStoreType = useSelector<AppStoreType, AppStoreType>(state => state);
    const dispatch = useDispatch();


    const changeSearchText = (newText: string) => dispatch(changeCurrentSearch(newText))
    const changeSortOption = (newSort: SortType) => dispatch(changeSort(newSort));
    const changeCategoryOption = (newCategory: CategoriesType) => dispatch(changeCategory(newCategory));
    // @ts-ignore
    const findBooks = () => dispatch(getBooks(state.findOptions.currentSearch, state.findOptions.sortBy, state.findOptions.categories));


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
            <SearchResult
                resultsCount={state.findOptions.resultCount}
            />
            {state.bookItems.items.length > 0 && <BookList
                bookItems={state.bookItems.items}
            />}
            <BookCard/>
            <button className={'button'}>load more</button>
        </div>
    );
}

export default App;
