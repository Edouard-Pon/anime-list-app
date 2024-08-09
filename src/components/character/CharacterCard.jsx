import { Link } from 'react-router-dom'
import { getCharacterName, getCharacterImage, getCharacterId } from '../../utils/characterUtils.js'
import { characterPropTypes } from '../../props/characterPropTypes.js'

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/characters/${getCharacterId(character)}`} className="bg-white shadow-md rounded-lg flex flex-col justify-between h-full cursor-pointer">
      <img className="w-full h-64 object-cover rounded-t-lg" src={getCharacterImage(character)} alt={getCharacterName(character)} />
      <h2 className="p-4 text-lg font-semibold text-gray-800">{getCharacterName(character)}</h2>
    </Link>
  )
}

CharacterCard.propTypes = {
  character: characterPropTypes,
}

export default CharacterCard
