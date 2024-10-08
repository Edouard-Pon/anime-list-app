import {PlusIcon, XMarkIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnime, updateAnime, resetUploadStatus, resetUpdateStatus } from '../../store/anime.js'
import { searchCharacters } from '../../store/characters.js'
import PropTypes from 'prop-types'
import { animePropTypes } from '../../props/animePropTypes.js'
import { format } from 'date-fns'
import Loading from '../Loading'
import {
  getAnimeCharacters,
  getAnimeCoverImage,
  getAnimeDescription, getAnimeDuration,
  getAnimeEpisodes, getAnimeExternalLink, getAnimeGenres,
  getAnimeId, getAnimeRating, getAnimeReleaseDate, getAnimeSource,
  getAnimeStatus,
  getAnimeTitle,
  getAnimeType
} from '../../utils/animeUtils.js'
import {getCharacterId, getCharacterName} from '../../utils/characterUtils.js'

const AnimeFormModal = ({ isOpen, onClose, anime = null }) => {
  const dispatch = useDispatch()

  const animeStatus = useSelector((state) => state.anime.status)
  const animeUploadStatus = useSelector((state) => state.anime.uploadStatus)
  const animeUpdateStatus = useSelector((state) => state.anime.updateStatus)
  const animeError = useSelector((state) => state.anime.error)

  const charactersList = useSelector((state) => state.characters.characters)

  const [title, setTitle] = useState(anime ? getAnimeTitle(anime) : '')
  const [type, setType] = useState(anime ? getAnimeType(anime) : '')
  const [episodes, setEpisodes] = useState(anime ? getAnimeEpisodes(anime) : '')
  const [status, setStatus] = useState(anime ? getAnimeStatus(anime) : '')
  const [description, setDescription] = useState(anime ? getAnimeDescription(anime) : '')
  const [releaseDate, setReleaseDate] = useState(anime ? format(new Date(getAnimeReleaseDate(anime)), 'yyyy-MM-dd') : '')
  const [source, setSource] = useState(anime ? getAnimeSource(anime) : '')
  const [externalLink, setExternalLink] = useState(anime ? getAnimeExternalLink(anime) : '')
  const [cover, setCover] = useState(anime ? getAnimeCoverImage(anime) : null)
  const [genres, setGenres] = useState(anime ? getAnimeGenres(anime) : [''])
  const [duration, setDuration] = useState(anime ? getAnimeDuration(anime) : '')
  const [rating, setRating] = useState(anime ? getAnimeRating(anime) : '')
  // const [themes, setThemes] = useState([]) // TODO - WIP
  const [characters, setCharacters] = useState(anime ? getAnimeCharacters(anime) : [])
  const [previewUploadCover, setPreviewUploadCover] = useState(!anime)
  const [isCharactersOpen, setIsCharactersOpen] = useState(false)
  const [charactersSearch, setCharactersSearch] = useState('')

  const handleSaveAnime = () => {
    if (anime) {
      dispatch(updateAnime({
        id: getAnimeId(anime),
        title,
        type,
        episodes,
        status,
        description,
        releaseDate,
        source,
        externalLink,
        cover,
        genres,
        duration,
        rating,
        characters
      }))
    } else {
      dispatch(addAnime({
        title,
        type,
        episodes,
        status,
        description,
        releaseDate,
        source,
        externalLink,
        cover,
        genres,
        duration,
        rating,
        characters
      }))
    }
  }

  const handleAddGenre = () => {
    setGenres([...genres, ''])
  }

  const handleRemoveGenre = (index) => {
    const newGenres = genres.filter((_, i) => i !== index)
    setGenres(newGenres)
  }

  const handleGenreChange = (index, value) => {
    const newGenres = genres.map((genre, i) => i === index ? value : genre)
    setGenres(newGenres)
  }

  useEffect(() => {
    if (animeUploadStatus === 'succeeded' || animeUpdateStatus === 'succeeded') {
      onClose()
      dispatch(resetUploadStatus())
      dispatch(resetUpdateStatus())
    }
  }, [animeUploadStatus, animeUpdateStatus, onClose, dispatch])

  useEffect(() => {
    dispatch(searchCharacters({ name: charactersSearch }))
  }, [charactersSearch, dispatch])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 w-10/12 rounded" onClick={(e) => e.stopPropagation()}>
        {(animeUpdateStatus === 'loading' || animeUploadStatus === 'loading') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Loading />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">{anime ? 'Edit Anime' : 'Add Anime'}</h2>
          {animeError && <p className="text-red-500 font-bold flex items-center">{animeError}</p>}
          <button
            onClick={ () => setIsCharactersOpen(!isCharactersOpen) }
            className={`transition-colors duration-300 ${isCharactersOpen ? 'bg-blue-500 text-white rounded p-2' : 'bg-gray-200 text-black rounded p-2'}`}
          >
            Attach Characters
          </button>
        </div>
        <div className="flex flex-row gap-8 mt-4">
          <div className="basis-1/5">
            <label className="font-semibold text-gray-700" htmlFor="cover">Cover</label>
            <input
              type="file"
              onChange={(e) => {
                  setPreviewUploadCover(true)
                  setCover(e.target.files[0])
                }
              }
              className="border border-gray-300 rounded p-2 w-full mt-1.5"
              required={!anime}
            />
            {cover &&
              <div className="mt-4">
                <label className="font-semibold text-gray-700" htmlFor="cover">Cover Preview</label>
                  <img className="mt-1.5 mx-auto rounded" src={!previewUploadCover ? cover : URL.createObjectURL(cover)} alt="Cover Preview" />
              </div>
            }
          </div>
          <div className={`${isCharactersOpen ? 'basis-3/5' : 'basis-4/5'}`}>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={true}
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="type">Type</label>
                <input
                  type="text"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={true}
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="source">Source</label>
                <input
                  type="text"
                  placeholder="Source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="status">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={true}
                >
                  <option value="null" defaultChecked={true}>Select status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Out">Out</option>
                  <option value="Announced">Announced</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="episodes">Episodes</label>
                <input
                  type="number"
                  placeholder="Episodes"
                  value={episodes}
                  onChange={(e) => setEpisodes(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={true}
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="duration">Duration</label>
                <input
                  type="number"
                  placeholder="Duration (minutes per episode)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="rating">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required={false}
                >
                  <option value="null" defaultChecked={true}>Select rating</option>
                  <option value="13">13+</option>
                  <option value="16">16+</option>
                  <option value="18">18+</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="releaseDate">Release Date</label>
                <input
                  type="date"
                  placeholder="Release Date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required={false}
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="externalLink">External Link</label>
                <input
                  type="text"
                  placeholder="External Link"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required={false}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="font-semibold text-gray-700" htmlFor="genres">Genres</label>
                <button onClick={handleAddGenre} className="text-blue-500 flex items-center">
                  <PlusIcon className="h-5 w-5 mr-1"/>
                  Add Genre
                </button>
              </div>
              <div className="flex flex-row gap-2 flex-wrap mt-1.5">
                {genres.map((genre, index) => (
                  <div key={index} className="relative grow">
                    <input
                      type="text"
                      placeholder="Genre"
                      value={genre}
                      onChange={(e) => handleGenreChange(index, e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full pr-8"
                      required={true}
                    />
                    <button
                      onClick={() => handleRemoveGenre(index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded h-6 w-6 flex items-center justify-center opacity-25 hover:opacity-100 focus:opacity-100"
                    >
                      <XMarkIcon className="text-white h-4 w-4"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="font-semibold text-gray-700" htmlFor="description">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1.5 h-32 resize-none overflow-y-auto"
                required={false}
              />
            </div>
            <div className="flex flex-row gap-6 items-center justify-end mt-4">
              <button onClick={onClose} className="text-blue-500">Close</button>
              <button
                onClick={handleSaveAnime}
                disabled={animeStatus === 'loading'}
                className="bg-blue-500 text-white rounded p-2"
              >
                {animeStatus === 'loading' ? 'Loading...' : anime ? 'Save Changes' : 'Add Anime'}
              </button>
            </div>
          </div>
          {isCharactersOpen && (
            <div className="basis-1/5">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="characters">Search Characters</label>
                <input
                  type="text"
                  placeholder="Search characters"
                  value={charactersSearch}
                  onChange={(e) => setCharactersSearch(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                />
                {charactersSearch && charactersList.length > 0 && (
                  <div className="relative">
                    <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto">
                      {charactersList.map((character) => (
                        <div key={getCharacterId(character)}
                             className="flex items-center justify-between p-2 hover:bg-gray-100">
                          <p>{getCharacterName(character)}</p>
                          <button
                            onClick={() => {
                              if (!characters.some((c) => getCharacterId(c) === getCharacterId(character))) {
                                setCharacters([...characters, character])
                                setCharactersSearch('')
                              }
                            }}
                            className="bg-blue-500 text-white rounded p-0.5"
                          >
                            <PlusIcon className="h-5 w-5"/>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="font-semibold text-gray-700" htmlFor="attachedCharacters">Attached Characters</label>
                <div className="flex flex-col gap-2 mt-1.5">
                  {characters.map((character) => (
                    <div key={getCharacterId(character)} className="flex items-center justify-between rounded p-2 bg-gray-100">
                      <p>{getCharacterName(character)}</p>
                      <button
                        onClick={() => setCharacters(characters.filter((c) => getCharacterId(c) !== getCharacterId(character)))}
                        className="bg-red-500 text-white rounded p-0.5"
                      >
                        <XMarkIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AnimeFormModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  anime: animePropTypes,
}

export default AnimeFormModal
