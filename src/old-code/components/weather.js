import React from "react";

import { Card } from 'semantic-ui-react';

const Weather = ({weatherData}) => (
  <Card className="weather">
    <Card.Content>
        <Card.Header className="header">Город: {weatherData.name}</Card.Header>
        <p>Температура: {weatherData.main.temp} &deg;C</p>
        <p>Описание: {weatherData.weather[0].main}</p>
        <p>Влажность: {weatherData.main.humidity} %</p>
    </Card.Content>
  </Card>
)

export default Weather;