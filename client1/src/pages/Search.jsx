import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";
const Search = () => {
    const navigate = useNavigate();
const [sidebardata, setSidebardata] = useState({
  searchTerm: "",
  type: "all",
  offer: false,
  furnished: true, // Define furnished here
  parking: false,
  sort: "created_at",
  order: "desc",
});

    const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

   
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTermFromUrl = urlParams.get("searchTerm");
  const typeFromUrl = urlParams.get("type");
  const offerFromUrl = urlParams.get("offer");
  const furnishedFromUrl = urlParams.get("furnished"); // Corrected variable name
  const parkingFromUrl = urlParams.get("parking");
  const sortFromUrl = urlParams.get("sort");
  const orderFromUrl = urlParams.get("order");
  if (
    searchTermFromUrl ||
    typeFromUrl ||
    offerFromUrl ||
    furnishedFromUrl || // Corrected variable name
    parkingFromUrl ||
    sortFromUrl ||
    orderFromUrl
  ) {
    setSidebardata({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      offer: offerFromUrl === "true" ? true : false,
      furnished: furnishedFromUrl === "true" ? true : false, // Corrected variable name
      parking: parkingFromUrl === "true" ? true : false,
      sort: sortFromUrl || "created_at",
      order: orderFromUrl || "desc",
    });
  }
  const fetchListings = async () => {
    setShowMore(false);
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 8) {
       setShowMore(true);
    }
    else{
        setShowMore(false);
    }
   
    setListings(data);
    setLoading(false);
  };
  fetchListings();
}, [location.search]);

    
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }
        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
        if (e.target.id === 'offer' || e.target.id === 'furnished' || e.target.id === 'parking') {
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_') [0] || 'created_at';
            const order = e.target.value.split('_') [1] || 'desc';

            setSidebardata({ ...sidebardata, sort, order});
        }
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);

  };
  
   

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="Search properties..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Sell & Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span> Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className=" w-5 "
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span> Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="border rounded-lg p-3"
              id="sort_order"
            >
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-600 p-3 uppercase rounded-lg text-white font-semibold">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="flex flex-wrap gap-3 ">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-400">No listing found</p>
          )}
          {loading && <p className="text-xl text-slate-400">Loading...</p>}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
                id={listing.id}
              />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="bg-slate-600 p-3 uppercase rounded-lg text-white font-semibold hover:underline"
            >
              Show more
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};


export default Search;
