import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
  addAnimeToToWatch,
  addAnimeToWatched,
  addAnimeToAbandoned,
  addAnimeToWatching,
  removeAnimeFromToWatch,
  removeAnimeFromWatched,
  removeAnimeFromAbandoned,
  removeAnimeFromWatching,
} from '../../store/animeList.js'
import {fetchAnimeList} from '../../store/animeList.js'
import {useDispatch, useSelector} from 'react-redux'
import {findAnimeListCurrentStatus} from '../../utils/animeListUtils.js'

const AnimeStatusDropdown = ({ animeId }) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('default')
  const [currentStatus, setCurrentStatus] = useState('default')
  const animeList = useSelector(state => state.animeList.animeList)

  useEffect(() => {
    dispatch(fetchAnimeList())
  }, [dispatch]);

  useEffect(() => {
    if (animeList.length === 0) return
    const currentStatus = findAnimeListCurrentStatus(animeId, animeList)
    setStatus(currentStatus)
    setCurrentStatus(currentStatus)
  }, [animeId, animeList])

  useEffect(() => {
    if (currentStatus === status) return

    switch (status) {
      case 'watching':
          dispatch(addAnimeToWatching(animeId))
        break
      case 'toWatch':
          dispatch(addAnimeToToWatch(animeId))
        break
      case 'watched':
          dispatch(addAnimeToWatched(animeId))
        break
      case 'abandoned':
          dispatch(addAnimeToAbandoned(animeId))
        break
      default:
        break
    }

    if (currentStatus === 'default') return

    switch (currentStatus) {
      case 'watching':
          dispatch(removeAnimeFromWatching(animeId))
        break
      case 'toWatch':
          dispatch(removeAnimeFromToWatch(animeId))
        break
      case 'watched':
          dispatch(removeAnimeFromWatched(animeId))
        break
      case 'abandoned':
          dispatch(removeAnimeFromAbandoned(animeId))
        break
      default:
        break
    }
  }, [status, currentStatus, animeId, dispatch])


  return (
    <select value={status} onChange={e => setStatus(e.target.value)}>
      <option value="default">Select status</option>
      <option value="watching">Watching</option>
      <option value="watched">Watched</option>
      <option value="toWatch">To Watch</option>
      <option value="abandoned">Abandoned</option>
    </select>
  )
}

AnimeStatusDropdown.propTypes = {
  animeId: PropTypes.string.isRequired,
}

export default AnimeStatusDropdown
