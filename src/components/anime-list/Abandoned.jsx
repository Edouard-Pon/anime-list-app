import AnimeCard from '../anime/AnimeCard'
import { animePropTypes } from '../../props/animePropTypes'
import PropTypes from 'prop-types'
import { getAnimeId } from '../../utils/animeUtils'

const Abandoned = ({ abandoned }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-6">
      {abandoned.map(({ animeId }) => (
        <AnimeCard key={getAnimeId(animeId)} anime={animeId} />
      ))}
    </div>
  )
}

Abandoned.propTypes = {
  abandoned: PropTypes.arrayOf(
    PropTypes.shape({
      animeId: animePropTypes.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Abandoned
