import './Movies.css';
import { useState, useEffect } from 'react';
import Search from './Search/Search';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ isWindowMedium, isMobile, allMovies, isBadRequest, onLikeClick }) {
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isPreloader, setIsPreloader] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isShortMovies, SetIsShortMovies] = useState(false);
    const [oldSearch, setOldSearch] = useState(JSON.parse(localStorage.getItem("movieSearch")));

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

    useEffect(() => {
        setIsPreloader(true);
        setSearchText(oldSearch.text);
        SetIsShortMovies(oldSearch.isShortMovie);

        if (oldSearch) {
            setFilteredMovies(oldSearch.movies)
        } else {
            setFilteredMovies(allMovies)
        }
        setIsPreloader(false);
    }, [])

    useEffect(() => {
        var ObjectToLocalSave = {
            text: searchText,
            isShortMovie: isShortMovies,
            movies: filteredMovies,
        }

        localStorage.setItem('movieSearch', JSON.stringify(ObjectToLocalSave));
    }, [filteredMovies])

    useEffect(() => {
        if (allMovies.length !== 0) {
            isShortMovies
                ? setFilteredMovies(allMovies.filter((movie) =>
                    movie.duration <= 40 &&
                    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
                ))
                : setFilteredMovies(allMovies.filter((movie) =>
                    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
                ));
        }
    }, [allMovies])

    function handleAddMovies() {
        setVisibleMovieCount(visibleMovieCount + addedMoviesCount);
    }

    function filterMovies(newSearchText, onlyShortMovies) {
        setSearchText(newSearchText);
        SetIsShortMovies(onlyShortMovies);

        if (allMovies.length !== 0) {
            onlyShortMovies
                ? setFilteredMovies(allMovies.filter((movie) =>
                    movie.duration <= 40 &&
                    movie.nameRU.toLowerCase().includes(newSearchText.toLowerCase())
                ))
                : setFilteredMovies(allMovies.filter((movie) =>
                    movie.nameRU.toLowerCase().includes(newSearchText.toLowerCase())
                ));
        }

        setVisibleMovieCount(initialMovieCount)
    }

    return (
        <main className='movies'>
            <Search onSearch={filterMovies} />

            {isPreloader && <Preloader />}
            {!isPreloader &&
                <MoviesCardList
                    movies={filteredMovies.slice(0, visibleMovieCount)}
                    isMoreMovies={!!filteredMovies[visibleMovieCount + 1]}
                    onAddMovies={handleAddMovies}
                    isBadRequest={isBadRequest}
                    onLikeClick={onLikeClick} />
            }
        </main>
    )
}

export default Movies;