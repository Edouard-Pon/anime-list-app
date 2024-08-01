import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/auth'
import { useState } from 'react'
import AuthModal from './AuthModal'

function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)

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
          <Link to="/about" className="text-white">About</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={() => setModalOpen(true)} className="text-white">Login</button>
          </li>
        )}
      </ul>
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  )
}

export default Navigation
