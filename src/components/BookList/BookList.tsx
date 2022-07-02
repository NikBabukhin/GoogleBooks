import style from './BookList.module.css'
import {BookItem} from "./BookItem/BookItem";

export const BookList = () => {
    return <div className={style.wrapper}>
        <BookItem/>
        <BookItem/>
        <BookItem/>
        <BookItem/>
        <BookItem/>
    </div>
}