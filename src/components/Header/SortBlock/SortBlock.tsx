import style from "./SortBlock.module.css"
import {Sort} from "./Sort/Sort";
import {Categories} from "./Categories/Categories";
import React from "react";
import {CategoriesType, SortType} from "../../../settings";

type SortBlockType = {
    changeSortOption: (newSort: SortType) => void,
    changeCategoryOption: (newCategory: CategoriesType) => void,
}

export const SortBlock: React.FC<SortBlockType> = (props) => {
    return <div className={style.wrapper}>
        <Sort changeSortOption={props.changeSortOption}/>
        <Categories changeCategoryOption={props.changeCategoryOption}/>
    </div>
}