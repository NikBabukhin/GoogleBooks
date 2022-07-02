import style from "./SortBlock.module.css"
import {Sort} from "./Sort/Sort";
import {Categories} from "./Categories/Categories";

export const SortBlock = () => {
    return <div className={style.wrapper}>
        <Sort/>
        <Categories/>
    </div>
}