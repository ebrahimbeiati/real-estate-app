// import { Link } from "react-router-dom";
// import { MdLocationOn } from "react-icons/md";
// import PropTypes from "prop-types";
// import { getListingImages } from "../utils/listingImages";
// const ListingItem = ({ listing }) => {
//   ListingItem.propTypes = {
//     listing: PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
//       title: PropTypes.string.isRequired,
//       address: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       offer: PropTypes.bool.isRequired,
//       discountedPrice: PropTypes.number.isRequired,
//       regularPrice: PropTypes.number.isRequired,
//       type: PropTypes.oneOf(["rent", "sale"]).isRequired,
//       bedrooms: PropTypes.number.isRequired,
//       bathrooms: PropTypes.number.isRequired,
//       // Add more properties if needed based on the actual structure of your 'listing' object
//     }).isRequired,
//   };
//   // const imageUrl = getListingImages(listing)[0];
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px] rounded-lg">
//       <Link to={`/listing/${listing._id}`}>
//         {/* <img
//           src={listing.imageUrls[0]}
//           alt="listing"
//           className="w-full h-[300px] sm:h-[200px] hover:scale-105
//               transition-scale duration-300 object-cover"
//         /> */}
//         <img
//           src={getListingImages(listing)[0]}
//           alt={listing.title}
//           onError={(event) => {
//             event.currentTarget.onerror = null;
//             event.currentTarget.src = "/house1.avif";
//           }}
//           className="w-full h-[300px] sm:h-[200px] hover:scale-105 transition-transform duration-300 object-cover"
//         />
//         <div className=" p-3 flex flex-col gap-2 w-full ">
//           <h1 className="truncate text-lg font-semibold ">{listing.title}</h1>
//           <div className="flex items-center gap-1">
//             <MdLocationOn className="text-red-600 h-4 w-4" />
//             <p className="text-gray-600 truncate">{listing.address}</p>
//           </div>
//           <p className="text-gray-500 text-sm line-clamp-2">
//             {listing.description}
//           </p>
//           <p className="text-slate-500 font-semibold mt-2">
//             £
//             {listing.offer
//               ? listing.discountedPrice.toLocaleString("en-US")
//               : listing.regularPrice.toLocaleString("en-US")}
//             {listing.type === "rent" && " / month"}
//           </p>
//           <div className="flex gap-4">
//             <div>
//               <p className="text-xs font-bold">
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} Bedrooms`
//                   : "1 Bedroom"}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs font-bold">
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} Bathrooms`
//                   : "1 Bathroom"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ListingItem;

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import PropTypes from "prop-types";
import { getListingImages } from "../utils/listingImages";

const ListingItem = ({ listing }) => {
  const imageUrl = getListingImages(listing)[0];

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px] rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={imageUrl}
          alt={listing.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/house1.avif";
          }}
          className="w-full h-[300px] sm:h-[200px] hover:scale-105 transition-transform duration-300 object-cover"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <h2 className="truncate text-lg font-semibold">{listing.title}</h2>

          <div className="flex items-center gap-1">
            <MdLocationOn className="text-red-600 h-4 w-4" />
            <p className="text-gray-600 truncate">{listing.address}</p>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2">
            {listing.description}
          </p>

          <p className="text-slate-500 font-semibold mt-2">
            £
            {(listing.offer
              ? listing.discountedPrice
              : listing.regularPrice
            )?.toLocaleString("en-GB")}
            {listing.type === "rent" && " / month"}
          </p>

          <div className="flex gap-4">
            <p className="text-xs font-bold">
              {listing.bedrooms}{" "}
              {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
            </p>

            <p className="text-xs font-bold">
              {listing.bathrooms}{" "}
              {listing.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["rent", "sale", "sell"]).isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListingItem;
