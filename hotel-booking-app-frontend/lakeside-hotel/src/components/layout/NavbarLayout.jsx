import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/Logout';
import { AuthContext } from '../auth/AuthProvider';

const NavbarLayout = () => {

  const [showAccount, setShowAccount] = useState(false);
  const {user} = useContext(AuthContext);

  const hanldeAccountClick = () => {
    setShowAccount(!showAccount);
  }
  
  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem("userRole")

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
      <div className="container-fluid">
        <Link className='text-decoration-none' to={"/"}>
          <span className='hotel-color'>LakeSide Hotel</span>
        </Link>
        <button 
          className='navbar-toggler' 
          type='button' 
          data-bs-toggle="collapse" 
          data-bs-target='#navbarScroll' 
          aria-controls='navbarScroll' 
          aria-expanded='false' 
          aria-label='Toggle navigation'
        >
          <span className='navbar navbar-toggler-icon'></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to={'/browse-all-rooms'}>
                Browse all rooms
              </NavLink>
            </li>

            {isLoggedIn && userRole == "ROLE_ADMIN" &&(
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to={'/admin'}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          <ul className='d-flex navbar-nav'>
            <li className="nav-item">
              <NavLink className='nav-link' to={'/find-booking'}>
                Find My Booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a 
                className={`nav-link dropdown-toggle ${showAccount ? 'show' : ''}`} 
                href='#' 
                role='button' 
                data-bs-toggle='dropdown' 
                aria-expanded='false' 
                onClick={hanldeAccountClick}
              >
                {" "} 
                Account
              </a>
              <ul className={`me-5 dropdown-menu ${showAccount? "show" : ''}`} aria-labelledby='navbarDropdown'>
                
                {!isLoggedIn ? (
                  <li>
                    <Link className='dropdown-item' to={'/login'}>
                      Login
                    </Link>
                  </li>

                ): (
                  <li>
                    <Logout/>
                  </li>
                )}
                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarLayout