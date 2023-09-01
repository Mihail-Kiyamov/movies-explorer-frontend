import Search from '../Movies/Search/Search';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

function SavedMovies({ isWindowMedium, isMobile, savedMovies, onDelete }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies)
    const [searchText, setSearchText] = useState('');
    const [isShortMovies, SetIsShortMovies] = useState(false);

    const initialMovieCount = isMobile
        ? 5
        : isWindowMedium
            ? 8
            : 12;
    const addedMoviesCount = isMobile
        ? 2
        : isWindowMedium
            ? 2
            : 3;
    const [visibleMovieCount, setVisibleMovieCount] = useState(initialMovieCount);

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
        setVisibleMovieCount(initialMovieCount)
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

    function handleAddMovies() {
        setVisibleMovieCount(visibleMovieCount + addedMoviesCount);
    }

    return (
        <main className='saved-movies'>
            <Search onSearch={filterMovies} />

            <MoviesCardList
                isSavedMovies={true}
                movies={filteredMovies.slice(0, visibleMovieCount)}
                isMoreMovies={!!filteredMovies[visibleMovieCount + 1]}
                onAddMovies={handleAddMovies}
                onDelete={onDelete} />
        </main>
    )
}

export default SavedMovies;