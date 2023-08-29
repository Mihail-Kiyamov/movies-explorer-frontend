import { useState, useEffect } from 'react';

function Search({ onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        var oldSearch = JSON.parse(localStorage.getItem('movieSearch'));
        if (oldSearch) {
            setSearchText(oldSearch.text);
            setIsChecked(oldSearch.isShortMovie);
        }
    }, [])

    function handleChange(e) {
        const { value } = e.target;

        setSearchText(value);
    }

    function handleSearch(e) {
        e.preventDefault();

        onSearch(searchText, isChecked);
    }

    function changeCheckbox() {
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if (searchText) onSearch(searchText, isChecked);
    }, [isChecked])

    return (
        <section className='search'>
            <label className='search__input-movie-label' for='input-movie'>
                <input className='search__input-movie' value={searchText} onChange={handleChange} type='text' placeholder='Фильм' id='input-movie' />
                <input className="search__search-button" type="button" onClick={handleSearch} />
            </label>
            <label className='search__checkbox-short-film-label' for='checkbox-short-film'>
                <input className='search__hidden-checkbox-short-film' checked={isChecked} onChange={changeCheckbox} type='checkbox' id='checkbox-short-film'></input>
                <span className='search__visible-checkbox-short-film'></span>
                Короткометражки
            </label>
            <div className='search__line'></div>
        </section>
    )
}

export default Search;