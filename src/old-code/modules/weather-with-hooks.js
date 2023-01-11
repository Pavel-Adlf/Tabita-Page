import React, { useEffect, useState } from "react";
import Weather from '../components/weather';

export default function WeatherWithHooks() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {

      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_API_WEATHER_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_WEATHER_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
        });
      }

      if (lat!==null & long!==null) {
      fetchData()};
    }, [lat,long])

    return (
      <div className="WetherModule">
            {typeof data.main != 'undefined' &&
                <Weather weatherData={data} />}
      </div>
    );
  }
