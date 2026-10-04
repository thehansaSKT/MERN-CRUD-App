import React from 'react';
import './nav.css'
import {Link}from "react-router-dom";
function nav() {
  return (
    <div>
        <ul className='home-ul'>
            <li className='home-li'>
                <Link to="/mainhome" className="active home-a">
                <h1>Home</h1>
                </Link>
            </li>
            <li className='home-li'>
                <Link to="/adduser" className="home-a">
                  <h1>ADD user</h1>
                </Link>
            </li>
            <li className='home-li'>
                <Link to="/userdetails" className="home-a">
                  <h1>User Details</h1>
                </Link>
            </li>
        </ul>
      
    </div>
  );
}

export default nav;
