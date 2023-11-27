import { useEffect, useState } from "react";
import { fetchAllListings } from "../../libs/api";
import user from "../../assets/user.png";
import HeartButton from "../buttons/HeartButton";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllListings();
        // Sort the listings based on the created property in descending order
        const sortedListings = data.sort((a, b) => new Date(b.created) - new Date(a.created));
        setListings(sortedListings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {listings.slice(0, 10).map(({ id, title, media, _count, endsAt }) => (
          <div key={id} className="listing-item">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
              <img
                src={media[0] ? media[0] : user}
                alt="Listing Image"
                className="object-cover w-full h-full hover:scale-110 transition"
              />
              <div className="absolute top-3 right-3 z-10">
                <HeartButton listingId={id} /> {/* Pass the id as listingId */}
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
          </div>
        ))}
      </div>
    </main>
  );
}

export default Listings;
