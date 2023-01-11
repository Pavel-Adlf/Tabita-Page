import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.css';

import { Home } from '../pages/home'
import { Settings } from '../pages/settings'
import ApplicationSettings from '../app-settings/ApplicationSettings';
import { imageStorePull } from '../models/image-store';

window.addEventListener('resize', function(event) {
  ApplicationSettings.widgetSize = document.body && [document.body.clientWidth,document.body.clientHeight]
  imageStorePull([1, null])
}, true);

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/settings" exact element={<Settings />} />
    </Routes>
  </BrowserRouter>
)
