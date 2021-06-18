import React, { useEffect, useState } from "react";
import "./covid.css";
import axios from "axios";

const Covid = () => {
  const [data, setData] = useState([]);
  const [istate, setIState] = useState("");

  const getCovidData = () => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        const actualData = res.data;
        setData(actualData.statewise);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCovidData();
  }, []);

  let active = 0,
    confirmed = 0,
    recovered = 0,
    deaths = 0,
    lastupdatedtime = 0;

  for (let index of data) {
    if (index.state == istate) {
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
    <div>
      <section>
        <h2>COVID-19 LIVE TRACKER</h2>
        <div>
          <select value={istate} onChange={stateHandler}>
            <option>Choose State</option>
            {data.map((item, ind) => (
              <option key={ind} value={item.state}>
                {item.state}
              </option>
            ))}
          </select>
        </div>
        <ul>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Location</p>
                <p className="card_total card_small">{istate}</p>
              </div>
            </div>
          </li>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Active</p>
                <p className="card_total card_small">{active}</p>
              </div>
            </div>
          </li>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Confirmed</p>
                <p className="card_total card_small">{confirmed}</p>
              </div>
            </div>
          </li>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Recovered</p>
                <p className="card_total card_small">{recovered}</p>
              </div>
            </div>
          </li>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Deaths</p>
                <p className="card_total card_small">{deaths}</p>
              </div>
            </div>
          </li>
          <li className="card">
            <div className="card_main">
              <div className="card_inner">
                <p className="card_name">Last Updated</p>
                <p className="card_total card_small">{lastupdatedtime}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Covid;
