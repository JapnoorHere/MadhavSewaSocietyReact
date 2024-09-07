import React from 'react'
import Header from './Header'
import Slider from './ImageSliderAuto'
import { ImageData } from '../utils/jsonData'
const Home = () => {
  return (
    <>
        <Header/>
        <Slider ImageData={ImageData} SlideInterValTime={ 2000}/>
    </>
  )
}

export default Home
