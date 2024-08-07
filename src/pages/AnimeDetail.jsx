import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnimeById, resetSelectedStatus } from '../store/anime'
import Loading from '../components/Loading'
import ButtonDeleteAnime from '../components/ButtonDelete'
import ButtonEditAnime from '../components/ButtonEdit'
import { formatDate } from '../utils/utils'
import {
  getAnimeCoverImage,
  getAnimeDescription,
  getAnimeDuration,
  getAnimeEpisodes,
  getAnimeExternalLink,
  getAnimeId,
  getAnimeGenres,
  getAnimeRating,
  getAnimeReleaseDate,
  getAnimeSource,
  getAnimeStatus,
  getAnimeThemes,
  getAnimeTitle,
  getAnimeType,
  getAnimeUploadDate
} from '../utils/animeUtils.js';

const AnimeDetail = () => {
  const { id } = useParams()
  const anime = useSelector((state) => state.anime.selectedAnime)
  const status = useSelector((state) => state.anime.selectedStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnimeById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetSelectedStatus())
    }
  }, [status, dispatch])

  if (status === 'loading') return <Loading />
  if (status === 'failed') return <div>Error fetching anime</div>

  return (
    <div className="container mx-auto p-4 bg-gray-100 flex flex-wrap gap-6">
      <div>
        <div className="max-w-64">
          <img className="rounded-lg object-cover" src={getAnimeCoverImage(anime)} alt={getAnimeTitle(anime)}/>
        </div>
        <div className="flex flex-col gap-1 p-2 mt-6 bg-gray-200 rounded-lg">
          <div className="px-3 py-1 rounded-lg hover:bg-gray-100">
            <p className="text-xs">Type</p>
            <p className="text-lg">{getAnimeType(anime)}</p>
          </div>
          <div>
            <p>Episodes</p>
            <p>{getAnimeEpisodes(anime)}</p>
          </div>
          <div>
            <p>Status</p>
            <p>{getAnimeStatus(anime)}</p>
          </div>
          {getAnimeReleaseDate(anime) && (
            <div>
              <p>Release Date</p>
              <p>{formatDate(getAnimeReleaseDate(anime))}</p>
            </div>
          )}
          <div>
            <p>Upload Date</p>
            <p>{formatDate(getAnimeUploadDate(anime))}</p>
          </div>
          {getAnimeRating(anime) && (
            <div>
              <p>Rating</p>
              <p>{getAnimeRating(anime)}</p>
            </div>
          )}
          {getAnimeSource(anime) && (
            <div>
              <p>Source</p>
              <p>{getAnimeSource(anime)}</p>
            </div>
          )}
          {getAnimeDuration(anime) && (
            <div>
              <p>Duration</p>
              <p>{getAnimeDuration(anime)}</p>
            </div>
          )}
          <div>
            <p>Genres</p>
            <p>{getAnimeGenres(anime).join(', ')}</p>
          </div>
          {getAnimeThemes(anime).length > 0 && (
            <div>
              <p>Themes</p>
              <p>{getAnimeThemes(anime).join(', ')}</p>
            </div>
          )}
          {getAnimeExternalLink(anime) && (
            <div>
              <p>External Link</p>
              <p>
                <a href={getAnimeExternalLink(anime)} target="_blank" rel="noreferrer">
                  {getAnimeExternalLink(anime)}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-200 flex-grow rounded-lg p-4">
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl">{getAnimeTitle(anime)}</h1>
          <div className="flex flex-row gap-3">
            {anime && getAnimeId(anime) && <ButtonEditAnime anime={anime} />}
            <ButtonDeleteAnime id={id} />
          </div>
        </div>
        {getAnimeDescription(anime) && (
          <div className="rounded-lg bg-gray-300 p-4">
            <p className="text-sm">{getAnimeDescription(anime)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimeDetail
