import AnimeCard from '../anime/AnimeCard'
import { animePropTypes } from '../../props/animePropTypes'
import PropTypes from 'prop-types'
import { getAnimeId } from '../../utils/animeUtils'

const Favorites = ({ favorites }) => {
  return (
    <div className="mt-6 grid justify-items-center gap-y-6" style={{gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"}}>
      {favorites.map(({animeId}) => (
        <AnimeCard key={getAnimeId(animeId)} anime={animeId}/>
      ))}
    </div>
  )
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Favorites
