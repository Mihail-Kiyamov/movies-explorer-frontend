import { NavLink } from 'react-router-dom';

function NavTab() {
    return (
        <section className='navtab'>
            <a href='#about-project' className='navtab__link navtab__aboutproject-link'>
                О проекте
            </a>
            <a href='#techs' className='navtab__link navtab__techs-link'>
                Технологии
            </a>
            <a href='#about-me' className='navtab__link navtab__aboutme-link'>
                Студент
            </a>
        </section>
    )
}

export default NavTab;