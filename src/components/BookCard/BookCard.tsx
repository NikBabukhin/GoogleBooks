import style from './BookCard.module.css'
import {testBook} from "../../testBook";


export const BookCard = () => {
    return <div className={style.card__wrapper}>
        <div className={style.card__image}>
            <img src={testBook.imageURL} width={'350px'} height={'500px'}/>
        </div>
        <div className={style.card__description}>
            <span className={style.card__description_category}>{testBook.category}</span>
            <h3 className={style.card__description_name}>{testBook.name}</h3>
            <div className={style.card__description_author}>{testBook.authors}</div>
            <textarea
                value={testBook.description}
                readOnly
                className={style.card__description_description}
            />
        </div>
    </div>
}