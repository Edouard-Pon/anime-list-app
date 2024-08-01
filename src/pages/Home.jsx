import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnime } from '../store/anime'
import { getAnimeId } from '../utils/animeUtils.js'
import AnimeCard from '../components/AnimeCard'

const Home = () => {
  const animeList = useSelector((state) => state.anime.anime)
  const status = useSelector((state) => state.anime.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnime())
  }, [dispatch])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error fetching anime</div>

  return (
    <div className="m-auto w-9/12 p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {animeList.map(anime => (
        <AnimeCard key={getAnimeId(anime)} anime={anime}/>
      ))}
    </div>
  )
}

export default Home
