import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {BookList} from "./components/BookList/BookList";
import {BookCard} from "./components/BookCard/BookCard";

function App() {
    const res = 150;
    return (
        <div className="App">
            <Header/>
            <span className={'result__span'}>Found <strong>{res}</strong> results</span>
            {/*<BookList/>*/}
            <BookCard/>
        </div>
    );
}

export default App;
