import React from 'react';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg sticky-top'>
      
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>Floss Tracker</a>

        <div className='collapse navbar-collapse container-fluid'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <a className='nav-link' href='#'>Collection</a>
            </li>
          </ul>
        </div>
        
      </div>
      
    </nav>
  );
}

export default Navbar;