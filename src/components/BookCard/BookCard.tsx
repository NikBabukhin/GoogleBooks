import style from './BookCard.module.css'
import {testBook} from "../../testBook";


export const BookCard = () => {
    return <div className={style.card__wrapper}>
        <div>
            <img src={testBook.imageURL} width={'350px'} height={'500px'}/>
        </div>
    </div>
}