import './Movies.css';
import { useState, useEffect } from 'react';
import Search from './Search/Search';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function Movies({ isWindowMedium, isMobile, savedMovies }) {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isPreloader, setIsPreloader] = useState(true);
    const [isBadRequest, setIsBadRequest] = useState(false);

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

        var oldSearch = JSON.parse(localStorage.getItem("movieSearch"));
        moviesApi.getMovies()
            .then((movies) => {
                movies.forEach(movie => {
                    if (savedMovies.find((savedMovie) => savedMovie.nameRU == movie.nameRU)) {
                        movie.isLiked = true;
                    }

                });
                setAllMovies(movies);
                if (oldSearch) {
                    setFilteredMovies(oldSearch.movies)
                } else {
                    setFilteredMovies(movies);
                }
                setIsPreloader(false);
            })
            .catch(() => {
                setIsBadRequest(true);
            })
    }, [])

    function handleAddMovies() {
        setVisibleMovieCount(visibleMovieCount + addedMoviesCount);
    }

    function filterMovies(searchText, onlyShortMovies) {
        onlyShortMovies
            ? setFilteredMovies(allMovies.filter((movie) =>
                movie.duration <= 40 &&
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ))
            : setFilteredMovies(allMovies.filter((movie) =>
                movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
            ));

        setVisibleMovieCount(initialMovieCount)

        var ObjectToLocalSave = {
            text: searchText,
            isShortMovie: onlyShortMovies,
            movies: filteredMovies,
        }

        localStorage.setItem('movieSearch', JSON.stringify(ObjectToLocalSave));
    }

    return (
        <main className='movies'>
            <Search onSearch={filterMovies} />

            {isPreloader && <Preloader />}
            {!isPreloader &&
                <MoviesCardList movies={filteredMovies.slice(0, visibleMovieCount)} isMoreMovies={filteredMovies[visibleMovieCount + 1]} onAddMovies={handleAddMovies} isBadRequest={isBadRequest} />
            }
        </main>
    )
}

export default Movies;