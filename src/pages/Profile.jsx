import { useSelector } from 'react-redux'
import Loading from '../components/Loading'

const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const status = useSelector((state) => state.auth.status)

  if (status === 'loading') return <Loading />
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
    </div>
  )
}

export default Profile
