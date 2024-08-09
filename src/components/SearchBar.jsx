import { searchAnime } from '../store/anime'
import { searchCharacters } from '../store/characters'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ setIsSearching }) => {
  const dispatch = useDispatch()
  const [searchType, setSearchType] = useState('anime')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500)
    return () => clearTimeout(handler)
  }, [searchQuery])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setIsSearching(true)
      if (searchType === 'anime') dispatch(searchAnime({ title: debouncedQuery }))
      if (searchType === 'characters') dispatch(searchCharacters({ name: debouncedQuery }))
    } else {
      setIsSearching(false)
    }
  }, [debouncedQuery, searchType, dispatch, setIsSearching])

  const handleInputChange = (e) => setSearchQuery(e.target.value)

  return (
    <div className="flex items-center space-x-4">
      <select
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      >
        <option value="anime">Anime</option>
        <option value="characters">Characters</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
    </div>
  )
}

SearchBar.propTypes = {
  setIsSearching: PropTypes.func.isRequired
}

export default SearchBar
