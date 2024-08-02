import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnime, resetUploadStatus } from '../store/anime'
import PropTypes from 'prop-types'

const AnimeFormModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const animeStatus = useSelector((state) => state.anime.status)
  const animeUploadStatus = useSelector((state) => state.anime.uploadStatus)
  const animeError = useSelector((state) => state.anime.error)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [episodes, setEpisodes] = useState('')
  const [status, setStatus] = useState('Ongoing')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [source, setSource] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [cover, setCover] = useState(null)
  const [genres, setGenres] = useState([])
  // const [themes, setThemes] = useState([]) // TODO - WIP
  const [duration, setDuration] = useState('')
  const [rating, setRating] = useState('')
  // const [character, setCharacter] = useState([]) // TODO - WIP - character - add input with search character method

  const handleAddAnime = () => {
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
      // themes,
      duration,
      rating,
      // character
    }))
  };

  useEffect(() => {
    if (animeUploadStatus === 'succeeded') {
      onClose()
      dispatch(resetUploadStatus())
    }
  }, [animeUploadStatus, onClose, dispatch])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Add Anime</h2>
        <input
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        />
        <input
          type="number"
          placeholder="Episodes"
          value={episodes}
          onChange={(e) => setEpisodes(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Out">Out</option>
          <option value="Announced">Announced</option>
        </select>
        <input
          type="date"
          placeholder="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        />
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        />
        <input
          type="text"
          placeholder="External Link"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        />
        <input
          type="number"
          placeholder="Duration (minutes per episode)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        >
          <option value="null" defaultChecked={true}>Select rating</option>
          <option value="13">13+</option>
          <option value="16">16+</option>
          <option value="18">18+</option>
        </select>
        <input
          type="text"
          placeholder="Genres"
          value={genres}
          onChange={(e) => setGenres([e.target.value])}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={true}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required={false}
        />
        <button
          onClick={handleAddAnime}
          disabled={animeStatus === 'loading'}
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          {animeStatus === 'loading' ? 'Loading...' : 'Add Anime'}
        </button>
        {animeError && <p className="text-red-500 mt-4">{animeError}</p>}
        <button onClick={onClose} className="text-blue-500 mt-4">Close</button>
      </div>
    </div>
  )
}

AnimeFormModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default AnimeFormModal
