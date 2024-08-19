import AnimeCard from '../anime/AnimeCard.jsx'
import { getCharacterAnime } from '../../utils/characterUtils.js'
import { getAnimeId } from '../../utils/animeUtils.js'
import { characterPropTypes } from '../../props/characterPropTypes.js'

const AnimeList = ({ character }) => {
  const anime = getCharacterAnime(character)

  return (
    <div className="flex flex-wrap gap-6">
      {anime.map((anime) => (
        <AnimeCard key={getAnimeId(anime)} anime={anime} />
      ))}
    </div>
  )
}

AnimeList.propTypes = {
  character: characterPropTypes
}

export default AnimeList
