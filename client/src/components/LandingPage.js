import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/LandingPage.css'

function LandingPage() {
  return (
    <div className='text-container'>
        <h1>Henry Countries</h1>
        <h2>Individual Proyect</h2>
        <Link to='/home' className='btn btn-primary'>Let's Travel!</Link>
    </div>
  )
}

export default LandingPage