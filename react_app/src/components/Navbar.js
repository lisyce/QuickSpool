import React from 'react';

function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Floss Tracker</a>

        <div className="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a className="nav-link" href="#">Collection</a>
                </li>
            </ul>
        </div>
        
      </nav>
    );
}

export default Navbar;