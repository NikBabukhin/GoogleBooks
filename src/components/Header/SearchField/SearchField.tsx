import style from './SearchField.module.css'
import React, {useState} from "react";
import {KeyboardEvent} from 'react';

type SearchFieldType = {
    changeSearchText: (newText: string) => void,
    currentSearchText: string,
    findBooks: any
}

export const SearchField: React.FC<SearchFieldType> = (props) => {
    const [value, setValue] = useState(props.currentSearchText)
    const [error, setError] = useState(false)
    const changeSearchText = (newText: string) => {
        setError(false)
        setValue(newText)
        props.changeSearchText(newText.trim())
    }

    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && findBooks()
    }

    const findBooks = () => {
        if (value.trim()) {
            props.findBooks()
        } else {
            setError(true)
        }
        setValue('')
        props.changeSearchText('')
    }

    const finalClassForInput = `${style.input} ${error && style.input__error}`
    const finalClassForButton = `${style.button} ${error && style.button__error}`


    return <div className={style.wrapper}>
        <input
            className={finalClassForInput}
            placeholder={'Find book...'}
            value={value}
            onChange={e => changeSearchText(e.currentTarget.value)}
            onKeyPress={onEnterPress}
        />
        {error && <span className={style.error__span}>Title required</span>}
        <button className={finalClassForButton} onClick={findBooks}>&#128269;</button>
    </div>
}