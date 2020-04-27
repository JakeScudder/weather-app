import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
//Autofill
import googleKey from '../googleKey';
import uuid from 'react-uuid'
import axios from 'axios';

import { withRouter } from "react-router";

const Nav = (props) => {

  // let textInput = React.createRef();

  const [nav1, setNav1] = useState(Cookies.getJSON('nav1') || "Charlottesville, VA");
  const [url1, setUrl1] = useState(Cookies.getJSON('url1') || "Virginia");

  const [nav2, setNav2] = useState(Cookies.getJSON('nav2') || "Portland, ME");
  const [url2, setUrl2] = useState(Cookies.getJSON('url2') || "Maine");

  const [nav3, setNav3] = useState(Cookies.getJSON('nav3') || "Jacksonville, FL");
  const [url3, setUrl3] = useState(Cookies.getJSON('url3') || "Florida");

  const[input, setInput] = useState("");
  const[showing, setShowing] = useState(false)

  //AutoFill State
  const [autofill, setArray] = useState("");
  const [showingAuto, setShowingAuto] = useState("");
  const [unique, setUnique] = useState(uuid());

  //options
  const[firstOption, setFirstOption] = useState(false);
  const[secondOption, setSecondOption] = useState(false);
  const[thirdOption, setThirdOption] = useState(false);

  const setLink = e => {
    let link = e.target.name;
    props.fetchNav(link)
  }

  const abbreviate = (word) => {
    if (word.length > 10) {
      let short = word.substring(0, 8);
      let format = `${short}..`
      return format;
    } else {
      return word;
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
      }
    } else {
      setShowing(false);
    }
  }

  const handleChange = (event) => {
    setInput(event.target.value);
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${event.target.value}&key=${googleKey}&sessiontoken=${unique}`)
      .then(response => {
        if (response.data.predictions.length > 0) {
          setShowingAuto(true);
        } else {
          setShowingAuto(false);
        }
        setArray(response.data.predictions);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstOption) {
      setNav1(input);
      Cookies.set('nav1', input, {expires: 30});
      let url = abbreviate(input);
      Cookies.set('url1', url, {expires: 30});
      setUrl1(url);
    }
    if (secondOption) {
      setNav2(input);
      Cookies.set('nav2', input, {expires: 30});
      let url = abbreviate(input);
      Cookies.set('url2', url, {expires: 30});
      setUrl2(url);
    }
    if (thirdOption) {
      setNav3(input);
      Cookies.set('nav3', input, {expires: 30});
      let url = abbreviate(input);
      Cookies.set('url3', url, {expires: 30});
      setUrl3(url);
    }
    props.fetchNav(input);
    setShowing(false);
    setInput("");
    document.getElementById("homeOption").selected = true;
  }

  const handleAutofillSubmit = e => {
    let query = e.target.innerText;
    e.preventDefault();
    // let searchUrl = `/search/${query}`
    // props.history.push(searchUrl);
    if (firstOption) {
      setNav1(query);
      Cookies.set('nav1', query, {expires: 30});
      let url = abbreviate(query);
      Cookies.set('url1', url, {expires: 30});
      setUrl1(url);
    }
    if (secondOption) {
      setNav2(query);
      Cookies.set('nav2', query, {expires: 30});
      let url = abbreviate(query);
      Cookies.set('url2', url, {expires: 30});
      setUrl2(url);
    }
    if (thirdOption) {
      setNav3(query);
      Cookies.set('nav3', query, {expires: 30});
      let url = abbreviate(query);
      Cookies.set('url3', url, {expires: 30});
      setUrl3(url);
    }
		props.fetchNav(query);
    setInput("");
    setTimeout(function(){setShowingAuto(false)}, 400);
    setUnique(uuid());
    document.getElementById("homeOption").selected = true
    showHideInput();
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
          <option id="homeOption">♥Change Links</option>
          <option id="first">Change 1st</option>
          <option id="second">Change 2nd</option>
          <option id="third">Change 3rd</option>
        </select>
      </form>
      <form onSubmit={handleSubmit}  style={{display: showing ? 'block' : "none"}}>
          { (firstOption || secondOption || thirdOption)
          ? <input id="new-link" type="text" placeholder="i.e Denver, CO" ref={textInput => textInput && textInput.focus()} className="edit-nav" value={input} onChange={handleChange}/>
          : null 
          } 
          <ul id="autofill-changeLink" style={{display: showingAuto ? 'block' : "none"}}>
            { showingAuto && autofill.length > 1? 
              autofill.slice(0, 4).map(suggestion => {
                let description = suggestion.description.split(",")
                description.pop();
                console.log(description);
                description = description.join(", ")
                console.log(description);
              return <li key={suggestion.id} className="autofill-changeLink-li" onClick={handleAutofillSubmit}>{description}</li>
              })
              : null
            }
          </ul>
      </form>
    </div>
  </div>
  )
}

const NavWithRouter = withRouter(Nav)
export default NavWithRouter;