export const getAnimeId = (anime) => anime._id
export const getAnimeTitle = (anime) => anime.title
export const getAnimeCoverImage = (anime) => anime.coverImagePath

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
