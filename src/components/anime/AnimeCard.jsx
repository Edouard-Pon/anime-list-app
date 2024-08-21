import { Link } from 'react-router-dom';
import { getAnimeTitle, getAnimeCoverImage, getAnimeId } from '../../utils/animeUtils.js'
import { animePropTypes } from '../../props/animePropTypes.js';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${getAnimeId(anime)}`} className="w-64 bg-white shadow-md rounded-lg flex flex-col cursor-pointer">
      <img className="h-80 object-cover rounded-t-lg" src={getAnimeCoverImage(anime)} alt={getAnimeTitle(anime)}/>
      <div className="flex-grow content-center">
        <h2 className="p-2 text-sm font-semibold text-gray-800 flex justify-center">{getAnimeTitle(anime).split('/')[0].trim()}</h2>
      </div>
    </Link>
  )
}

AnimeCard.propTypes = {
  anime: animePropTypes
}

export default AnimeCard
