import PropTypes from 'prop-types'

export const animePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  episodes: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string,
  releaseDate: PropTypes.string,
  uploadDate: PropTypes.string.isRequired,
  source: PropTypes.string,
  externalLink: PropTypes.string,
  duration: PropTypes.string,
  rating: PropTypes.number,
  genres: PropTypes.array.isRequired,
  themes: PropTypes.array,
  character: PropTypes.array,
  coverImagePath: PropTypes.string.isRequired,
}).isRequired
