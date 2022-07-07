import style from './BookItem.module.css'
import React from "react";
import {Link} from 'react-router-dom';

type BookItemPropsType = {
    idBook: string,
    imageURL: string,
    category: string,
    name: string,
    authors: string[],
}

export const BookItem: React.FC<BookItemPropsType> = (props) => {

    const authors = props.authors ? props.authors.reduce((prev, next) => prev + '/ ' + next) : ''

    return <div className={style.main__wrapper}>
        <Link to={`/book/${props.idBook}`}>
            <div className={style.wrapper}>
                <div className={style.image__wrapper}>
                    {props.imageURL &&
                        <img src={props.imageURL} width={'250px'} height={'300px'} alt={'book'}/>
                    }
                </div>
                <span className={style.category}>{props.category}</span>
                <h3>{props.name}</h3>
                <h5>{authors}</h5>
            </div>
        </Link>
    </div>
}

/*
'9GUUEAAAQBAJ'*/
