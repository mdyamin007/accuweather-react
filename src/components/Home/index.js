import React, { useState } from "react";
import "./style.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState();
  const [error, setError] = useState();
  const [localizedName, setLocalizedName] = useState();

  const baseurl = "http://dataservice.accuweather.com";
  const apikey = "sBSyzE4BPdAn75z8f9IDpWKw8GA5CBdj";

  const handleInput = (e) => {
    setCity(e.target.value);
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
        setLocalizedName(data[0].EnglishName);
        const response2 = await fetch(
          `${baseurl}/forecasts/v1/daily/1day/${cityKey}?apikey=${apikey}`
        );
        const data2 = await response2.json();
        setInfo(data2);
        setError(null);
      } catch (error) {
        setError(error.message);
        setInfo(null);
      }
    }
  };

  return (
    <>
      <div className="main__container">
        <div className="box">
          <h1 className="heading">Weather Forecast</h1>
          <div className="input__container">
            <form>
              <input
                type="text"
                className="textbox"
                value={city}
                onChange={handleInput}
                placeholder="Enter the name of a city"
              />
              <button type="submit" className="btn" onClick={handleSubmit}>
                Show weather info
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="error__container">
            <p>City not found!</p>
          </div>
        )}
        {info && (
          <div className="result__container">
            <h2 style={{ marginBottom: "1.5rem" }}>{localizedName}</h2>
            <div className="temp__box">
              <div className="temp__container">
                <p className="temp__title">Min: </p>
                <h2 className="temp__value">
                  {info.DailyForecasts[0].Temperature.Minimum.Value}
                </h2>
                <p className="temp__unit">
                  °{info.DailyForecasts[0].Temperature.Minimum.Unit}
                </p>
              </div>
              <div className="temp__container">
                <p className="temp__title">Max:</p>
                <h2 className="temp__value">
                  {info.DailyForecasts[0].Temperature.Maximum.Value}
                </h2>
                <p className="temp__unit">
                  °{info.DailyForecasts[0].Temperature.Minimum.Unit}
                </p>
              </div>
            </div>
            <h5>Day:</h5>
            <div className="image__container">
              <img
                className="temp__image"
                src={
                  "https://developer.accuweather.com/sites/default/files/" +
                  (info.DailyForecasts[0].Day.Icon < 9 ? "0" : "") +
                  info.DailyForecasts[0].Day.Icon +
                  "-s.png"
                }
                alt="Day Icon"
              />
              <p className="temp__phrase">
                {info.DailyForecasts[0].Day.IconPhrase}
              </p>
            </div>
            <h5>Night:</h5>
            <div className="image__container">
              <img
                className="temp__image"
                src={
                  "https://developer.accuweather.com/sites/default/files/" +
                  (info.DailyForecasts[0].Night.Icon < 9 ? "0" : "") +
                  info.DailyForecasts[0].Night.Icon +
                  "-s.png"
                }
                alt="Night Icon"
              />
              <p className="temp__phrase">
                {info.DailyForecasts[0].Night.IconPhrase}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
