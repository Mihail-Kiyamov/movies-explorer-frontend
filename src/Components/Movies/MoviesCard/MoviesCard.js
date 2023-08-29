import { useState } from 'react';
import mainApi from '../../../utils/MainApi';

function MoviesCard({ isSavedMovies, movie }) {
    const baseUrl = 'https://api.nomoreparties.co';
    const [isLiked, setIsLiked] = useState(movie.isLiked);
    const cardLikeButtonClassName = (
        `movie-card__like ${isLiked && 'movie-card__like_active'}`
    );

    function imageClick() {
        window.location.href = movie.trailerLink;
    }

    function handleLikeClick() {
        isLiked
            ? mainApi.deleteMovie(movie.id)
                .then(setIsLiked(false))
                .catch((err) => {
                    console.log(err);
                })
            : mainApi.saveMovie(movie)
                .then(setIsLiked(true))
                .catch((err) => {
                    console.log(err);
                })
    }

    return (
        <article className="movie-card">
            <img className="movie-card__image"
                src={baseUrl + movie.image.url} alt={movie.nameRU} onClick={imageClick} />
            <h2 className="movie-card__name">{movie.nameRU}</h2>
            {!isSavedMovies &&
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />}
            {isSavedMovies &&
                <button className='movie-card__delete' type="button" />}
            <p className="movie-card__duration">{Math.floor(movie.duration / 60) + 'ч ' + movie.duration % 60 + 'м'}</p>
        </article>
    );
}

export default MoviesCard;