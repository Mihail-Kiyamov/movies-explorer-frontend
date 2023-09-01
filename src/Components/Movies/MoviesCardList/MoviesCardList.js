import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies, movies, isMoreMovies, onAddMovies, isBadRequest, onLikeClick, onDelete }) {

    return (
        <section className='movies-list'>
            <div className='movies-list__container'>
                {movies.length > 0 &&
                    movies.map((movieObj) => (
                        <MoviesCard 
                        movie={movieObj} 
                        isSavedMovies={isSavedMovies}
                        onLikeClick={onLikeClick}
                        onDelete={onDelete} />
                    ))
                }
                {(movies.length == 0 && !isBadRequest) && <p className='movies-list__not-found-text'>Ничего не найдено</p>}
                {isBadRequest && <p className='movies-list__bad-request-text'>Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз</p>}
            </div>
            {isMoreMovies &&
                <button className='movies-list__more-button' onClick={onAddMovies}>Ещё</button>
            }
        </section>
    )
}

export default MoviesCardList;