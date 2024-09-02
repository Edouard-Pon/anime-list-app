import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCharacter, resetDeleteStatus } from '../../store/characters'
import PropTypes from 'prop-types'
import { isAdmin } from '../../utils/authUtils.js'
import { useNavigate } from 'react-router-dom'

const ButtonDeleteCharacter = ({ id }) => {
  const dispatch = useDispatch()
  const characterDeleteStatus = useSelector((state) => state.characters.deleteStatus)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleDeleteCharacter = () => {
    dispatch(deleteCharacter(id))
  };

  useEffect(() => {
    if (characterDeleteStatus === 'succeeded') {
      dispatch(resetDeleteStatus())
      navigate('/characters')
    }
  }, [characterDeleteStatus, dispatch, navigate])

  if (!user || !isAdmin(user)) return

  return (
    <button
      className="bg-red-500 w-24 h-12 text-white rounded p-2 hover:bg-red-600 disabled:bg-red-300"
      onClick={handleDeleteCharacter}
    >
      Delete
    </button>
  )
}

ButtonDeleteCharacter.propTypes = {
  id: PropTypes.string.isRequired,
}

export default ButtonDeleteCharacter
