import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
   <header className='app-header'>
    <div className='logo'>
    <Link to='/'>NC News</Link>
    </div>
    <nav className='navigation'>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
    </ul>
    </nav>
   </header>
  )
}

export default Header