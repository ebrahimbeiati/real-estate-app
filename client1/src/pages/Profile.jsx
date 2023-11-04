import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice.js";
import { useDispatch } from 'react-redux';
import { app } from '../firebase.js';



export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  
  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true)
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
    
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
        
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  }
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
      
    }
  }



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
        />

        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-21 w-21 object-cover cursor-pointer self-center  mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          accept="image/*"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-500">Something went wrong</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-blue-500">{filePercentage}%</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-500">Uploaded successfully</span>
          ) : (
            ""
          )
          }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-4 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-4 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-4 rounded-lg "
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-500 p-3 text-white rounded-lg disabled:opacity-80 hover:opacity-90 ">
          { loading ? 'Loading...' : 'Update'
         }
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer">Delete account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
      <p>
        <span className="text-red-500 mt-4">{error? error : ''}</span>
      </p>
      <p>
        <span className="text-green-500 mt-4">{updateSuccess ? 'Profile updated successfully' : ''}</span>
      </p>
    </div>
  );
}


