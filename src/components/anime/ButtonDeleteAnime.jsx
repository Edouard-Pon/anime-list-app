import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnime, resetDeleteStatus } from '../../store/anime.js'
import PropTypes from 'prop-types'
import { isAdmin } from '../../utils/authUtils.js'
import { useNavigate } from 'react-router-dom'

const ButtonDeleteAnime = ({ id }) => {
  const dispatch = useDispatch()
  const animeDeleteStatus = useSelector((state) => state.anime.deleteStatus)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleDeleteAnime = () => {
    dispatch(deleteAnime(id))
  };

  useEffect(() => {
    if (animeDeleteStatus === 'succeeded') {
      dispatch(resetDeleteStatus())
      navigate('/anime')
    }
  }, [animeDeleteStatus, dispatch, navigate])

  if (!user || !isAdmin(user)) return

  return (
    <button
      className="bg-red-500 w-24 h-12 text-white rounded p-2 hover:bg-red-600 disabled:bg-red-300"
      onClick={handleDeleteAnime}
    >
      Delete
    </button>
  )
}

ButtonDeleteAnime.propTypes = {
  id: PropTypes.string.isRequired,
}

export default ButtonDeleteAnime
