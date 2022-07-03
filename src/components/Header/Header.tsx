import style from './Header.module.css'
import image from './../../images/header-book.jpg'
import {SearchField} from "./SearchField/SearchField";
import {SortBlock} from "./SortBlock/SortBlock";
import {CategoriesType, SortType} from "../../redux/reducer";
import React from "react";

type HeaderPropsType = {
    currentSearchText: string,
    currentSort: SortType,
    currentCategory: CategoriesType,
    changeSearchText: (newText: string) => void,
    changeSortOption: (newSort: SortType) => void,
    changeCategoryOption: (newCategory: CategoriesType) => void,
}

export const Header: React.FC<HeaderPropsType> = (props) => {

    return <header className={style.header} style={{backgroundImage: `url(${image})`}}>
        <div className={style.header__container}>
            <h2>Search for books</h2>
            <SearchField
                changeSearchText={props.changeSearchText}
                currentSearchText={props.currentSearchText}
            />
            <SortBlock
                changeSortOption={props.changeSortOption}
                changeCategoryOption={props.changeCategoryOption}
            />
        </div>
    </header>
}