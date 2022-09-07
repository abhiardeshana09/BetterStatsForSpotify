import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector(state => state.user);

    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Better Stats for Spotify</span>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav ms-auto' style={{ minWidth: '150px' }}>
                        <li className='nav-item dropdown'>
                            <span className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img src={user && user.images[0].url} className='rounded-circle' style={{ objectFit: 'cover', width: '30px', height: '30px', marginRight: '8px' }}/>
                                <span>{user && user.display_name}</span>
                            </span>
                            <ul className='dropdown-menu'>
                                <li><span className='dropdown-item'>Logout</span></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;