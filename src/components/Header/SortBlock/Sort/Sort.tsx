import style from "./Sort.module.css"
import {useState} from "react";

export const Sort = () => {
    const onChangeCallBack = (e: any) => {
        console.log(e.currentTarget.value)
    }

    return <div className={style.wrapper}>
        <span>Sort by</span>
        <select onChange={onChangeCallBack}>
            <option>relevance</option>
            <option>newest</option>
        </select>
    </div>
}