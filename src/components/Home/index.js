import React, { useState } from "react";
import "./style.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState();
  const [error, setError] = useState();

  const baseurl = "http://dataservice.accuweather.com";
  const apikey = "sBSyzE4BPdAn75z8f9IDpWKw8GA5CBdj";

  const handleInput = (e) => {
    setCity(e.target.value);
    setInfo(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city === "") return;
    else {
      try {
        const response = await fetch(
          `${baseurl}/locations/v1/cities/search?apikey=%20${apikey}&q=${city}`
        );
        const data = await response.json();

        const cityKey = data[0].Key;
        const response2 = await fetch(
          `${baseurl}/forecasts/v1/daily/1day/${cityKey}?apikey=${apikey}`
        );
        const data2 = await response2.json();
        setInfo(data2);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="main__container">
        <div className="input__container">
          <form>
            <input
              type="text"
              className="textbox"
              value={city}
              onChange={handleInput}
            />
            <button type="submit" onClick={handleSubmit}>
              Show weather info
            </button>
          </form>
        </div>
      </div>
      {error && <p>City not found!</p>}
      {info && (
        <div className="result__container">
          <h4>{city}</h4>
          <p>
            Min: {info.DailyForecasts[0].Temperature.Minimum.Value}
            {info.DailyForecasts[0].Temperature.Minimum.Unit}
          </p>
          <p>
            Max: {info.DailyForecasts[0].Temperature.Maximum.Value}
            {info.DailyForecasts[0].Temperature.Minimum.Unit}
          </p>
          <h5>Day:</h5>
          <img
            src={
              "https://developer.accuweather.com/sites/default/files/" +
              (info.DailyForecasts[0].Day.Icon < 9 ? "0" : "") +
              info.DailyForecasts[0].Day.Icon +
              "-s.png"
            }
            alt="Day Icon"
          />
          <h5>{info.DailyForecasts[0].Day.IconPhrase}</h5>
          <h5>Night:</h5>
          <img
            src={
              "https://developer.accuweather.com/sites/default/files/" +
              (info.DailyForecasts[0].Night.Icon < 9 ? "0" : "") +
              info.DailyForecasts[0].Night.Icon +
              "-s.png"
            }
            alt="Night Icon"
          />
          <h5>{info.DailyForecasts[0].Night.IconPhrase}</h5>
        </div>
      )}
    </>
  );
};

export default Home;
