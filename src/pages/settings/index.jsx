import React from 'react'
import ApplicationSettings from "../../app-settings/ApplicationSettings"
import { Link } from 'react-router-dom'
import { imageStorePull } from '../../models/image-store'
import './styles.css'
let search = ApplicationSettings.search
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const pattern = 'pattern'+(getRandomInt(7)+1)
const getElement = (name, i) => {
  let value = false;
  ApplicationSettings.widgets.forEach((widget) => {
    if (widget === name) {
      value = true
    }
  })
  return <div className={'buttonAll chooseButtons'+i+(value === true ? ' active' : ' passive')}  key={name + '-check'} id={name+i} onClick={handleChangeButton}>
    <p id={name+'p'} className="buttonText">{(name.replace('Module', '')) + (value === true ? ' ON' : ' OFF')}</p>
  </div>

}
function filterFunction (e) {
  e.target.value = e.target.value.replace(/[^a-zA-Z ]*$/g, '');
}
function onChangeSearchFunction (e) {
  localStorage.setItem('search', JSON.stringify(e.target.value));
  imageStorePull([1, e.target.value])
  search = e.target.value
  ApplicationSettings.search = search
  document.getElementById('inputDescription').innerHTML = 'Выбрана тема: ' + search
}

const handleChangeButton = (e) => {
  let checked = ApplicationSettings.widgets
  let name = e.target.id.slice(0, -1)
  let active = e.target.classList.contains('active')
  if(active) {
    checked.splice(ApplicationSettings.widgets.indexOf(name), 1)
    e.target.classList.remove("active");
    e.target.classList.add("passive");
    document.getElementById(name+'p').innerHTML = document.getElementById(name+'p').innerHTML.replace('ON', 'OFF')
  }
  else {
    checked.push(name)
    e.target.classList.add("active");
    e.target.classList.remove("passive");
    document.getElementById(name+'p').innerHTML = document.getElementById(name+'p').innerHTML.replace('OFF', 'ON')
  }
  localStorage.setItem('widgets', JSON.stringify(checked));


  console.log(checked)
}


export const Settings = () => (
  <div className={'backgroundSettings '+pattern}>
    <a href="/" className='headerContainer'><p className={'headerText'} >←</p></a>
    {ApplicationSettings.widgetList.map((widget, i) => (
      getElement(widget, i)
    ))}
    <div className='inputPanel'>
      <p id='inputDescription'>{'Choosen: ' + search}</p>
      <input className='inputWindow' type="text" onInput={filterFunction} placeholder={'enter new search tag'} onChange={e => { onChangeSearchFunction(e) }} />
    </div>
  </div>
)
