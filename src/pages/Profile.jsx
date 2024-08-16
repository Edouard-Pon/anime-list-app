import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import { fetchAnimeList } from '../store/animeList'
import AnimeList from '../components/anime-list/AnimeList'
import {
  getAnimeListAbandoned,
  getAnimeListFavorites,
  getAnimeListToWatch,
  getAnimeListWatched
} from '../utils/animeListUtils.js'

const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const userStatus = useSelector((state) => state.auth.status)
  const animeList = useSelector((state) => state.animeList.animeList)
  const animeListStatus = useSelector((state) => state.animeList.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnimeList())
  }, [dispatch])

  if (userStatus === 'loading') return <Loading />
  if (!user) return <div className="text-red-500 text-center mt-4">You are not logged in</div>

  return (
    <div className="container bg-gray-100 m-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="my-6">
          <div className="text-lg font-bold">Username:</div>
          <div>{user.username}</div>
        </div>
        <div className="my-6">
          <div className="text-lg font-bold">Role:</div>
          <div>{user.role}</div>
        </div>
      </div>
      {animeListStatus === 'loading' && <Loading />}
        {animeList && (
          <AnimeList favorites={getAnimeListFavorites(animeList)} toWatch={getAnimeListToWatch(animeList)} watched={getAnimeListWatched(animeList)} abandoned={getAnimeListAbandoned(animeList)} />
        )}
    </div>
  )
}

export default Profile
