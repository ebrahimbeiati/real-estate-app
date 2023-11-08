import { Link } from "react-router-dom"



const ListingItem = ({listing}) => {
  return (
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
          <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing" 
              className="w-full h-[300px] sm:h-[200px] hover:scale-105 transition-scale duration-300 object-cover"
              />
              <div>
                  <h1>{listing.title}</h1>
                  <p>{listing.address}</p>
                  <p>£{listing.regularPrice}</p>
              </div>
          </Link>
    </div>
  )
}

export default ListingItem
