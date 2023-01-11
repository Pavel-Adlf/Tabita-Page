import React from 'react'
import { Helmet } from 'react-helmet'
import TimeWidget from '../../views/time-widget'
import { WeatherWidget } from '../../views/weather-widget'
import wallPaper from './wall.jpg'
import {WidgetContainer} from '../../views/abstract-widget'
import ApplicationSettings from "../../app-settings/ApplicationSettings"
import { Link } from 'react-router-dom'
import "./styles.css"
import { BackgroundRenderer } from '../../views/background-renderer'
export const Home = () => {

  const getElement = (name) => {
    switch (name) {
      case 'timeModule':
        return <WidgetContainer
          key={'key-' + name}
          initialPosition={[10, 10]}
          name={name}
        >
          <TimeWidget />
        </WidgetContainer>
      case 'weatherModule':
        return <WidgetContainer
          key={'key-' + name}
          initialPosition={[10, 10]}
          name={name}
        >
          <WeatherWidget />
        </WidgetContainer>
      default:
        return <></>

    }

  }

  return <>
    <Helmet>
      <title>Tabita</title>
    </Helmet>

    {ApplicationSettings.widgets.map((widget) => (
      getElement(widget)
    ))}

    <BackgroundRenderer/>
    <div className={"footerLine"}>
      <Link className={'footerText'} to="/settings">settings</Link>
    </div>

  </>
}
