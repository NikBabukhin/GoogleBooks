import style from './SearchField.module.css'

export const SearchField = () => {
    return <div className={style.wrapper}>
        <input className={style.input} placeholder={'Find book...'}/>
        <button className={style.button}>&#128269;</button>
    </div>
}