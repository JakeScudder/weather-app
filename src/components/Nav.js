import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {

  // let textInput = React.createRef();

  const [nav1, setNav1] = useState("Virginia");
  const [url1, setUrl1] = useState("Virginia");

  const [nav2, setNav2] = useState("Maine");
  const [url2, setUrl2] = useState("Maine");

  const [nav3, setNav3] = useState("Florida");
  const [url3, setUrl3] = useState("Florida");

  const[input, setInput] = useState("");
  const[showing, setShowing] = useState(false)

  //options
  const[firstOption, setFirstOption] = useState(false);
  const[secondOption, setSecondOption] = useState(false);
  const[thirdOption, setThirdOption] = useState(false);

  const setLink = e => {
    let link = e.target.name;
    props.fetchNav(link)
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const changeLink = () => {
    if (firstOption) {
      setNav1(input);
      abbreviate(input);
    }
    if (secondOption) {
      setNav2(input);
      setUrl2(input);
    }
    if (thirdOption) {
      setNav3(input);
      setUrl3(input);
    }
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

  //Show input based on option selected
  const showHideInput = () => {
    let firstOption = document.getElementById("first").selected;
    let secondOption = document.getElementById("second").selected;
    let thirdOption = document.getElementById("third").selected;

    //Check which option is true
    if (firstOption) {
      setFirstOption(true);
    } else {
      setFirstOption(false);
    }
    if (secondOption) {
      setSecondOption(true);
    } else {
      setSecondOption(false);
    }
    if (thirdOption) {
      setThirdOption(true);
    } else {
      setThirdOption(false);
    }

    //Expand Jumbotron if an option is selected
    if (firstOption || secondOption || thirdOption) {
      console.log("an option is selected")
      if (!showing) {
        setShowing(true);
        props.jumbo();
      }
    } else {
      setShowing(false);
      props.jumbo();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.jumbo();
    changeLink();
    setShowing(false);
    setInput("");
    document.getElementById("homeOption").selected = true;
  }

  // Need to open an input that lets users select the location and then use the newLink function to set the Nav and the Url
 
  return (
  <div id="nav-container">
    <div id="mainNav">
      <ul>
        <li><NavLink exact to="link1" name={nav1} onClick={setLink}>{url1}</NavLink></li>
        <li><NavLink to="link2" name={nav2} onClick={setLink}>{url2}</NavLink></li>
        <li><NavLink to="link3" name={nav3} onClick={setLink}>{url3}</NavLink></li>
      </ul>
    </div>
    <div id="form-div">
      <form id="form-options"> 
        <select id="favorite-options" onChange={showHideInput}>
          <option id="homeOption">♥</option>
          <option id="first">Change First Link</option>
          <option id="second">Change Second Link</option>
          <option id="third">Change Third Link</option>
        </select>
      </form>
      <form onSubmit={handleSubmit}  style={{display: showing ? 'block' : "none"}}>
          { (firstOption || secondOption || thirdOption)
          ? <input id="new-link" type="text" placeholder="New Location is..." ref={textInput => textInput && textInput.focus()} className="edit-nav" value={input} onChange={handleChange}/>
          : null 
          } 
      </form>
    </div>
  </div>
  )
}

export default Nav;