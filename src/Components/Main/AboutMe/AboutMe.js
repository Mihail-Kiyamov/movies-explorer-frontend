import photo from '../../../images/AboutMePhoto.jpg';

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__line'></div>
            <div className='about-me__container'>
                <img className='about-me__photo' src={photo} alt='Фото Михаила' />
                <h3 className='about-me__name'>Михаил</h3>
                <h4 className='about-me__description'>Фронтенд-разработчик, 26 лет</h4>
                <p className='about-me__about'>
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
                    2015 года работал в компании «СКБ Контур». После того, как прошёл курс по
                    веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>
                <a className='about-me__github-link' href='https://github.com/Mihail-Kiyamov?tab=repositories'>Github</a>
            </div>
        </section>
    )
}

export default AboutMe;