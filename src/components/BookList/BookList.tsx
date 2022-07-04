import style from './BookList.module.css'
import {BookItem} from "./BookItem/BookItem";
import React from "react";

type BookListPropsType = {
    bookItems: any[],
}

export const BookList: React.FC<BookListPropsType> = (props) => {
    return <div className={style.wrapper}>
        {props.bookItems.map(el => !!el && <BookItem
            key={el.id}
            imageURL={el.imageURL}
            category={el.categories ? el.categories[0] : ''}
            name={el.title}
            authors={el.authors}
        />)}
    </div>
}