export const getAnimeListFavorites = (animeList) => animeList.favorites || []
export const getAnimeListToWatch = (animeList) => animeList.toWatch || []
export const getAnimeListWatched = (animeList) => animeList.watched || []
export const getAnimeListAbandoned = (animeList) => animeList.abandoned || []
export const getAnimeListAnime = (item) => item.animeId || null

export const findAnimeListCurrentStatus = (animeId, animeList) => {
  const { toWatch, watched, abandoned } = animeList

  if (toWatch.some(anime => anime.animeId._id === animeId)) return 'toWatch'
  if (watched.some(anime => anime.animeId._id === animeId)) return 'watched'
  if (abandoned.some(anime => anime.animeId._id === animeId)) return 'abandoned'

  return 'default'
}
