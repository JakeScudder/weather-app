import React from 'react';

const Forecast = (props) => {
  let data = props.data
  // console.log(data);

  let description;
  let descCapitalized;
  let currentTemp;
  let feels;
  let low;
  let high;
  
  const roundTemp = () => {
    let rawTemp = data.main.temp;
    rawTemp = Math.round(rawTemp);
    currentTemp = Math.trunc(rawTemp)
  }

  const feelsLike = () => {
    let rawTemp = data.main.feels_like;
    rawTemp = Math.round(rawTemp);
    feels = Math.trunc(rawTemp)
  }

  const lowTemp = () => {
    let rawTemp = data.main.temp_min;
    rawTemp = Math.round(rawTemp);
    low = Math.trunc(rawTemp)
  }

  const highTemp = () => {
    let rawTemp = data.main.temp_max;
    rawTemp = Math.round(rawTemp);
    high = Math.trunc(rawTemp)
  }

  if (data.weather && data.weather[0]) {
    description = data.weather[0].description;
    descCapitalized = description.charAt(0).toUpperCase() + description.slice(1);
    roundTemp();
    feelsLike();
    lowTemp();
    highTemp();
  }

  return (
    <div id="forecast-container">
      <div id="conditions">
        <h6 id="conditions-header">{`Current Conditions in ${data.name}:`}</h6>
        <h6 id="conditions-desc">{descCapitalized}</h6>
      </div>
      <div id="forecast-flex">
        <div>{`Temp is: ${currentTemp}°`}</div>
        <div>{`Feels Like: ${feels}°`}</div>
        <div>{`Low Today: ${low}°`}</div>
        <div>{`High Today: ${high}°`}</div>
      </div>
    </div>
  )
}

export default Forecast;