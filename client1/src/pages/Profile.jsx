import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7 ">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full object-cover h-20 w-20 cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          { fileUploadError
            ? ( <span className="text-red-600">File Upload Error(Image must be less than 2 mb</span> ): filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-slate-600"> {`Uploading ${filePercentage}%`}</span> ) : filePercentage === 100 ? (
                  <span className="text-green-600">Uploaded</span>
              ):( ""
         ) }
          </p>
             
         
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer">
          Delete
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition duration-
        200 ease-in-out text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Profile;
