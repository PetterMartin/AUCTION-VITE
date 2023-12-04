import { useEffect, useState } from "react";
import { getProfileListings } from "../../libs/api";
import { Link } from "@tanstack/react-router";
import NoImage from "../../assets/No-Image.png";

function UsersListings() {
  const userId = localStorage.getItem("user_name");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        if (userId) {
          const data = await getProfileListings(userId);
          setListings(data || []); // Set an empty array if data is falsy
        }
      } catch (error) {
        console.error('Error fetching user listings:', error);
      }
    };

    fetchUserListings();
  }, [userId]);

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {listings.map(({ id, title, description, media, _count, endsAt }) => (
        <Link to={`/listing?id=${id}`} key={id} className="listing-link">
          <div key={id} className="listing-item">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
              <img
                src={media[0] ? media[0] : NoImage} // Replace with your placeholder image
                alt="Listing Image"
                className="object-cover w-full h-full hover:scale-110 transition"
              />
              <div className="absolute top-3 right-3 z-10">
                {/* Add your custom component or logic here */}
              </div>
              <div className="absolute bottom-3 left-3 font-bold text-white z-10 flex justify-between w-full">
                <div>
                  {`$${_count.bids}.00`}
                </div>
                <div className="me-6">
                  Ends at: {endsAt && endsAt.substring(0, 10)}
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(0, 0, 0, 0.05) 90%, rgba(0, 0, 0, 0.7))",
                  position: "absolute",
                  zIndex: 1,
                }}
              ></div>
            </div>
            <div className="font-semibold text-lg text-gray-800 mt-1">
              {title}
            </div>
            <div className="font-semibold text-gray-400">
              {description}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default UsersListings;