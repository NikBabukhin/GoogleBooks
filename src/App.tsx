import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {BookList} from "./components/BookList/BookList";
import {BookCard} from "./components/BookCard/BookCard";
import {SearchResult} from "./components/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./redux/store";
import {CategoriesType, changeCategory, changeCurrentSearch, changeSort, SortType} from "./redux/reducer";

function App() {

    const state: AppStoreType = useSelector<AppStoreType, AppStoreType>(state => state);
    const dispatch = useDispatch();

    const changeSearchText = (newText: string) => dispatch(changeCurrentSearch(newText))
    const changeSortOption = (newSort: SortType) => dispatch(changeSort(newSort));
    const changeCategoryOption = (newCategory: CategoriesType) => dispatch(changeCategory(newCategory));

    return (
        <div className="App">
            <Header
                currentSearchText={state.books.currentSearch}
                currentSort={state.books.sortBy}
                currentCategory={state.books.categories}
                changeSearchText={changeSearchText}
                changeSortOption={changeSortOption}
                changeCategoryOption={changeCategoryOption}
            />
            <SearchResult
                resultsCount={state.books.resultCounter}
            />
            {state.books.items.length > 0 && <BookList
                bookItems={state.books.items}
            />}
            <BookCard/>
            <button className={'button'}>load more</button>
        </div>
    );
}

export default App;
