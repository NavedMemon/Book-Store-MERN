import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import News from './News'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home
