function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <div className='portfolio__item'>
                <a href='https://github.com/Mihail-Kiyamov/how-to-learn' className='portfolio__link' target="_blank">
                    <p className='portfolio__item-title'>Статичный сайт</p>
                </a>
                <a href='https://github.com/Mihail-Kiyamov/how-to-learn' className='portfolio__link' target="_blank">
                    <p className='portfolio__arrow-link'>↗</p>
                </a>
            </div>
            <div className='portfolio__item'>
                <a href='https://github.com/Mihail-Kiyamov/yet-another-project' className='portfolio__link' target="_blank">
                    <p className='portfolio__item-title'>Адаптивный сайт</p>
                </a>
                <a href='https://github.com/Mihail-Kiyamov/yet-another-project' className='portfolio__link' target="_blank">
                    <p className='portfolio__arrow-link'>↗</p>
                </a>
            </div>
            <div className='portfolio__item'>
                <a href='https://github.com/Mihail-Kiyamov/react-mesto-auth' className='portfolio__link' target="_blank">
                    <p className='portfolio__item-title'>Одностраничное приложение</p>
                </a>
                <a href='https://github.com/Mihail-Kiyamov/react-mesto-auth' className='portfolio__link' target="_blank">
                    <p className='portfolio__arrow-link'>↗</p>
                </a>
            </div>
        </section>
    )
}

export default Portfolio;