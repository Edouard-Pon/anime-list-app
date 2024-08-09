import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters } from '../store/characters.js'
import CharacterCard from '../components/character/CharacterCard'
import { getCharacterId } from '../utils/characterUtils'
import { isAdmin } from '../utils/authUtils'
import CharacterFormModal from '../components/character/CharacterFormModal'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'

const Characters = () => {
  const user = useSelector((state) => state.auth.user)
  const charactersList = useSelector((state) => state.characters.characters)
  const status = useSelector((state) => state.characters.status)
  const searchStatus = useSelector((state) => state.characters.searchStatus)
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchCharacters({}))
    }
  }, [dispatch, isSearching])

  if (status === 'failed') return <div>Error fetching characters</div>

  return (
    <div className="container bg-gray-100 m-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Characters</h1>
        {user && isAdmin(user) && (
          <>
            <button className="bg-blue-500 text-white rounded p-2 my-6" onClick={() => setModalOpen(true)}>
              Add Character
            </button>
            <CharacterFormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </>
        )}
        <SearchBar setIsSearching={setIsSearching} />
      </div>
      {((isSearching && searchStatus === 'loading') || status === 'loading') && <Loading />}
      <div className="grid justify-items-center gap-6 p-6" style={{gridTemplateColumns: "repeat(auto-fit, minmax(208px, 1fr))"}}>
        {charactersList.map(character => (
          <CharacterCard key={getCharacterId(character)} character={character}/>
        ))}
      </div>
    </div>
  )
}

export default Characters
