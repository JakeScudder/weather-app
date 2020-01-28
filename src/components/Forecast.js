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
    <div id="forecast">
      <h5 className="h5Forecast">{`${descCapitalized}, currently ${currentTemp}°`}</h5>
      <h5 className="h5Forecast">{`Feels Like: ${feels}°`}</h5>
      <h5 className="h5Forecast">{`Low Today: ${low}°`}</h5>
      <h5 className="h5Forecast">{`High Today: ${high}°`}</h5>
      {/* <h5>{`${currentTemp}°`}</h5> */}
    </div>
  )
}

export default Forecast;