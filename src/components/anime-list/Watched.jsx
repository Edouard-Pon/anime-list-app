import AnimeCard from '../anime/AnimeCard'
import { animePropTypes } from '../../props/animePropTypes'
import PropTypes from 'prop-types'
import { getAnimeId } from '../../utils/animeUtils'

const Watched = ({ watched }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-6">
      {watched.map(({ animeId }) => (
        <AnimeCard key={getAnimeId(animeId)} anime={animeId} />
      ))}
    </div>
  )
}

Watched.propTypes = {
  watched: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Watched
