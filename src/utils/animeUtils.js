export const getAnimeId = (anime) => anime._id || null
export const getAnimeTitle = (anime) => anime.title || null
export const getAnimeCoverImage = (anime) => anime.coverImagePath || null
export const getAnimeDescription = (anime) => anime.description || null
export const getAnimeType = (anime) => anime.type || null
export const getAnimeEpisodes = (anime) => anime.episodes || null
export const getAnimeStatus = (anime) => anime.status || null
export const getAnimeReleaseDate = (anime) => anime.releaseDate || null
export const getAnimeUploadDate = (anime) => anime.uploadDate || null
export const getAnimeSource = (anime) => anime.source || null
export const getAnimeExternalLink = (anime) => anime.externalLink || null
export const getAnimeDuration = (anime) => anime.duration || null
export const getAnimeRating = (anime) => anime.rating || null
export const getAnimeGenres = (anime) => anime.genres || []
export const getAnimeThemes = (anime) => anime.themes || []
export const getAnimeCharacters = (anime) => anime.characters || []

export const buildAnimeFormData = (anime) => {
  const formData = new FormData()
  formData.append('title', anime.title)
  formData.append('type', anime.type)
  formData.append('episodes', anime.episodes)
  formData.append('status', anime.status)
  formData.append('description', anime.description)
  formData.append('releaseDate', anime.releaseDate)
  formData.append('source', anime.source)
  formData.append('externalLink', anime.externalLink)
  formData.append('duration', anime.duration)
  formData.append('rating', anime.rating)
  formData.append('genres', anime.genres)
  formData.append('cover', anime.cover)
  return formData
}
