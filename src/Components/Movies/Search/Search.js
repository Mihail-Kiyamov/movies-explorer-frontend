function Search() {
    return (
        <section className='search'>
            <label className='search__input-movie-label' for='input-movie'>
                <input className='search__input-movie' type='text' placeholder='Фильм' id='input-movie'/>
                <input className="search__search-button" type="button" />
            </label>
            <label className='search__checkbox-short-film-label' for='checkbox-short-film'>
                <input className='search__hidden-checkbox-short-film' type='checkbox' id='checkbox-short-film'></input>
                <span className='search__visible-checkbox-short-film'></span>
                Короткометражки
            </label>
            <div className='search__line'></div>
        </section>
    )
}

export default Search;