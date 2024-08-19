import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCharacter, updateCharacter, resetUpdateStatus, resetUploadStatus } from '../../store/characters'
import PropTypes from 'prop-types';
import { characterPropTypes } from '../../props/characterPropTypes'
import {
  getCharacterOriginalName,
  getCharacterDescription,
  getCharacterImage,
  getCharacterName, getCharacterId, getCharacterAnime,
} from '../../utils/characterUtils'
import Loading from '../Loading'
import {getAnimeId, getAnimeTitle} from '../../utils/animeUtils.js'
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/solid'
import {searchAnime} from '../../store/anime.js'

const CharacterFormModal = ({ character = null, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const characterUploadStatus = useSelector((state) => state.characters.uploadStatus)
  const characterUpdateStatus = useSelector((state) => state.characters.updateStatus)
  const characterError = useSelector((state) => state.characters.error)

  const animeList = useSelector((state) => state.anime.anime)

  const [name, setName] = useState(character ? getCharacterName(character) : '')
  const [originalName, setOriginalName] = useState(character ? getCharacterOriginalName(character) : '')
  const [description, setDescription] = useState(character ? getCharacterDescription(character) : '')
  const [image, setImage] = useState(character ? getCharacterImage(character) : null)
  const [previewImage, setPreviewImage] = useState(!character)
  const [relatedAnime, setRelatedAnime] = useState(character ? getCharacterAnime(character) : [])
  const [animeSearch, setAnimeSearch] = useState('')
  const [isAnimeSearchOpen, setIsAnimeSearchOpen] = useState(false)

  const handleSaveCharacter = () => {
    if (character) {
      dispatch(updateCharacter({ id: getCharacterId(character), name, originalName, description, image, anime: relatedAnime }))
    } else {
      dispatch(addCharacter({ name, originalName, description, image, anime: relatedAnime }))
    }
  }

  useEffect(() => {
    if (characterUploadStatus === 'succeeded' || characterUpdateStatus === 'succeeded') {
      onClose()
      dispatch(resetUploadStatus())
      dispatch(resetUpdateStatus())
    }
  }, [characterUploadStatus, characterUpdateStatus, onClose, dispatch])

  useEffect(() => {
    dispatch(searchAnime({ title: animeSearch }))
  }, [animeSearch, dispatch])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 w-2/3 rounded" onClick={(e) => e.stopPropagation()}>
        {(characterUpdateStatus === 'loading' || characterUploadStatus === 'loading') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Loading />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">{character ? 'Edit Character' : 'Add Character'}</h2>
          {characterError && <p className="text-red-500 font-bold flex items-center">{characterError}</p>}
          <button
            onClick={() => setIsAnimeSearchOpen(!isAnimeSearchOpen)}
            className={`transition-colors duration-300 ${isAnimeSearchOpen ? 'bg-blue-500 text-white rounded p-2' : 'bg-gray-200 text-black rounded p-2'}`}
          >
            Attach Anime
          </button>
        </div>
        <div className="flex flex-row gap-8 mt-4">
          <div className="basis-1/4">
            <label className="font-semibold text-gray-700" htmlFor="image">Image</label>
            <input
              type="file"
              onChange={(e) => {
                  setPreviewImage(true)
                  setImage(e.target.files[0])
                }
              }
              className="border border-gray-300 rounded p-2 w-full mt-1.5"
              required={!character}
            />
            {image &&
              <div className="mt-4">
                <label className="font-semibold text-gray-700" htmlFor="image">Image Preview</label>
                <img className="mt-1.5 mx-auto rounded" src={!previewImage ? image : URL.createObjectURL(image)} alt="image preview" />
              </div>
            }
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="originalName">Original Name</label>
                <input
                  type="text"
                  placeholder="Original Name"
                  value={originalName}
                  onChange={(e) => setOriginalName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                />
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
                onClick={handleSaveCharacter}
                disabled={characterUploadStatus === 'loading' || characterUpdateStatus === 'loading'}
                className="bg-blue-500 text-white rounded p-2"
              >
                {character ? 'Save Changes' : 'Add Character'}
              </button>
            </div>
          </div>
          {isAnimeSearchOpen && (
            <div className="basis-1/5">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="anime">Search Anime</label>
                <input
                  type="text"
                  placeholder="Search Anime"
                  value={animeSearch}
                  onChange={(e) => setAnimeSearch(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                />
              </div>
              {animeSearch && animeList.length > 0 && (
                <div className="relative">
                  <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto">
                    {animeList.map((anime) => (
                      <div key={getAnimeId(anime)} className="flex items-center justify-between p-2 hover:bg-gray-100">
                        <p>{getAnimeTitle(anime)}</p>
                        <button
                          onClick={() => {
                            if (!relatedAnime.some((a) => getAnimeId(a) === getAnimeId(anime))) {
                              setRelatedAnime([...relatedAnime, anime])
                              setAnimeSearch('')
                            }
                          }}
                          className="bg-blue-500 text-white rounded p-0.5"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <label className="font-semibold text-gray-700" htmlFor="attachedAnime">Attached Anime</label>
                <div className="flex flex-col gap-2 mt-1.5">
                  {relatedAnime.map((anime) => (
                    <div key={getAnimeId(anime)} className="flex items-center justify-between rounded p-2 bg-gray-100">
                      <p>{getAnimeTitle(anime)}</p>
                      <button
                        onClick={() => setRelatedAnime(relatedAnime.filter((a) => getAnimeId(a) !== getAnimeId(anime)))}
                        className="bg-red-500 text-white rounded p-0.5"
                      >
                        <XMarkIcon className="h-5 w-5" />
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

CharacterFormModal.propTypes = {
  character: characterPropTypes,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CharacterFormModal
