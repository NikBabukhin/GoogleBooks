import style from './Categories.module.css'
import React, {ChangeEvent} from "react";
import {CategoriesType} from "../../../../settings";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../redux/store";

type CategoriesPropsType = {
    changeCategoryOption: (newCategory: CategoriesType) => void,
}

export const Categories: React.FC<CategoriesPropsType> = (props) => {
    const categories = useSelector((state: AppStoreType) => state.findOptions.settings.settingsCategory)

    const onChangeCallBack = (e: ChangeEvent<HTMLSelectElement>) => {
        //@ts-ignore
        props.changeCategoryOption(e.currentTarget.value)
    }

    return <div className={style.wrapper}>
        <span>Categories</span>
        <select
            onChange={onChangeCallBack}
        >{categories.map(option => <option key={option}>{option}</option>)}
        </select>

    </div>
}