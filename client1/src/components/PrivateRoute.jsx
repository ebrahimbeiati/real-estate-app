import {useSelector} from 'react-redux'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
  return (
    <div>
      {currentUser ? <Profile/> : <SignIn/>}
      
    </div>
  )
}

export default PrivateRoute
