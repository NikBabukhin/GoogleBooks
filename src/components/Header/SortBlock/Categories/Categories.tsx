import style from './Categories.module.css'
import {useState} from "react";

export const Categories = () => {
    const onChangeCallBack = (e: any) => {
        console.log(e.currentTarget.value)
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