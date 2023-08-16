import arrowLink from '../../../images/ArrowLink.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <div className='portfolio__item'>
                <p className='portfolio__item-title'>Статичный сайт</p>
                <a><img className='portfolio__arrow-link' src={arrowLink}/></a>
            </div>
            <div className='portfolio__item'>
                <p className='portfolio__item-title'>Адаптивный сайт</p>
                <a><img className='portfolio__arrow-link' src={arrowLink}/></a>
            </div>
            <div className='portfolio__item'>
                <p className='portfolio__item-title'>Одностраничное приложение</p>
                <a><img className='portfolio__arrow-link' src={arrowLink}/></a>
            </div>
        </section>
    )
}

export default Portfolio;