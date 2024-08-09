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
    <div className="container bg-gray-100 m-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Characters</h1>
      </div>
      {status === 'loading' && <Loading />}
      <div className="grid justify-items-center gap-6 p-6" style={{gridTemplateColumns: "repeat(auto-fit, minmax(208px, 1fr))"}}>
        {charactersList.map(character => (
          <CharacterCard key={getCharacterId(character)} character={character}/>
        ))}
      </div>
    </div>
  )
}

export default Characters
