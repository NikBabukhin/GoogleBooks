import style from './Header.module.css'
import image from './../../images/header-book.jpg'
import {SearchField} from "./SearchField/SearchField";
import {SortBlock} from "./SortBlock/SortBlock";

export const Header = () => {

    return <header className={style.header} style={{backgroundImage: `url(${image})`}}>
        <div className={style.header__container}>
            <h2>Search for books</h2>
            <SearchField/>
            <SortBlock/>
        </div>
    </header>
}