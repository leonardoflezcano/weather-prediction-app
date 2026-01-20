import React from 'react';
import Cargar_nav from './Cargar_nav';
import { NavBar } from './navBar';
import "../../stilos/search.css";

function Nav({ onSearch }) {
  return (
    <div style={{ margin: '0px', padding: '0px' }}>
      <Cargar_nav/>
      <NavBar onSearch={onSearch} />
    </div>
  );
}

export default Nav;
