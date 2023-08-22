function MoviesCard({ isSavedMovies, card }) {
    return (
        <article className="movie-card">
            <img className="movie-card__image"
                src={card.link} alt={card.name} />
            <h2 className="movie-card__name">{card.name}</h2>
            {!isSavedMovies && 
            <button className='movie-card__like' type="button" />}
            {isSavedMovies && 
            <button className='movie-card__delete' type="button" />}
            <p className="movie-card__duration">{Math.floor(card.duration / 3600) + 'ч ' + card.duration % 3600 / 60 + 'м'}</p>
        </article>
    );
}

export default MoviesCard;