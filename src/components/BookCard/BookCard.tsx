import style from './BookCard.module.css';
import {CurrentBookType, getBookInformation} from "../../redux/find-reducer";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../redux/store";
import {AppDispatch} from "../../App";
import {useLocation} from "react-router-dom";
import preloader from "./../../images/Preloader.svg"

type BookCardPropsType = {
    isLoading: boolean
}

export const BookCardMemo: React.FC<BookCardPropsType> = (props) => {
    const state = useSelector<AppStoreType, CurrentBookType>(state => state.bookItems.currentBook);
    const dispatch: AppDispatch = useDispatch();

    const authors = state.authors ? state.authors.reduce((prev, next) => prev + '/ ' + next) : '';
    const categories = state.categories ? state.categories.reduce((prev, next) => prev + '/ ' + next) : '';

    const location = useLocation()
    const key = location.pathname.split('/').reverse()[0]

    useEffect(() => {
        dispatch(getBookInformation(key))
    }, [key, dispatch])

    return (
        !props.isLoading ? <div className={style.card__wrapper}>
            <div className={style.card__image}>
                <img src={state.imageURL} width={'350px'} height={'500px'} alt={'Book'}/>
            </div>
            <div className={style.card__description}>
                <span className={style.card__description_category}>{categories}</span>
                <h3 className={style.card__description_name}>{state.title}</h3>
                <div className={style.card__description_author}>{authors}</div>
                <div>{state.description}</div>
            </div>
        </div> : <img src={preloader} alt={'Book'}/>)
}

export const BookCard = React.memo(BookCardMemo)
