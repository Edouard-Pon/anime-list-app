import { getAnimeTitle, getAnimeCoverImage } from '../utils/animeUtils.js'
import { animePropTypes } from '../props/animePropTypes.js';

const AnimeCard = ({ anime }) => {
  return (
    <div>
      <img src={getAnimeCoverImage(anime)} alt={getAnimeTitle(anime)} />
      <h2>{getAnimeTitle(anime)}</h2>
    </div>
  )
}

AnimeCard.propTypes = {
  anime: animePropTypes
}

export default AnimeCard
