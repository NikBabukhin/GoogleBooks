import style from './BookItem.module.css'
import {testBook} from './../../../testBook'

export const BookItem = () => {
    const bookItem = testBook;

    return <div className={style.main__wrapper}>
        <div className={style.wrapper}>
            <div className={style.image__wrapper}>
                <img src={bookItem.imageURL} width={'250px'} height={'350px'}/>
            </div>
            <span className={style.category}>{bookItem.category}</span>
            <h3>{bookItem.name}</h3>
            <h5>{bookItem.authors}</h5>
        </div>
    </div>
}