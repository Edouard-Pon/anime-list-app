export const getAnimeListFavorites = (animeList) => animeList.favorites || []
export const getAnimeListToWatch = (animeList) => animeList.toWatch || []
export const getAnimeListWatched = (animeList) => animeList.watched || []
export const getAnimeListAbandoned = (animeList) => animeList.abandoned || []
export const getAnimeListAnime = (item) => item.animeId || null
