import style from './SearchResult.module.css'
import React from "react";

type SearchResultPropsType = {
    resultsCount: number,
}

export const SearchResult: React.FC<SearchResultPropsType> = (props) => {

    return props.resultsCount ?
        <span className={style.result}>Found <strong>{props.resultsCount}</strong> results</span> :
        <span className={style.result}>No results...</span>
}