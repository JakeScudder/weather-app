import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {

  const setLink = e => {
    let link = e.target.name;
    props.fetchNav(link)
  }

  return (
  <div id="mainNav">
    <ul>
      <li><NavLink exact to='/VA' name='Virginia' onClick={setLink}>VA</NavLink></li>
      <li><NavLink to='/ME' name='Maine' onClick={setLink}>ME</NavLink></li>
      <li><NavLink to='/FL' name='Florida' onClick={setLink}>FL</NavLink></li>
      <li><NavLink to='/CA' name='California' onClick={setLink}>CA</NavLink></li>
    </ul>
  </div>
  )
}

export default Nav;