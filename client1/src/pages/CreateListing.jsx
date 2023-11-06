import { Link } from "react-router-dom";
const CreateListing = () => {
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
              className="p-3 border border-gray-400 rounded-w-full"
              type="file"
              accept="image/*"
              id="image"
              multiple
            />
            <button className=" p-3 text-green-600 border  border-gray-400 rounded uppercase hover:shadow-lg disabled:opacity-70 ">
              Upload
            </button>
          </div>
          <button className="bg-blue-500 p-3 mt-4 text-white text-center rounded-lg disabled:opacity-80 hover:opacity-90 uppercase">
           Create listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;


