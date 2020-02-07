import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {

  const [nav1, setNav1] = useState("Charlottesville");
  const [url1, setUrl1] = useState("VA")

  const [nav2, setNav2] = useState("Maine");
  const [url2, setUrl2] = useState("ME");

  const [nav3, setNav3] = useState("Florida");
  const [url3, setUrl3] = useState("FL")

  const [nav4, setNav4] = useState("California");
  const [url4, setUrl4] = useState("CA");

  const setLink = e => {
    let link = e.target.name;
    props.fetchNav(link)
  }

  const newLink = (event) => {
    // console.log(event.target.parentElement.parentElement.firstChild.firstChild);

    //  event.target.parentElement.parentElement.firstChild.firstChild.name = "Maine";

     setNav1("Maine");
     setUrl1("ME");
  }

  // Need to open an input that lets users select the location and then use the newLink function to set the Nav and the Url
 
  return (
  <div id="mainNav">
    <ul>
      <li><NavLink exact to={url1} name={nav1} onClick={setLink}>{url1}</NavLink></li>
      <li><NavLink to={url2} name={nav2} onClick={setLink}>{url2}</NavLink></li>
      <li><NavLink to={url3}name={nav3} onClick={setLink}>FL</NavLink></li>
      <li><NavLink to={url4} name={nav4} onClick={setLink}>CA</NavLink></li>
      <li><NavLink to="/new"  onClick={newLink} >❤</NavLink></li>
    </ul>
  </div>
  )
}

export default Nav;