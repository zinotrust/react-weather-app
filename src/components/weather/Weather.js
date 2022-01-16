import { useState } from "react";
import "./Weather.scss";

const Weather = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [dateToday, setDateToday] = useState(date);

  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "28fd15358cdecbc1a1dfef367e71acef",
  };
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section className="--100vh --center-all">
      <div className="container weather --flex-center">
        <div className="weather-app --text-light">
          <h1>Weather App</h1>
          <p>{dateToday}</p>
          <div className="--form-control --my2">
            <input
              type="text"
              placeholder="Search city name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg != "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp: {Math.round(weather.main.temp)}°C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)}°C /{" "}
                {Math.round(weather.main.temp_max)}°C
              </p>
            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
