import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/auth.js'
import PropTypes from 'prop-types';

const AuthModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const authError = useSelector((state) => state.auth.error)

  const handleLogin = () => {
    dispatch(login({ username, password }))
  }

  useEffect(() => {
    if (authStatus === 'succeeded') {
      onClose()
    }
  }, [authStatus, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          disabled={authStatus === 'loading'}
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          {authStatus === 'loading' ? 'Loading...' : 'Login'}
        </button>
        {authError && <p className="text-red-500 mt-4">{authError}</p>}
        <button onClick={onClose} className="text-blue-500 mt-4">Close</button>
      </div>
    </div>
  )
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default AuthModal
