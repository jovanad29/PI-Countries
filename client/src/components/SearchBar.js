
import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  // console.log(onSearch)
  const [searched, setSearched] = useState('')
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        onSearch(searched);
      }}>
        <input
            type="text"
            placeholder="Search..."
            value={searched}
            onChange={e => setSearched(e.target.value)}
        />
        <input type="submit" value="Search" />
    </form>
  )
}

export default SearchBar