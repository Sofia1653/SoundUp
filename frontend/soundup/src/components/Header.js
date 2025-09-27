import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>SoundUp App</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Music List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add User
        </NavLink>
      </div>
    </header>
  );
};

export default Header;