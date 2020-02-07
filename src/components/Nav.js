import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {

  // let textInput = React.createRef();

  const [nav1, setNav1] = useState("Virginia");
  const [url1, setUrl1] = useState("Virginia")

  const[input, setInput] = useState("");
  const[showing, setShowing] = useState(false)

  const setLink = e => {
    let link = e.target.name;
    props.fetchNav(link)
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const changeLink = () => {
    setNav1(input);
    abbreviate(input);
  }

  const abbreviate = (word) => {
    if (word.length > 10) {
      let short = word.substring(0, 10);
      let format = `${short}..`
      setUrl1(format);
    } else {
      setUrl1(word);
    }
  }

  const showHideInput = () => {
    props.jumbo();
    if (!showing) {
      setShowing(true);
    } else {
      setShowing(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.jumbo();
    changeLink();
    setShowing(false);
  }

  // Need to open an input that lets users select the location and then use the newLink function to set the Nav and the Url
 
  return (
  <div id="mainNav">
    <ul>
      <li><NavLink exact to="link1" name={nav1} onClick={setLink}>{url1}</NavLink></li>
      <li><NavLink to="link2" name="Maine" onClick={setLink}>Maine</NavLink></li>
      <li><NavLink to="link3" name="Florida" onClick={setLink}>Florida</NavLink></li>
      <li><NavLink to="" onClick={showHideInput} > Edit </NavLink></li>
      <form onSubmit={handleSubmit}  style={{display: showing ? 'block' : "none"}}>
          <input type="text" placeholder="Edit the first link..." ref={textInput => textInput && textInput.focus()} className="edit-nav" value={input} onChange={handleChange}/>
      </form>
    </ul>
  </div>
  )
}

export default Nav;