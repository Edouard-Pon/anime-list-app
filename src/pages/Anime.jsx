import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnime } from '../store/anime'
import AnimeCard from '../components/anime/AnimeCard.jsx'
import { getAnimeId } from '../utils/animeUtils.js'
import { isAdmin } from '../utils/authUtils.js'
import AnimeFormModal from '../components/anime/AnimeFormModal.jsx'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'

const Anime = () => {
  const user = useSelector((state) => state.auth.user)
  const animeList = useSelector((state) => state.anime.anime)
  const status = useSelector((state) => state.anime.status)
  const searchStatus = useSelector((state) => state.anime.searchStatus)
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchAnime())
    }
  }, [dispatch, isSearching])

  if (status === 'failed') return <div>Error fetching anime</div>

  return (
    <div className="container bg-gray-100 m-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Anime</h1>
        {user && isAdmin(user) && (
          <>
            <button className="bg-blue-500 text-white rounded p-2 my-6" onClick={() => setModalOpen(true)}>
              Add Anime
            </button>
            <AnimeFormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </>
        )}
        <SearchBar setIsSearching={setIsSearching} />
      </div>
      {((isSearching && searchStatus === 'loading') || status === 'loading') && <Loading />}
      <div className="grid justify-items-center gap-y-6 p-6" style={{gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"}}>
        {animeList.map(anime => (
          <AnimeCard key={getAnimeId(anime)} anime={anime}/>
        ))}
      </div>
    </div>
  )
}

export default Anime
