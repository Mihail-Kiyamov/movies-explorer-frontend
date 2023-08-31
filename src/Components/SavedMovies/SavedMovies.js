import Search from '../Movies/Search/Search';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

function SavedMovies({ savedMovies, onDelete }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies)
    const [searchText, setSearchText] = useState('');
    const [isShortMovies, SetIsShortMovies] = useState(false);

    function filterMovies(newSearchText, onlyShortMovies) {
        setSearchText(newSearchText);
        SetIsShortMovies(onlyShortMovies);
        onlyShortMovies
            ? setFilteredMovies(savedMovies.filter((movie) =>
                movie.duration <= 40 &&
                movie.nameRU.toLowerCase().includes(newSearchText.toLowerCase())
            ))
            : setFilteredMovies(savedMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(newSearchText.toLowerCase())
            ))
    }

    useEffect(() => {
        isShortMovies
            ? setFilteredMovies(savedMovies.filter((movie) =>
                movie.duration <= 40 &&
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ))
            : setFilteredMovies(savedMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ))
    }, [savedMovies])

    return (
        <main className='saved-movies'>
            <Search onSearch={filterMovies} />

            <MoviesCardList
                isSavedMovies={true}
                movies={filteredMovies.slice(0, 6)}
                onDelete={onDelete} />
        </main>
    )
}

export default SavedMovies;