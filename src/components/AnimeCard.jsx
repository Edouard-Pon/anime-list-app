import { getAnimeTitle, getAnimeCoverImage } from '../utils/animeUtils.js'
import { animePropTypes } from '../props/animePropTypes.js';

const AnimeCard = ({ anime }) => {
  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col justify-between h-full">
      <img className="w-full h-64 object-cover rounded-t-lg" src={getAnimeCoverImage(anime)}
           alt={getAnimeTitle(anime)}/>
      <h2 className="p-4 text-lg font-semibold text-gray-800">{getAnimeTitle(anime)}</h2>
    </div>
  )
}

AnimeCard.propTypes = {
  anime: animePropTypes
}

export default AnimeCard
