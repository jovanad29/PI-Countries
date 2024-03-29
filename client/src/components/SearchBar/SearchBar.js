
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCountriesByName } from '../../redux/actions'

function SearchBar() {
  const [ searched, setSearched ] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountriesByName(searched))
  }, [ dispatch, searched ])
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search for a country"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
    </form>
  )
}

export default SearchBar