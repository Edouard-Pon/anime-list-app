import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnime } from '../store/anime'
import AnimeCard from '../components/AnimeCard'
import { getAnimeId } from '../utils/animeUtils.js'
import { isAdmin } from '../utils/authUtils.js'
import AnimeFormModal from '../components/AnimeFormModal'

const Anime = () => {
  const user = useSelector((state) => state.auth.user)
  const animeList = useSelector((state) => state.anime.anime)
  const status = useSelector((state) => state.anime.status)
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchAnime())
  }, [dispatch])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error fetching anime</div>

  return (
    <div className="w-9/12 bg-gray-100 m-auto">
      <div>
        <h1 className="text-3xl font-bold p-6">Anime</h1>
        {user && isAdmin(user) && (
          <>
            <button className="bg-blue-500 text-white rounded p-2 m-6" onClick={() => setModalOpen(true)}>
              Add Anime
            </button>
            <AnimeFormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </>
        )}
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {animeList.map(anime => (
          <AnimeCard key={getAnimeId(anime)} anime={anime}/>
        ))}
      </div>
    </div>
  )
}

export default Anime
