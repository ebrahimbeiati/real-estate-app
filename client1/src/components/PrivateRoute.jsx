import {useSelector} from 'react-redux'
import SignIn from '../pages/SignIn'


const PrivateRoute = ({element}) => {
    const {currentUser} = useSelector((state)=>state.user)
  return (
    <div>
      {currentUser ? element : <SignIn/>}
    </div>
  )
}

export default PrivateRoute
