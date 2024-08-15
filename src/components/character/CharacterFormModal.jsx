import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCharacter, updateCharacter, resetUpdateStatus, resetUploadStatus } from '../../store/characters'
import PropTypes from 'prop-types';
import { characterPropTypes } from '../../props/characterPropTypes'
import {
  getCharacterOriginalName,
  getCharacterDescription,
  getCharacterImage,
  getCharacterName, getCharacterId,
} from '../../utils/characterUtils'
import Loading from '../Loading'

const CharacterFormModal = ({ character = null, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const characterUploadStatus = useSelector((state) => state.characters.uploadStatus)
  const characterUpdateStatus = useSelector((state) => state.characters.updateStatus)
  const characterError = useSelector((state) => state.characters.error)

  const [name, setName] = useState(character ? getCharacterName(character) : '')
  const [originalName, setOriginalName] = useState(character ? getCharacterOriginalName(character) : '')
  const [description, setDescription] = useState(character ? getCharacterDescription(character) : '')
  const [image, setImage] = useState(character ? getCharacterImage(character) : null)
  const [previewImage, setPreviewImage] = useState(!character)

  const handleSaveCharacter = () => {
    if (character) {
      dispatch(updateCharacter({ id: getCharacterId(character), name, originalName, description, image }))
    } else {
      dispatch(addCharacter({ name, originalName, description, image }))
    }
  }

  useEffect(() => {
    if (characterUploadStatus === 'succeeded' || characterUpdateStatus === 'succeeded') {
      onClose()
      dispatch(resetUploadStatus())
      dispatch(resetUpdateStatus())
    }
  }, [characterUploadStatus, characterUpdateStatus, onClose, dispatch])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 w-2/3" onClick={(e) => e.stopPropagation()}>
        {(characterUpdateStatus === 'loading' || characterUploadStatus === 'loading') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Loading />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">{character ? 'Edit Character' : 'Add Character'}</h2>
          {characterError && <p className="text-red-500 font-bold flex items-center">{characterError}</p>}
        </div>
        <div className="flex flex-row gap-8 mt-4">
          <div className="basis-1/3">
            <label className="font-semibold text-gray-700" htmlFor="image">Image</label>
            <input
              type="file"
              onChange={(e) => {
                  setPreviewImage(true)
                  setImage(e.target.files[0])
                }
              }
              className="border border-gray-300 rounded p-2 w-full mt-1.5"
              required={!character}
            />
            {image &&
              <div className="mt-4">
                <label className="font-semibold text-gray-700" htmlFor="image">Image Preview</label>
                <img className="mt-1.5 mx-auto" src={!previewImage ? image : URL.createObjectURL(image)} alt="image preview" />
              </div>
            }
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700" htmlFor="originalName">Original Name</label>
                <input
                  type="text"
                  placeholder="Original Name"
                  value={originalName}
                  onChange={(e) => setOriginalName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1.5"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="font-semibold text-gray-700" htmlFor="description">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mt-1.5 h-32 resize-none overflow-y-auto"
                required={false}
              />
            </div>
            <div className="flex flex-row gap-6 items-center justify-end mt-4">
              <button onClick={onClose} className="text-blue-500">Close</button>
              <button
                onClick={handleSaveCharacter}
                disabled={characterUploadStatus === 'loading' || characterUpdateStatus === 'loading'}
                className="bg-blue-500 text-white rounded p-2"
              >
                {character ? 'Save Changes' : 'Add Character'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CharacterFormModal.propTypes = {
  character: characterPropTypes,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CharacterFormModal
