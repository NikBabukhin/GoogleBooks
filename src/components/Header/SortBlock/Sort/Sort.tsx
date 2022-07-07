import style from "./Sort.module.css"
import React, {ChangeEvent} from "react";
import {SortType} from "../../../../settings";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../redux/store";

type SortPropsType = {
    changeSortOption: (newSort: SortType) => void,
}

export const Sort: React.FC<SortPropsType> = (props) => {

    const sort = useSelector((state: AppStoreType) => state.findOptions.settings.settingsSort)

    const onChangeCallBack = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        props.changeSortOption(e.currentTarget.value)
    }

    return <div className={style.wrapper}>
        <span>Sort by</span>
        <select onChange={onChangeCallBack}>
            {sort.map(sortOption => <option key={sortOption}>{sortOption}</option>)}
        </select>
    </div>
}