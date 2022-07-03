import style from './SearchField.module.css'
import React, {useState} from "react";

type SearchFieldType = {
    changeSearchText: (newText: string) => void,
    currentSearchText: string,
}

export const SearchField:React.FC<SearchFieldType> = (props) => {
    const [value, setValue] = useState(props.currentSearchText)
    const changeSearchText = (newText: string) => {
        setValue(newText)
        props.changeSearchText(newText)
    }

    return <div className={style.wrapper}>
        <input
            className={style.input}
            placeholder={'Find book...'}
            value={value}
            onChange={e => changeSearchText(e.currentTarget.value)}
        />
        <button className={style.button}>&#128269;</button>
    </div>
}