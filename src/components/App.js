import React, {useState} from 'react';

import './App.css';
import cartoonboy from './Assets/cartoonboy.jpg'

// src\App.js src\components\Assets\cartoonboy.jpg
const api = {
    key : "29943589c391a0c1243b08f7e1eaf4f0",
    base: "https://api.openweathermap.org/data/2.5/"

}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result=>{
       setWeather(result);
       setQuery('');
       console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursdsay", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date}th ${month} ${year}`
  
  }


  return (
    <div className=
      {
      (typeof weather.main != "undefined")
      ? ((weather.main.temp > 16) 
      ? 'app warm' : 'app cold')
      :"app"
      }>
       <main>
          <div className="search-box">
             <input
               type="text"
               className= "search-bar"
               placeholder="Search Region..."
               onChange={e => setQuery(e.target.value)}
               value={query}
               onKeyPress={search}
             /> 
          </div>
          <div className='location-box'>
              <div className="date">{dateBuilder(new Date ())}</div>

              { Object.keys(weather).length === 0 ? 
              <div className='weather-change'> 
                <div className="" style={{color: "#333", fontSize: "35px"}}>What's the Weather? </div> 
       
                <img style={{float: "left", height: "500px"}}src={cartoonboy}/>
            </div>
                : ""
                
                
                }
          
          </div>  
          {/* END OF LOCATION BOX DIV */}

         
          
          


          {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div>

          <div className="weather-box">
            <div className="temperature">{Math.round(weather.main.temp)} &#176;C</div>
            <div>
            <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
      </div>
      ) : ('')}
       </main>
    </div>
  );
}

export default App;
