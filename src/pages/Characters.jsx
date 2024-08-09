import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters } from '../store/characters.js'
import CharacterCard from '../components/character/CharacterCard'
import { getCharacterId } from '../utils/characterUtils'
import Loading from '../components/Loading'

const Characters = () => {
  const charactersList = useSelector((state) => state.characters.characters)
  const status = useSelector((state) => state.characters.status)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchCharacters({}))
  }, [dispatch])

  if (status === 'failed') return <div>Error fetching characters</div>

  return (
    <div className="w-9/12 bg-gray-100 m-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Characters</h1>
      </div>
      {status === 'loading' && <Loading />}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {charactersList.map(character => (
          <CharacterCard key={getCharacterId(character)} character={character}/>
        ))}
      </div>
    </div>
  )
}

export default Characters
