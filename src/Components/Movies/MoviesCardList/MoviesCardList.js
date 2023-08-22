import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';

function MoviesCardList({ isSavedMovies }) {
    const [cards, setCards] = useState(
        [
            {
                link: 'https://w.forfun.com/fetch/71/711676d85ee0d2e68098301a06cd3fa2.jpeg',
                name: 'Гарри поттер и философский камень',
                duration: 9120,
            },
            {
                link: 'https://w.forfun.com/fetch/2b/2be4571c297c442c85b6c6c601ec5090.jpeg',
                name: 'Аватар',
                duration: 9720,
            },
            {
                link: 'https://w.forfun.com/fetch/ac/ac061cbff9ab548adb98b4d71936f443.jpeg',
                name: 'Интерстеллар',
                duration: 10140,
            },
            {
                link: 'https://w.forfun.com/fetch/2b/2be4571c297c442c85b6c6c601ec5090.jpeg',
                name: 'Аватар',
                duration: 9720,
            },
            {
                link: 'https://w.forfun.com/fetch/ac/ac061cbff9ab548adb98b4d71936f443.jpeg',
                name: 'Интерстеллар',
                duration: 10140,
            },
            {
                link: 'https://w.forfun.com/fetch/71/711676d85ee0d2e68098301a06cd3fa2.jpeg',
                name: 'Гарри поттер и философский камень',
                duration: 9120,
            },
        ]
    );

    return (
        <section className='movies-list'>
            <div className='movies-list__container'>
                {
                    cards.map((cardObj) => (
                        <MoviesCard card={cardObj} isSavedMovies={isSavedMovies} />
                    ))
                }
            </div>
            <button className='movies-list__more-button'>Ещё</button>
        </section>
    )
}

export default MoviesCardList;