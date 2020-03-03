import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {

  const handleClick = (event) => {
    event.preventDefault();
  }

  return (
      <div id="footer">
        <NavLink to="/" className="footer-link" style={{ textDecoration: 'none' }} onClick={handleClick}>
        <i className="material-icons footer-icon" >dashboard</i>
        <span className="footer-text">Home</span>
        </NavLink>
        <NavLink to="/hourly" className="footer-link" style={{ textDecoration: 'none' }} onClick={handleClick} >
        <i className="material-icons footer-icon" >access_time</i>
        <span className="footer-text">Hourly</span>
        </NavLink>
        <NavLink to="/3-day" className="footer-link" style={{ textDecoration: 'none' }} onClick={handleClick}>
        <i className="material-icons footer-icon">calendar_today</i>
        <span className="footer-text">3 Day</span>
        </NavLink>
        <NavLink to="/5-day" className="footer-link" style={{ textDecoration: 'none' }} onClick={handleClick}>
        <i className="material-icons footer-icon">calendar_today</i>
        <span className="footer-text">5 Day</span>
        </NavLink>
      </div>
  )
}

export default Footer;