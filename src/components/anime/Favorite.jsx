import PropTypes from 'prop-types'
import BookmarkOutlineIcon from '@heroicons/react/24/outline/BookmarkIcon'
import BookmarkSolidIcon from '@heroicons/react/24/solid/BookmarkIcon'

const Favorite = ({ isFavorite, handleFavorite }) => {
  return (
    <button onClick={handleFavorite}>
      {isFavorite ? (
        <BookmarkSolidIcon className="w-8 h-8 text-blue-500" />
      ) : (
        <BookmarkOutlineIcon className="w-8 h-8 text-gray-500" />
      )}
    </button>
  )
}

Favorite.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired
}

export default Favorite
