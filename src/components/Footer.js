import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {

  const handle5Day = (event) => {
    props.fetch5Day();
  }

  const handleClick = (event) => {
    event.preventDefault();
  }

  return (
      <div id="footer">
        <NavLink to="/" className="footer-link" style={{ textDecoration: 'none' }} onClick={handleClick}>
        <i className="material-icons footer-icon" >dashboard</i>
        <span className="footer-text">Home</span>
        </NavLink>
        <NavLink exact to="five-day" name="five-day" className="footer-link" style={{ textDecoration: 'none' }} onClick={handle5Day} >
        <i className="material-icons footer-icon" >calendar_today</i>
        <span className="footer-text">5-Day</span>
        </NavLink>
      </div>
  )
}

export default Footer;