import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from '../components/ListingItem'


const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await response.json();
        setOfferListings(data);
        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSellListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await response.json();
        setSellListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await response.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
    fetchSellListings();
    fetchRentListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500 ">Amazing</span>
          <br />
          place with us
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Ebrahim Real estate website is the best Place to find your dream
          house!
          <br />
          We are here for you and we will help you in every way possible.
        </div>
        <Link
          className="text-blue-800 font-bold hover:underline "
          to={"/search"}
        >
          Get Started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
             
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-9">
          {offerListings && offerListings.length > 0 && (
              <div>
                <div className="my-3">
                  <h1 className="text-slate-600 font-bold text-2xl lg:text-4xl">
                    New Offers
                  </h1>
                  <Link className="text-sm text-blue-500 hover:underline" to={'/search?offer=true'}>
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          {sellListings && sellListings.length > 0 && (
              <div>
                <div className="my-3">
                  <h1 className="text-slate-600 font-bold text-2xl lg:text-4xl">
                    New properties for Sell
                  </h1>
                  <Link className="text-sm text-blue-500 hover:underline" to={'/search?type=sell'}>
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {sellListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          {rentListings && rentListings.length > 0 && (
              <div>
                <div className="my-3">
                  <h1 className="text-slate-600 font-bold text-2xl lg:text-4xl">
                    New properties for rent
                  </h1>
                  <Link className="text-sm text-blue-500 hover:underline" to={'/search?type=rent'}>
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
