import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isAdmin } from '../utils/authUtils'
import AnimeFormModal from './AnimeFormModal'
import { animePropTypes } from '../props/animePropTypes'

const ButtonEditAnime = ({ anime }) => {
  const user = useSelector((state) => state.auth.user)
  const [isModalOpen, setModalOpen] = useState(false)

  if (!user || !isAdmin(user)) return

  return (
    <div>
      <button
        className="bg-blue-500 w-24 text-white rounded p-2 hover:bg-blue-600 disabled:bg-red-300"
        onClick={() => setModalOpen(true)}
      >
        Edit
      </button>
      <AnimeFormModal anime={anime} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

ButtonEditAnime.propTypes = {
  anime: animePropTypes,
}

export default ButtonEditAnime
