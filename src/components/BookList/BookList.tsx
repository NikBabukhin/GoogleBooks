import style from './BookList.module.css'
import {BookItem} from "./BookItem/BookItem";
import React from "react";

type BookListPropsType = {
    bookItems: any[],
}

export const BookList: React.FC<BookListPropsType> = (props) => {
    return <div className={style.wrapper}>
        {props.bookItems.map(el => <BookItem
            imageURL={el.imageURL}
            category={el.category}
            name={el.name}
            authors={el.authors}
        />)}
    </div>
}