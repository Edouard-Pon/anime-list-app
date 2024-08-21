import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnime } from '../store/anime'
import { getAnimeId } from '../utils/animeUtils.js'
import AnimeCard from '../components/anime/AnimeCard.jsx'
import Loading from '../components/Loading.jsx'

const Home = () => {
  const animeList = useSelector((state) => state.anime.anime)
  const status = useSelector((state) => state.anime.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnime())
  }, [dispatch])

  if (status === 'loading') return <Loading />
  if (status === 'failed') return <div>Error fetching anime</div>

  return (
    <div className="container m-auto p-6 bg-gray-100">
      <div className="grid justify-items-center gap-y-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))" }}>
        {animeList.map(anime => (
          <AnimeCard key={getAnimeId(anime)} anime={anime} />
        ))}
      </div>
    </div>
  )
}

export default Home
