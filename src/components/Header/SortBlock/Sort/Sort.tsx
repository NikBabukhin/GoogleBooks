import style from "./Sort.module.css"
import React, {ChangeEvent} from "react";
import {SortType} from "../../../../redux/reducer";

type SortPropsType = {
    changeSortOption: (newSort: SortType) => void,
}

export const Sort: React.FC<SortPropsType> = (props) => {

    const onChangeCallBack = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        props.changeSortOption(e.currentTarget.value)
    }

    return <div className={style.wrapper}>
        <span>Sort by</span>
        <select onChange={onChangeCallBack}>
            <option>relevance</option>
            <option>newest</option>
        </select>
    </div>
}