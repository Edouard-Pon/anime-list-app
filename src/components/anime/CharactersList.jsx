import CharacterCard from '../character/CharacterCard.jsx'
import { getAnimeCharacters } from '../../utils/animeUtils.js'
import { getCharacterId } from '../../utils/characterUtils.js'
import { animePropTypes } from '../../props/animePropTypes.js'

const CharactersList = ({ anime }) => {
  const characters = getAnimeCharacters(anime)

  return (
    <div className="flex flex-wrap gap-6">
      {characters.map((character) => (
        <CharacterCard key={getCharacterId(character)} character={character} />
      ))}
    </div>
  )
}

CharactersList.propTypes = {
  anime: animePropTypes
}

export default CharactersList
