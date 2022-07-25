
import React from 'react'
import CountryDetail from './CountryDetail'

const Home = () => {
  return (
    <div className='container'>
        {[1,2,3,4,5,6,7,8,9].map((c, idx) => {
            return <CountryDetail key={idx} id={c} />
        })}
    </div>
  )
}

export default Home
