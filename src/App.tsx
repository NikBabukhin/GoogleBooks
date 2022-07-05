import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./redux/store";
import {
    CategoriesType,
    changeCategory,
    changeCurrentSearch,
    changeSort,
    SortType
} from "./redux/find-options-reducer";
import {getBooks} from "./redux/find-reducer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {BookListWrapper} from "./components/BookListWrapper/BookListWrapper";
import {BookCard} from "./components/BookCard/BookCard";


function App() {

    const state: AppStoreType = useSelector<AppStoreType, AppStoreType>(state => state);
    const dispatch = useDispatch();


    const changeSearchText = (newText: string) => dispatch(changeCurrentSearch(newText))
    const changeSortOption = (newSort: SortType) => dispatch(changeSort(newSort));
    const changeCategoryOption = (newCategory: CategoriesType) => dispatch(changeCategory(newCategory));
    // @ts-ignore
    const findBooks = () => dispatch(getBooks(state.findOptions.currentSearch, state.findOptions.sortBy, state.findOptions.categories));


    return (
        <Router>
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
                <Routes>
                    <Route path={'/'} element={<BookListWrapper/>}>
                    </Route>
                    <Route path={'/book/*'} element={<BookCard/>}>
                    </Route>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
