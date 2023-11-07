import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../firebase";

const UpdateListing = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "rent",
    offer: false,
    regularPrice: 1000,
    discountedPrice: 0,
    parking: false,
    furnished: false,
    bedrooms: 2,
    bathrooms: 1,
  });
  // Initialize as an empty array

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

      const handleSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 8) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];

          for (let i = 0; i < files.length; i++) {
            promises.push(storageImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError("Image upload failed (2 mb max per image)");
              setUploading(false);
            });
        } else {
          setImageUploadError("You can only upload 6 images per listing");
          setUploading(false);
        }
      };

  const storageImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress < 100) {
            console.log("Upload is running");
          }
          if (progress === 100) {
            console.log("Upload is done");
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountedPrice)
        return setError("Discount price must be lower than regular price");

      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex flex-col  flex-1 gap-4 ">
          <input
            type="text"
            placeholder="Title"
            id="title"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex  gap-5 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <div className="flex items-center gap-3 ">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg "
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg "
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>
            <div className="flex items-center gap-3 ">
              <input
                type="number"
                id="regularPrice"
                min="1000"
                max="10000000"
                required
                className="p-3 border border-gray-400 rounded-lg "
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regular Price">Regular price</label>
                <span>(£/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-3 ">
                <input
                  type="number"
                  id="discountedPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-400 rounded-lg "
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="discounted Price">Discounted price</label>
                  <span>(£/month)</span>
                </div>
              </div>
            )}
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
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="text-red-500 uppercase P-3 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="bg-blue-500 p-3 mt-4 text-white text-center rounded-lg disabled:opacity-80 hover:opacity-90 uppercase"
          >
            {loading ? "Creating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
