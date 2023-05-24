import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import sunny from "./Pictures/sun.png";
import cloudly from "./Pictures/cloud.png";
import flash from "./Pictures/flash.png";
import foggy from "./Pictures/fog.png";
import rainy from "./Pictures/rain.png";
import snowly from "./Pictures/snow.png";
import suncloud from "./Pictures/suncloud.png";
import searchIcon from "./Pictures/search.png";

const api = {
  key: "fc098e53be8618b627d43ced3892994d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [show, setShow] = useState(false);
  
  const search = () => {
    axios.get(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(response => {
          setData(response.data);
        });     
  }

  const focus = (prop) => {
    setIsFocus(prop);
  }

  useEffect(() => {
    switch(data ? data.weather[0].main : ""){
      case "Clear" : 
        setPicture(sunny);
        setColor1("#ffad33");
        setColor2("#ff9900");
        setShow(true);
      break;
      case "Clouds" : 
        setPicture(cloudly);
        setColor1("#bfbfbf");
        setColor2("#8c8c8c");
        setShow(true);
      break;
      case "Thunder" : 
        setPicture(flash);
        setColor1("#ffad33");
        setColor2("#ff9900");
        setShow(true);
      break;
      case "Atmosphere" : 
        setPicture(foggy);
        setColor1("#bfbfbf");
        setColor2("#8c8c8c");
        setShow(true);
      break;
      case "Rain" : 
        setPicture(rainy);
        setColor1("#3399ff");
        setColor2("#66b3ff");
        setShow(true);
      break;
      case "Snow" : 
        setPicture(snowly);
        setColor1("#bfbfbf");
        setColor2("#8c8c8c");
        setShow(true);
      break;
    };
    if(data && data.weather[0].description == "few clouds" && data) setPicture(suncloud);
  }, [data])

  return (
    <div>
      <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
        <div className={isFocus ? "searchContainerFocus" : "searchContainer"}>
          <input className="searchField" type="text" placeholder="Search.." onBlur={() => focus(false)} onFocus={() => focus(true)} onChange={(e) => setCity(e.target.value)} />
          <button className="searchButton">
            <img style={{height:"35px", width:"35px"}} src={searchIcon} onClick={search} />
          </button>
        </div>
      </div>
      {show ?
      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <div className="container" style={{background: `linear-gradient(225deg, ${color1}, ${color2})`}}>
          <div className="imageFrame">
            <img className="img" src={picture}/>
          </div>
          <div className="tempFrame">
            <span className="temp">{data ? Math.ceil(data.main.temp) : ""}&#8451;</span>
            <span className="weather">{data ? data.weather[0].main : ""}</span>
          </div>
        </div>
      </div> : ""}
    </div>
  );
}

export default App;
