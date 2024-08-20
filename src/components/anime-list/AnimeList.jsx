import { useState } from 'react'
import PropTypes from 'prop-types'
import { animePropTypes } from '../../props/animePropTypes'
import Favorites from './Favorites'
import ToWatch from './ToWatch'
import Watched from './Watched'
import Abandoned from './Abandoned'
import Watching from './Watching'

const AnimeList = ({ favorites, toWatch, watched, abandoned, watching }) => {
  const [selectedTab, setSelectedTab] = useState('favorites')

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Anime List</h2>
      <div className="flex gap-3 mt-6">
        <button
          className={`${
            selectedTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } px-4 py-2 rounded`}
          onClick={() => setSelectedTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={`${
            selectedTab === 'watching' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } px-4 py-2 rounded`}
          onClick={() => setSelectedTab('watching')}
        >
          Watching
        </button>
        <button
          className={`${
            selectedTab === 'toWatch' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } px-4 py-2 rounded`}
          onClick={() => setSelectedTab('toWatch')}
        >
          To Watch
        </button>
        <button
          className={`${
            selectedTab === 'watched' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } px-4 py-2 rounded`}
          onClick={() => setSelectedTab('watched')}
        >
          Watched
        </button>
        <button
          className={`${
            selectedTab === 'abandoned' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } px-4 py-2 rounded`}
          onClick={() => setSelectedTab('abandoned')}
        >
          Abandoned
        </button>
      </div>
      {selectedTab === 'favorites' && <Favorites favorites={favorites} />}
      {selectedTab === 'watching' && <Watching watching={watching} />}
      {selectedTab === 'toWatch' && <ToWatch toWatch={toWatch} />}
      {selectedTab === 'watched' && <Watched watched={watched} />}
      {selectedTab === 'abandoned' && <Abandoned abandoned={abandoned} />}
    </div>
  )
}

AnimeList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired,
  watching: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired,
  toWatch: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired,
  watched: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired,
  abandoned: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired
}

export default AnimeList
