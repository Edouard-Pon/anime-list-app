import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/auth'
import { useState } from 'react'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal'

function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link to="/anime" className="text-white">Anime</Link>
        </li>
        <li>
          <Link to="/characters" className="text-white">Characters</Link>
        </li>
        <li>
          <Link to="/about" className="text-white">About</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </li>
        ) : (
          <>
            <li>
              <button onClick={() => setLoginModalOpen(true)} className="text-white">Login</button>
            </li>
            <li>
              <button onClick={() => setRegisterModalOpen(true)} className="text-white">Register</button>
            </li>
          </>
        )}
      </ul>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}/>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)}/>
    </nav>
  )
}

export default Navigation
