import React from 'react';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg sticky-top bg-light mb-4 px-3'>
      
      <div className='container-fluid'>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <a className='navbar-brand' href='#'>Floss Tracker</a>

        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
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