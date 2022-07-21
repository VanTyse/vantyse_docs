import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import Button from '../Button/button'
import { UserContext } from '../../context/context';

function Header() {
  const {user} = useContext(UserContext)
  return (
    <header>
        <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="header-brand">
            <div className="icon">
                <i class="bi bi-file-earmark"></i>
            </div>
            <h1 className="brand-name"> <em>VANTYSE DOCS</em> </h1>
        </div>
        </Link>
        <div className="login-btn">
        <Link className="login-btn-appear-mobile" style={{textDecoration : 'none'}} to='/auth'><Button type='roundedButton' value={user ? "Logout"  : "Login"}/></Link>
        </div>
    </header>
  )
}

export default Header