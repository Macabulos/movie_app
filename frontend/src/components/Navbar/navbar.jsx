import React from 'react';
import './navbar.css';
import Logo from '../../assets/m2.jpg';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_img from '../../assets/caret_icon.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      
      <div className="navbar-left">
        {/* <img src={Logo} alt="logo" /> */}
        <h1 className='movie'>MoovieFlex</h1>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Settings</li>
        </ul>
      </div>

    
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_img} alt="Caret Icon" />
          <div className="dropdown">
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
