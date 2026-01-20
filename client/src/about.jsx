import React from 'react'
import Acerca_nosotros from './components/about/acerca_nosotros'
import Nav from './components/Navbar/Nav'
import Footer from './footer'

function About() {
  return (
    <div>
        <Nav></Nav>
        <Acerca_nosotros></Acerca_nosotros>
        <Footer></Footer>
    </div>
  )
}

export default About