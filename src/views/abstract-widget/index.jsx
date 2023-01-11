import React, { useState } from 'react'
import "./styles.scss"
import ApplicationSettings from '../../app-settings/ApplicationSettings'

import * as rdd from "react-device-detect"

export const WidgetContainer = ({
  children, initialPosition, name
}) => {

  const getPosition = () => {
    let left, top, initialLeft, initialTop;

    initialLeft=initialPosition[1]/ApplicationSettings.widgetSize[0]*100;
    initialTop=initialPosition[0]/ApplicationSettings.widgetSize[1]*100;

    if (localStorage.getItem(name+'-top') !== null) {
      top = localStorage.getItem(name+'-top');
      if (parseFloat(top) < 0 || parseFloat(top) > 95) top = initialTop;
    } 
    else top = initialTop

    if (localStorage.getItem(name+'-left') !== null) {
      left = localStorage.getItem(name+'-left');
      if (parseFloat(left) < 0 || parseFloat(left) > 95) left = initialLeft ;
    } 
    else left = initialLeft
    return [top,left]
  }

  const position = [];
  let containerModal = document.getElementById(name+'-container-window');
  const [modalPosition, setModalPosition] = useState(getPosition);

  const dragMouseDown = (e) => {
    console.log('dragMouseDown')
    containerModal = document.getElementById(name + '-container-window');
    e = e || window.event;
    //e.preventDefault()
    //console.log(e.target.className)
    position[0] = e.clientX;
    position[1] = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = containerModal && elementDrag;
    // if (e.target.className.indexOf("modal-header") !== -1 || e.target.className.indexOf("modal-content") !== -1 || e.target.className.indexOf("modal-body") !== -1 || e.target.className.indexOf("modal-footer") !== -1) {
    //   document.onmouseup = closeDragElement;
    //   document.onmousemove = containerModal && elementDrag;
    // }
  }
  const elementDrag = (e) => {
    if (containerModal !== undefined) {
      e = e || window.event;
      //e.preventDefault()

      let posX = e.clientX;
      let posY = e.clientY;

      let newX = position[0] - posX;
      let newY = position[1] - posY;

      position[0] = posX;
      position[1] = posY;
      

      const width = ApplicationSettings.widgetSize[0];
      const height = ApplicationSettings.widgetSize[1];

      let newTop=containerModal.offsetTop - newY;
      let newLeft=containerModal.offsetLeft - newX;

      newTop = newTop < 0 ? 0 : newTop < (height-containerModal.offsetHeight) ? newTop*100/height : (height-containerModal.offsetHeight)*100/height;
      newLeft = newLeft < 0 ? 0 : newLeft < (width-containerModal.offsetWidth) ? newLeft*100/width : (width-containerModal.offsetWidth)*100/width;

      containerModal.style.top = (newTop) + "%";
      containerModal.style.left = (newLeft) + "%";
      
      localStorage.setItem(name+'-top', newTop);
      localStorage.setItem(name+'-left', newLeft);

      setModalPosition([newTop, newLeft]);
    }

  }

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }


  return (
    rdd.isBrowser ? <div
      id={name+'-container-window'}
      onMouseDown={dragMouseDown}
      style={{position: 'absolute', userSelect: 'none', maxWidth: '70%', top: modalPosition[0] + "%", left: modalPosition[1] + "%", right: initialPosition[2]? initialPosition[2]+'px' : 'unset'}}
    >
      {children}
    </div>
    :
    children
  )
}