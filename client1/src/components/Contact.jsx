import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
     
    }, [listing.userRef]);

    const handleChange = (e) => {
        
    }
    
  return (
  <div className="flex flex-col gap-2 ">
    {landlord && (
      <div className="">
        <p>
          Contact <span className="font-semibold">{landlord.username}</span>{" "}
          for{" "}
          <span className="font-semibold">
            {listing.title.toLowerCase()}
          </span>{" "}
        </p>
        <textarea
          name="message"
          id="message"
          rows="2"
          defaultValue={message} // Use defaultValue instead of value
                      onChange={handleChange}
          className="w-full mb-6 px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          placeholder="Type your message here..."
        >
        
                  </textarea>
                  <Link
                      to={`mailto:
                      ${landlord.email}? 
                      subject=${listing.title}
                      &body=${message}
                      `} className="bg-gray-600  text-white text-center p-3 uppercase rounded-lg hover:opacity-80">
                      Send Message
                  </Link>
      </div>
    )}
  </div>
  );
}


export default Contact
