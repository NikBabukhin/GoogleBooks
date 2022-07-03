import style from './BookItem.module.css'
import React from "react";

type BookItemPropsType = {
    imageURL: string,
    category: string,
    name: string,
    authors: string,
}

export const BookItem:React.FC<BookItemPropsType> = (props) => {

    return <div className={style.main__wrapper}>
        <div className={style.wrapper}>
            <div className={style.image__wrapper}>
                <img src={props.imageURL} width={'250px'} height={'350px'}/>
            </div>
            <span className={style.category}>{props.category}</span>
            <h3>{props.name}</h3>
            <h5>{props.authors}</h5>
        </div>
    </div>
}