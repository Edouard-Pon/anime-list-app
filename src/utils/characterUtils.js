export const getCharacterId = (character) => character._id || null
export const getCharacterName = (character) => character.name || null
export const getCharacterOriginalName = (character) => character.originalName || null
export const getCharacterDescription = (character) => character.description || null
export const getCharacterImage = (character) => character.coverImageUrl || null
export const getCharacterAnime = (character) => character.anime || []
export const getCharacterUploadDate = (character) => character.uploadDate || null
export const getCharactersIdArray = (characters) => characters.map((character) => getCharacterId(character))

export const buildCharacterFormData = (character) => {
  const formData = new FormData()
  formData.append('name', character.name)
  formData.append('originalName', character.originalName)
  formData.append('description', character.description)
  formData.append('image', character.image)
  formData.append('anime', character.anime)
  return formData
}
