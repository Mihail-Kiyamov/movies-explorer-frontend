function MoviesCard(props) {
    return (
        <article className="movie-card">
            <img className="movie-card__image"
                src={props.card.link} alt={props.card.name} />
            <h2 className="movie-card__name">{props.card.name}</h2>
            <button className='movie-card__like' type="button" />
            <p className="movie-card__duration">{Math.floor(props.card.duration / 3600) + 'ч ' + props.card.duration % 3600 / 60 + 'м'}</p>
        </article>
    );
}

export default MoviesCard;