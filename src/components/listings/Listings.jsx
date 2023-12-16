import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchAllListings } from "../../libs/api";
import { FaRegClock } from "react-icons/fa6";
import { Toaster, toast } from 'sonner'
import { useAuth } from "../AuthContext";
import NoImage from "../../assets/No-Image.png";
import HeartButton from "../buttons/HeartButton";

function Listings({ searchQuery }) {
  const { isLoggedIn } = useAuth();
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

    const updateCountdowns = () => {
      setListings((prevListings) =>
        prevListings.map((listing) => {
          const countdown = calculateCountdown(listing.endsAt);
          return {
            ...listing,
            formattedCountdown: formatCountdown(countdown),
          };
        })
      );
    };

    fetchData();

    const intervalId = setInterval(updateCountdowns, 1000);

    return () => clearInterval(intervalId);
  }, [searchQuery]);

  const calculateCountdown = (endTime) => {
    const now = new Date().getTime();

    // Check if endTime is defined
    if (endTime) {
      const endsAtTime = new Date(endTime).getTime();
      const timeDifference = endsAtTime - now;

      if (timeDifference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      }
    } else {
      // Handle the case where endTime is not defined
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  const formatCountdown = (countdown) => {
    const padWithZero = (number) => String(number).padStart(2, "0");

    return `${padWithZero(countdown.days)}:${padWithZero(
      countdown.hours
    )}:${padWithZero(countdown.minutes)}:${padWithZero(countdown.seconds)}`;
  };

  const sortBidsByCreationTime = (bids) => {
    return bids
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created));
  };

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <hr className="my-8 border border-blue-500" />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {listings.map(({ id, title, description, media, endsAt, bids }) => {
          const countdown = calculateCountdown(endsAt);
          const formattedCountdown = formatCountdown(countdown);

          return (
            <>
            <div key={id} data-cy="listing" className="relative">
              <div className="absolute top-8 right-8 z-10">
                <HeartButton />
              </div>
              {isLoggedIn ? (
                <Link
                  to={`/listing?id=${id}`}
                  key={id}
                  className="listing-link"
                  data-cy="listing"
                >
                  <div className="listing-item overflow-hidden border p-4 rounded-3xl shadow-xl">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
                      <img
                        src={media[0] ? media[0] : NoImage}
                        alt="Listing Image"
                        className="object-cover w-full h-full hover:scale-110 transition"
                      />
                      <div
                        className={`flex gap-3 absolute top-3 left-3 bg-white py-2 px-4 rounded-full text-sm font-semibold border-2 ${
                          (countdown.days === 0 && countdown.hours <= 1) ||
                          (countdown.days === 0 &&
                            countdown.hours === 0 &&
                            countdown.minutes === 0 &&
                            countdown.seconds === 0)
                            ? "text-rose-400"
                            : "text-blue-400"
                        }`}
                      >
                        <FaRegClock size={18} className="mt-0.5" />
                        {countdown.days === 0 &&
                        countdown.hours === 0 &&
                        countdown.minutes === 0 &&
                        countdown.seconds === 0 ? (
                          <span>Auction Finished</span>
                        ) : (
                          <span>{formattedCountdown}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 gap-2 px-4">
                      <div
                        data-cy="listing-title"
                        className="font-semibold text-xl text-gray-700"
                      >
                        {title}
                      </div>
                      <div className=" text-xl font-semibold text-blue-500">{`$ ${
                        bids.length > 0
                          ? sortBidsByCreationTime(bids)[0].amount
                          : 0
                      }`}</div>
                      <div
                        data-cy="listing-description"
                        className="hidden text-gray-500 text-sm mt-2"
                      >
                        {description}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className="listing-link cursor-pointer"
                  onClick={() => toast.error('Must be logged in to view listings')}
                >

                  <div className="listing-item overflow-hidden border p-4 rounded-3xl shadow-xl">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
                      <img
                        src={media[0] ? media[0] : NoImage}
                        alt="Listing Image"
                        className="object-cover w-full h-full hover:scale-110 transition"
                      />
                      <div
                        className={`flex gap-3 absolute top-3 left-3 bg-white py-2 px-4 rounded-full text-sm font-semibold border-2 ${
                          (countdown.days === 0 && countdown.hours <= 1) ||
                          (countdown.days === 0 &&
                            countdown.hours === 0 &&
                            countdown.minutes === 0 &&
                            countdown.seconds === 0)
                            ? "text-rose-400"
                            : "text-blue-400"
                        }`}
                      >
                        <FaRegClock size={18} className="mt-0.5" />
                        {countdown.days === 0 &&
                        countdown.hours === 0 &&
                        countdown.minutes === 0 &&
                        countdown.seconds === 0 ? (
                          <span>Auction Finished</span>
                        ) : (
                          <span>{formattedCountdown}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 gap-2 px-4">
                      <div
                        data-cy="listing-title"
                        className="font-semibold text-xl text-gray-700"
                      >
                        {title}
                      </div>
                      <div className=" text-xl font-semibold text-blue-500">{`$ ${
                        bids.length > 0
                          ? sortBidsByCreationTime(bids)[0].amount
                          : 0
                      }`}</div>
                      <div
                        data-cy="listing-description"
                        className="hidden text-gray-500 text-sm mt-2"
                      >
                        {description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </>
          );
        })}
      </div>
    </main>
  );
}

export default Listings;
