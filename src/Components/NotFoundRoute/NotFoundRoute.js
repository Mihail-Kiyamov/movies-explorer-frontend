import { useNavigate } from 'react-router-dom';
import './NotFoundRoute.css';

function NotFoundRoute() {
    const navigate = useNavigate();

    function handleBackPath() {
        navigate(-1);
    }
    return (
        <section className='not-found-route'>
            <h1 className='not-found-route__title'>404</h1>
            <p className='not-found-route__text'>Страница не найдена</p>
            <a className='not-found-route__back-link' onClick={handleBackPath}>Назад</a>
        </section>
    )
}

export default NotFoundRoute;