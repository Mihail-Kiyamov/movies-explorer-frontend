import Search from '../Movies/Search/Search';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
    return (
        <main className='saved-movies'>
            <Search>

            </Search>
            <MoviesCardList isSavedMovies={true}>

            </MoviesCardList>
        </main>
    )
}

export default SavedMovies;