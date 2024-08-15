import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacterById, resetSelectedStatus } from '../store/characters'
import Loading from '../components/Loading'
import ButtonDeleteCharacter from '../components/character/ButtonDeleteCharacter'
import { formatDate } from '../utils/utils'
import {
  getCharacterName,
  getCharacterImage,
  getCharacterUploadDate,
  getCharacterOriginalName,
  getCharacterDescription, getCharacterId,
} from '../utils/characterUtils';
import AnimeCard from '../components/anime/AnimeCard.jsx';
import {getAnimeId} from '../utils/animeUtils.js';
import ButtonEditCharacter from '../components/character/ButtonEditCharacter.jsx';

const CharacterDetail = () => {
  const { id } = useParams()
  const character = useSelector((state) => state.characters.selectedCharacter)
  const animeList = useSelector((state) => state.characters.selectedCharacterAnime)
  const status = useSelector((state) => state.characters.selectedStatus)
  const characterDeleteStatus = useSelector((state) => state.characters.deleteStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCharacterById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetSelectedStatus())
    }
  }, [status, dispatch])

  if (status === 'loading') return <Loading />
  if (status === 'failed') return <div>Error fetching character</div>

  return (
    <div className="container mx-auto p-4 bg-gray-100 flex flex-wrap gap-6">
      {(characterDeleteStatus === 'loading') && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
      <div className="w-64">
        <div className="w-64">
          <img className="rounded-lg object-cover" src={getCharacterImage(character)} alt={getCharacterName(character)}/>
        </div>
        <div className="flex flex-col gap-1 p-2 mt-6 bg-gray-200 rounded-lg">
          <div className="px-3 py-1 rounded-lg hover:bg-gray-100">
            <p className="text-xs">Name</p>
            <p className="text-lg">{getCharacterName(character)}</p>
          </div>
          {getCharacterOriginalName(character) && (
            <div>
              <p>Original Name</p>
              <p>{getCharacterOriginalName(character)}</p>
            </div>
          )}
          <div>
            <p>Upload Date</p>
            <p>{formatDate(getCharacterUploadDate(character))}</p>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-gray-200 rounded-lg p-4">
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl">{getCharacterName(character)}</h1>
          <div className="flex flex-row gap-3">
            {character && getCharacterId(character) && <ButtonEditCharacter character={character} />}
            <ButtonDeleteCharacter id={id} />
          </div>
        </div>
        {getCharacterDescription(character) && (
          <div className="rounded-lg bg-gray-300 p-4">
            <p className="text-sm">{getCharacterDescription(character)}</p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-6">
          {animeList.map(anime => (
            <AnimeCard key={getAnimeId(anime)} anime={anime}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
