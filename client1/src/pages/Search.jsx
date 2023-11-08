
const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="Search properties..."
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className=" w-5 " />
              <span>Sell & Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className=" w-5 " />
              <span> Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className=" w-5 " />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className=" w-5 " />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className=" w-5 " />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className=" w-5 " />
              <span> Furnished</span>
            </div>
            
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                      <label  className="font-semibold">Sort:</label>
                      <select className="border rounded-lg p-3" id="sort_order">
                          <option value="asc">Price: Low to High</option>
                          <option value="desc">Price: High to Low</option>
                          <option value="desc">Newest</option>
                          <option value="desc">Oldest</option>
                      </select>
                  </div>
                  <button className="bg-slate-600 p-3 uppercase rounded-lg text-white font-semibold">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing results:</h1>
      </div>
    </div>
  );
}

export default Search
