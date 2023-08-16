import { NavLink } from 'react-router-dom';

function NavTab() {
    return (
        <section className='navtab'>
            <NavLink to='/signup' className='navtab__link navtab__aboutproject-link'>
                О проекте
            </NavLink>
            <NavLink to='/signup' className='navtab__link navtab__techs-link'>
                Технологии
            </NavLink>
            <NavLink to='/signup' className='navtab__link navtab__aboutme-link'>
                Студент
            </NavLink>
        </section>
    )
}

export default NavTab;