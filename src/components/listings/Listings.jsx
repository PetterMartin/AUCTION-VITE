import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchAllListings } from "../../libs/api";
import { FaChevronDown } from "react-icons/fa";
import NoImage from "../../assets/No-Image.png";
import HeartButton from "../buttons/HeartButton";

function Listings({ searchQuery }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllListings();
        console.log("Fetched data:", data);

        // Filter listings based on searchQuery
        const filteredListings = data.filter(
          (listing) =>
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (listing.description &&
              listing.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );

        setListings(filteredListings.slice(0, 20));
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <hr className="mt-6 border-2 border-neutral-300" />
      <div className="mt-12">
        <div className="flex">
          <div className="flex gap-10 text-5xl text-gray-800 font-semibold">
            <h1 className="text-blue-500">Listings</h1>
            <h1 className="text-gray-400/60">Featured</h1>
          </div>
        </div>
      </div>

      <div className="flex text-lg text-gray-700 font-semibold my-6 gap-4 ">
        <button className="px-4 py-1 border-2 border-neutral-200 rounded-full flex gap-3 hover:border-gray-700 transition duration-200 ease-in-out">
          Product
          <FaChevronDown size={15} className="mt-1.5" />
        </button>
        <button className="px-4 py-1 border-2 border-neutral-200 rounded-full flex gap-3 hover:border-gray-700 transition duration-200 ease-in-out">
          Color
          <FaChevronDown size={15} className="mt-1.5" />
        </button>
        <button className="px-4 py-1 border-2 border-neutral-200 rounded-full flex gap-3 hover:border-gray-700 transition duration-200 ease-in-out">
          A-Z
          <FaChevronDown size={15} className="mt-1.5" />
        </button>
        <button className="px-4 py-1 border-2 border-neutral-200 rounded-full flex gap-3 hover:border-gray-700 transition duration-200 ease-in-out">
          Price
          <FaChevronDown size={15} className="mt-1.5" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {listings.map(({ id, title, description, media, _count, endsAt }) => (
          <Link to={`/listing?id=${id}`} key={id} className="listing-link">
            <div className="listing-item overflow-hidden">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <img
                  src={media[0] ? media[0] : NoImage}
                  alt="Listing Image"
                  className="object-cover w-full h-full hover:scale-110 transition"
                />
                <div className="absolute top-3 right-3 z-10">
                  <HeartButton listingId={id} />{" "}
                  {/* Pass the id as listingId */}
                </div>
                <div className="absolute bottom-3 left-3 font-bold text-white z-10 flex justify-between w-full">
                  <div>{`$${_count.bids}.00`}</div>
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
              <div className="font-semibold text-gray-400">{description}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Listings;
