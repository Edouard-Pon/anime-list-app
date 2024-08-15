import PropTypes from 'prop-types'

export const characterPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  originalName: PropTypes.string,
  description: PropTypes.string,
  coverImageUrl: PropTypes.string.isRequired,
  anime: PropTypes.array,
  uploadDate: PropTypes.string.isRequired,
})
