import style from './SearchField.module.css'
import React, {useState} from "react";
import {testBook} from "../../../testBook";
import axios from "axios";

type SearchFieldType = {
    changeSearchText: (newText: string) => void,
    currentSearchText: string,
    findBooks: any
}

export const SearchField: React.FC<SearchFieldType> = (props) => {
    const [value, setValue] = useState(props.currentSearchText)
    const changeSearchText = (newText: string) => {
        setValue(newText)
        props.changeSearchText(newText)
    }
    const findBooks = () => props.findBooks()

    return <div className={style.wrapper}>
        <input
            className={style.input}
            placeholder={'Find book...'}
            value={value}
            onChange={e => changeSearchText(e.currentTarget.value)}
        />
        <button className={style.button} onClick={findBooks}>&#128269;</button>
    </div>
}