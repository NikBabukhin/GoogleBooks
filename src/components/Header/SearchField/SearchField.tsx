import style from './SearchField.module.css'
import React, {useState} from "react";
import {KeyboardEvent} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

type SearchFieldType = {
    changeSearchText: (newText: string) => void,
    currentSearchText: string,
    findBooks: () => void,
}

export const SearchField: React.FC<SearchFieldType> = (props) => {
    const [value, setValue] = useState(props.currentSearchText)
    const [error, setError] = useState(false)

    let navigate = useNavigate();

    const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        navigate("../", {replace: true})
    }


    const changeSearchText = (newText: string) => {
        setError(false)
        setValue(newText)
        props.changeSearchText(newText.trim())
    }

    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            handleSubmit(e)
            findBooks()
        }
    }

    const findBooks = () => {
        if (value.trim()) {
            props.findBooks()
            navigate("../", {replace: true})
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

        <button className={finalClassForButton} onClick={findBooks}>{!props.currentSearchText ? <span>&#128269;</span> :
            <Link
                to={'/'}>&#128269;</Link>}</button>

    </div>
}