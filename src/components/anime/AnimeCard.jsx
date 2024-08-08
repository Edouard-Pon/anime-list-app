import { Link } from 'react-router-dom';
import { getAnimeTitle, getAnimeCoverImage, getAnimeId } from '../../utils/animeUtils.js'
import { animePropTypes } from '../../props/animePropTypes.js';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${getAnimeId(anime)}`} className="bg-white shadow-md rounded-lg flex flex-col justify-between h-full cursor-pointer">
      <img className="w-full h-64 object-cover rounded-t-lg" src={getAnimeCoverImage(anime)} alt={getAnimeTitle(anime)}/>
      <h2 className="p-4 text-lg font-semibold text-gray-800">{getAnimeTitle(anime)}</h2>
    </Link>
  )
}

AnimeCard.propTypes = {
  anime: animePropTypes
}

export default AnimeCard
