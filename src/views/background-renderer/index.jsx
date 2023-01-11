import React, { useEffect, useState } from 'react'
import { useStoreMap } from 'effector-react'
import { useInterval } from 'react-use'
import { unsplashApi } from '../../shared/unsplash-api'

import { imageStore, imageStorePull } from '../../models/image-store'

import styles from './styles.module.css'
import ApplicationSettings from '../../app-settings/ApplicationSettings'

export const BackgroundRenderer = () => {
  const search = ApplicationSettings.search
  const timerOfChange  = 100000
  const [container, setContainer] = useState(false)
  const [needChange, setNeedChange] = useState(false)
  const [tempContainer, setTempContainer] = useState(false)
  const [pageIterator, setPageIterator] = useState(1)
  const [iterator, setIterator] = useState(0)
  const imageStoreData = useStoreMap(
    imageStore,
    imageStore => imageStore
  )

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  function getNewContainer () {
    imageStorePull([pageIterator+1, search])
    setPageIterator(pageIterator+1)
  }

  useEffect(()=> {
    if(pageIterator !== 1) setNeedChange(true)
  }, [tempContainer])

  setTimeout(()=> {if (document.getElementById('container')) document.getElementById('container').style.filter = "brightness(0%)"}, timerOfChange-1000)
  useInterval(() => {
    if (needChange) {
      setIterator(0)
      setNeedChange(false)
      setContainer(tempContainer)
    }
    else setIterator(iterator + 1)
    if (iterator === (container && container.length - 2)) getNewContainer()
    let containerDoc
    if (document.getElementById('container')) {
      containerDoc = document.getElementById('container')
      containerDoc.style.filter = "brightness(100%)"
      setTimeout(() => containerDoc.style.filter = "brightness(0%)", timerOfChange - 1000)
    }
  }, timerOfChange)

  useEffect(() => {
    imageStorePull([1, search])
  }, [])

  useEffect(() => {
    if (imageStoreData && imageStoreData.results && imageStoreData.results.length < 1) return imageStorePull([1, 'nature'])
    if (imageStoreData && imageStoreData.results) {
      imageStoreData && imageStoreData.results && setTempContainer(shuffle(imageStoreData.results))
      if (pageIterator === 1) setContainer(imageStoreData && imageStoreData.results && shuffle(imageStoreData.results))
    }
  }, [imageStoreData])



  return (container && container[iterator] && <>
    <div id='container' className={styles.container}>
      <picture id='picture'>
        <source srcSet={container[iterator].urls.full} media="(min-width: 1080px)" />
        <source srcSet={container[iterator].urls.regular} media="(min-width: 400px)" />
        <source srcSet={container[iterator].urls.small} />
        <img
          id={'image'}
          key={container[iterator].id}
          className={styles.image}
          alt={container[iterator].description}
          src={container[iterator].urls.regular}
        />
      </picture>
    </div>
    <div className={styles.footerLineName}>
      <div className={styles.footerGrid}>
        <p className={styles.footerBy}> by </p>
        <p className={styles.footerAuthor} onClick={()=>window.open(container[iterator].user.links.html,'_blank')}>{container[iterator].user.name}</p>
      </div>
    </div>
  </>
  )
}
