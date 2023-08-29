import Search from '../Movies/Search/Search';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useState } from 'react';

function SavedMovies({ savedMovies }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies)

    function filterMovies(searchText, onlyShortMovies) {
        onlyShortMovies
            ? setFilteredMovies(savedMovies.filter((movie) =>
                movie.duration <= 40 &&
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ))
            : setFilteredMovies(savedMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ))
    }

    return (
        <main className='saved-movies'>
            <Search onSearch={filterMovies} />

            <MoviesCardList isSavedMovies={true} movies={filteredMovies.slice(0, 6)} />
        </main>
    )
}

export default SavedMovies;