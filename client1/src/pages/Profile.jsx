import { useSelector } from 'react-redux';


export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-6">
        Profile
      </h1>
      <form className='flex flex-col gap-3'>
        <img className='rounded-full h-21 w-21 object-cover cursor-pointer  mt-2' src={currentUser.avatar} alt="profile" />
        <input type="text" placeholder='username'id='username' className='border p-4 rounded-lg' />
        <input type="email" placeholder='email' id='email' className='border p-4 rounded-lg ' />
        <input type="password" placeholder='password' id='password' className='border p-4 rounded-lg ' />
        <button className='bg-slate-500 p-3 text-white rounded-lg disabled:opacity-80 hover:opacity-90 '>
          Update
        </button>
        
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-500 cursor-pointer' >Delete account</span>
        <span className='text-red-500 cursor-pointer' >Sign out</span>
      </div>
    </div>
  )
}


