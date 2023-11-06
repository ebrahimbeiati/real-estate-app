import { useState } from "react";
import {
  getStorage,
  ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {app} from '../firebase';
const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: [], });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrl < 8) {
      setUploading(true);
      e.preventDefault();
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData, imageUrl: formData.imageUrl.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        }).catch((err) => {
          setImageUploadError('Image upload failed');
          setUploading(false);
          console.log(err);
        });
    } else {
      setImageUploadError('You can upload only 7 images per list');
      setUploading(false)

    
  }
};

  const storageImage = async(file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress < 100) {
            console.log("Upload is running");
          } 
          if (progress === 100) {
            console.log("Upload is done");
          }
        },
        (error) => {
          reject(error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{ resolve(downloadURL);
        });
    }
    );
  });
  };
const handleRemoveImage = (index) => {
  setFormData({
    ...formData,
    imageUrl: formData.imageUrl.filter((_, i) => i !== index),
  });
};

  
   
    
  
   
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col  flex-1 gap-4 ">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="Description"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="Address"
            required
            className="border p-3 rounded-lg"
          />
          <div className="flex  gap-5 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Rent" className="w-5" />
              <label htmlFor="sell">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking spot" className="w-5" />
              <label htmlFor="sell">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="sell">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="sell">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <div className="flex items-center gap-3 ">
              <input
                type="number"
                id="Beds"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg "
              />
              <label htmlFor="Beds">Beds</label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="number"
                id="Bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg "
              />
              <label htmlFor="Bathrooms">Bathrooms</label>
            </div>
            <div className="flex items-center gap-3 ">
              <input
                type="number"
                id="regularPrice"
                min="1000"
                max="10000"
                required
                className="p-3 border border-gray-400 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regular price">Regular price</label>
                <span>(£/month)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 ">
              <input
                type="number"
                id="Discount Price"
                min="100"
                max="1000"
                required
                className="p-3 border border-gray-400 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <label htmlFor="discount price">Discounted price</label>
                <span>(£/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 mt-4">
          <p className="font-bold">
            Images:
            <span className="font-normal text-gray-500">
              The first image will be the cover(max-7)
            </span>
          </p>
          <div className="flex gap-2 ">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-400 rounded-w-full"
              type="file"
              accept="image/*"
              id="image"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleSubmit}
              className=" p-3 text-green-600 border  border-gray-400 rounded uppercase hover:shadow-lg disabled:opacity-70 "
            >
              {
                uploading ? 'Uploading...': 'Upload'

              }
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-500 text-center">{imageUploadError}</p>)}
          {formData.imageUrl.length > 0 && formData.imageUrl.map((url, index) => (
            <div key={url} className="flex justify-between p-3 border items-center">
            <img src={url} alt="Listing images" className="w-20 h-20 object-contain rounded-lg" />
            <button onClick={()=> handleRemoveImage(index)} type="button" className="text-red-500 uppercase P-3 hover:text-red-700">Remove</button>
            </div>
          ))}

          <button className="bg-blue-500 p-3 mt-4 text-white text-center rounded-lg disabled:opacity-80 hover:opacity-90 uppercase">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;


