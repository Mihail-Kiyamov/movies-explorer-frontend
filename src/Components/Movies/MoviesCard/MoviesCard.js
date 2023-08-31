
function MoviesCard({ isSavedMovies, movie, onLikeClick, onDelete }) {
    const baseUrl = 'https://api.nomoreparties.co';
    const cardLikeButtonClassName = (
        `movie-card__like ${movie.isLiked && 'movie-card__like_active'}`
    );

    function imageClick() {
        window.location.href = movie.trailerLink;
    }

    function handleLikeClick() {
        onLikeClick(movie);
    }

    function handleDelete() {
        onDelete(movie.movieId)
    }

    return (
        <article className="movie-card">
            <img className="movie-card__image"
                src={baseUrl + movie.image} alt={movie.nameRU} onClick={imageClick} />
            <h2 className="movie-card__name">{movie.nameRU}</h2>
            {!isSavedMovies &&
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />}
            {isSavedMovies &&
                <button className='movie-card__delete' type="button" onClick={handleDelete} />}
            <p className="movie-card__duration">{Math.floor(movie.duration / 60) + 'ч ' + movie.duration % 60 + 'м'}</p>
        </article>
    );
}

export default MoviesCard;