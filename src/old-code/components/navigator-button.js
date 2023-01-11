import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiHome, mdiCog } from '@mdi/js'

const NavigatorButton = (props) => (
  <Link to={props.link}>
    <Icon
      path={props.link === '/' ? mdiHome : mdiCog}
    />
  </Link>
)

export default NavigatorButton;
