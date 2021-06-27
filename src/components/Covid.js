import React, { useEffect, useState } from "react";
import "./covid.css";
import axios from "axios";

const Covid = () => {
  const [data, setData] = useState([]);
  const [istate, setIState] = useState("India");
  const [landingPage, setLandingPage] = useState([]);
  let active = 0, confirmed = 0, recovered = 0, deaths = 0, lastupdatedtime = 0;

  //Fetching the data from the covid9india api and capturing the statewise data
  const getCovidData = () => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        const actualData = res.data;
        setData(actualData.statewise);
        setLandingPage(actualData.statewise[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  active = landingPage.active;
  confirmed = landingPage.confirmed;
  recovered = landingPage.recovered;
  deaths = landingPage.deaths; 
  lastupdatedtime = landingPage.lastupdatedtime;

  useEffect(() => {
    getCovidData();
  }, []);

  //Setting the data based on the selected state
  for (let index of data) {
    if (index.state === istate) {   
      active = index.active;
      confirmed = index.confirmed;
      recovered = index.recovered;
      deaths = index.deaths;
      lastupdatedtime = index.lastupdatedtime;
    }
  }

  const stateHandler = (e) => {
    setIState(e.target.value);
  };

  return (
    <div className="outerContainer">
      <section>
        <h1>COVID-19 LIVE TRACKER</h1>
        
          <h2 style={{color:"#FF87A0", fontSize:"41px"}}>{istate}</h2>
        
        
        <div className="covidDataDetails">
        <ul>
          <li className="card act">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Active</p>
                <p className="card_total card_small">{active}</p>
              </div>
            </div>
          </li>
          <li className="card conf">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Confirmed</p>
                <p className="card_total card_small">{confirmed}</p>
              </div>
            </div>
          </li>
          <li className="card recov">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Recovered</p>
                <p className="card_total card_small">{recovered}</p>
              </div>
            </div>
          </li>
          </ul>
          </div>
          <div className="covidDataDetails-2">
            <ul>
          <li className="card death">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Deaths</p>
                <p className="card_total card_small">{deaths}</p>
              </div>
            </div>
          </li>
          <li className="card time">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Last Updated</p>
                <p className="card_total card_small">{lastupdatedtime}</p>
              </div>
            </div>
          </li>
        </ul>
        </div>
        {/* //Dropdown to select the state */}
        <div className="stateDropdown">
          <h2>Choose State</h2>
          <select value={istate} onChange={stateHandler}>
            {data.map((item, ind) => (
              <option key={ind} value={item.state}>
                {item.state}
              </option>
            ))}
          </select>     
        </div>
      </section>
    </div>
  );
};

export default Covid;
