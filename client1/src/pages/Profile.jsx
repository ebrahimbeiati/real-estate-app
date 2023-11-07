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
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure

} from "../redux/user/userSlice.js";
import { useDispatch } from 'react-redux';
import { app } from '../firebase.js';
import { Link } from 'react-router-dom';



export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUerListings] = useState([]);
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
  };
  const handleSignOut = async () => {
    
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  }
  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
     
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUerListings(data);
    } catch (err) {
      setShowListingError(true);
 
    }
  };
  const handleDeleteListing = async (id) => {
    try {
      
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
     
      if (data.success === false) {
        console.log(data.message)
        return;
      }
      setUerListings((prevState) => prevState.filter((item) => item._id !== id)) ;
    } catch (err) {
      console.log(err.message)
  
 
    }
  };
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
          )}
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
        <button
          disabled={loading}
          className="bg-slate-500 p-3 text-white rounded-lg disabled:opacity-80 hover:opacity-90 "
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-blue-500 p-3 text-white text-center rounded-lg disabled:opacity-80 hover:opacity-90 uppercase"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
          Sign out
        </span>
      </div>
      <p>
        <span className="text-red-500 mt-4">{error ? error : ""}</span>
      </p>
      <p>
        <span className="text-green-500 mt-4">
          {updateSuccess ? "Profile updated successfully" : ""}
        </span>
      </p>
      <button
        onClick={handleShowListing}
        className="text-green-600 items-center w-full"
      >
        Show listing
      </button>
      <p>
        <span className="text-red-500 mt-4">
          {showListingError ? showListingError : ""}
        </span>
      </p>
      {userListings && userListings.length > 0 && (
  <div className='flex flex-col gap-3'>
    <h1 className="text-2xl font-semibold text-center mt-6">Listings</h1>
    {userListings.map((listing) => (
      <div
        key={listing._id}
        className="border rounded-lg p-3 justify-between items-center gap-3 flex"
      >
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt="listing cover"
            className="flex-1 font-semibold text-gray-600 hover:underline truncate rounded-lg w-16 h-16 object-contain"
          />
        </Link>
        <Link to={`/listing/${listing._id}`}>
          <p>{listing.title}</p>
        </Link>
        <div className='flex flex-col'>
          <button
            onClick={() => handleDeleteListing(listing._id)}
            className="text-red-700 uppercase">Delete</button>
          <button className="text-green-700 uppercase">Edit</button>
        </div>
      </div>

    ))
          }
          </div>)}
        </div>
      )}
