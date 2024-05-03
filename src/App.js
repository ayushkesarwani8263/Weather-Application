import "./App.css";
import cloud from "./images/cloud.png";
import clear from "./images/clear.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import errorimg from "./images/404.png"
import React, { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const ApiKey = "d2b8643554683e36c6fc8ddf8617d39c";
  const [info,setInfo]=useState(null)
  const [weather,setWeather]=useState(cloud)
  const [temp,setTemp]=useState(0)
  async function test() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${ApiKey}`
    )
      .then(async (data) => {
        const res=await data.json()
        
        console.log(res)
        if(res.cod!=404){
          setInfo(res)
setTemp(0)
        switch (res.weather[0].main){
          case 'Clear':
            setWeather(clear)
            break;
          case 'Rain':
            setWeather(rain)
            break;
          case 'Snow':
            setWeather(snow)
            break;
          case 'Clouds':
            setWeather(cloud)
            break; 
          case 'Mist':
            setWeather(mist)
            break;       
          case 'Haze':
            setWeather(mist)
            break;
          default:
            setWeather(cloud)
            break;  
        } 
    
      }
      else{
        const t={}
        setTemp(1)
        setInfo(0)
      }
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  return (
    <div className={`container ${info?'containerHeight1':null} ${temp?'containerHeight2':null} `}>
      <div className="search-box">
        <i class="bx bxs-map"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bx bx-search" onClick={city? test:null}></button>
      </div>

      {!info && temp?<div className="box-404 ">
        <div className="inner1">
          <img src={errorimg}alt=""/>
          
        </div>
        <div className="temp1">
        <p className="temp2">city not found</p>
        </div>
        
        
      </div>:<div className={`${info?'Display1':'Display2'}`}>
        <div className="weather-box">
        <div className="box">
          <div className="info-weather">
            <div className="weather">
              <img src={weather} alt="" />
              <p className="temprature">
              {info?info.main.temp:"?"}<span>&deg;C</span>
              </p>
              <p className="description">{info?info.weather[0].description:"-"}</p>
            </div>
          </div>
        </div>
        </div>
      <div className="weather-details">
        <div className="humidity">
          <i class="bx bx-water"></i>
          <div className="text">
            <div className="info-humidity">
              <span>{info?info.main.humidity+"%":null}</span>
            </div>
            <p>Humidity</p>
          </div>
        </div>
       
        <div className="wind">
          <i class="bx bx-wind"></i>
          <div className="text">
            <div className="info-wind">
              <span>{info?info.wind.speed+"km/h":null}</span>
            </div>
            <p>wind speed</p>
          </div>
        </div>
      </div>
      </div>}
      
    </div>
  );
}

export default App;
