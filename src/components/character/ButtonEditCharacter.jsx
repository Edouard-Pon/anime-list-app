import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isAdmin } from '../../utils/authUtils.js'
import CharacterFormModal from './CharacterFormModal'
import { characterPropTypes } from '../../props/characterPropTypes'

const ButtonEditCharacter = ({ character }) => {
  const user = useSelector((state) => state.auth.user)
  const [isModalOpen, setModalOpen] = useState(false)

  if (!user || !isAdmin(user)) return

  return (
    <div>
      <button
        className="bg-blue-500 w-24 h-12 text-white rounded p-2 hover:bg-blue-600 disabled:bg-red-300"
        onClick={() => setModalOpen(true)}
      >
        Edit
      </button>
      <CharacterFormModal character={character} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

ButtonEditCharacter.propTypes = {
  character: characterPropTypes,
}

export default ButtonEditCharacter
