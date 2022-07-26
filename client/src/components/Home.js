
import React from 'react'
import CountryCard from './CountryCard'

const Home = () => {
  return (
    <div className='cards-container'>
        {[1,2,3,4,5,6,7,8,9].map((c, idx) => {
            return <CountryCard key={idx} id={c} />
        })}
    </div>
  )
}

export default Home
