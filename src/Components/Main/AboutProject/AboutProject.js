function AboutProject() {
    return (
        <section className='about-project'>
            <div className='about-project__container'>
                <h2 className='about-project__title'>О проекте</h2>
                <div className='about-project__articles'>
                    <article className='about-project__article'>
                        <h3 className='about-project__article-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='about-project__article-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </article>
                    <article className='about-project__article'>
                        <h3 className='about-project__article-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about-project__article-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </article>
                </div>
                <div className='about-project__progress-line'>
                    <div className='about-project__segment'>
                        <p className='about-project__segment-text'>1 неделя</p>
                    </div>
                    <div className='about-project__segment'>
                        <p className='about-project__segment-text'>4 недели</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;