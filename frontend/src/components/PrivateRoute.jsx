import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { userInfo } = useSelector(state => state.auth) 

  // check if user is logged in, if not, navigate to login. replace to clear history
  return userInfo? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute