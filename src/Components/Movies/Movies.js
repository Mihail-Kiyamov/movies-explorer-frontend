import './Movies.css';
import Search from './Search/Search';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
    return (
        <main className='movies'>
            <Search>

            </Search>
            <MoviesCardList>

            </MoviesCardList>
        </main>
    )
}

export default Movies;