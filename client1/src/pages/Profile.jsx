import {useSelector} from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className="text-4xl text-center font-semibold my-7 ">Profile</h1>      
    <form className='flex flex-col gap-3'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full object-cover h-20 w-20 cursor-pointer self-center mt-2' />
        <input type="text" placeholder='username'id='username' className='border p-3 rounded-lg' />
        <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer'>Update</button>
     

        </form>
      
  <div className='flex justify-between mt-3'>
             <button className='bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer'>Delete</button>
        <button type='submit' className='bg-blue-500 hover:bg-blue-600 transition duration-
        200 ease-in-out text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer'>Sign Out</button>
  </div>
    </div>
  )
}

export default Profile
