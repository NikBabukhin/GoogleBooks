import style from './BookCard.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../redux/store";
import {CurrentBookType, getBookInformation} from "../../redux/find-reducer";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";


export const BookCard = () => {

    const state = useSelector<AppStoreType, CurrentBookType>(state => state.bookItems.currentBook);
    const authors = state.authors ? state.authors.reduce((prev, next) => prev + '/ ' + next) : '';
    const categories = state.categories ? state.categories.reduce((prev, next) => prev + '/ ' + next) : '';

    const dispatch = useDispatch()

    const location = useLocation()
    const key = location.pathname.split('/').reverse()[0]

    useEffect(() => {
        // @ts-ignore
        dispatch(getBookInformation(key))
    }, [])

    return <div className={style.card__wrapper}>
        <div className={style.card__image}>
            <img src={state.imageURL} width={'350px'} height={'500px'}/>
        </div>
        <div className={style.card__description}>
            <span className={style.card__description_category}>{categories}</span>
            <h3 className={style.card__description_name}>{state.title}</h3>
            <div className={style.card__description_author}>{authors}</div>
            <div>{state.description}</div>
        </div>
    </div>
}