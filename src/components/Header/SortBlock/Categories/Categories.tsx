import style from './Categories.module.css'
import React, {ChangeEvent} from "react";
import {CategoriesType} from "../../../../redux/find-options-reducer";

type CategoriesPropsType = {
    changeCategoryOption: (newCategory: CategoriesType) => void,
}

export const Categories: React.FC<CategoriesPropsType> = (props) => {

    const onChangeCallBack = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        props.changeCategoryOption(e.currentTarget.value)
    }

    return <div className={style.wrapper}>
        <span>Categories</span>
        <select onChange={onChangeCallBack}>
            <option>all</option>
            <option>art</option>
            <option>biography</option>
            <option>computers</option>
            <option>history</option>
            <option>medical</option>
            <option>poetry</option>
        </select>
    </div>
}