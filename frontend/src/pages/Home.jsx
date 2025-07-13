import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Step from '../components/Step'
import Faq from '../components/Faq'
import Info from '../components/info'
import Type from '../components/Type'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <Info/>
      <Type/>
      <TopDoctors/>
      <Step />
      <Banner/>
      <Faq/>
    </div>
  )
}

export default Home
