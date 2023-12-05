import { useEffect, useState } from "react";
import { fetchListingById, fetchProfileByName, submitBid } from "../libs/api";
import { Toaster, toast } from "sonner";
import { RiShieldCheckFill } from "react-icons/ri";
import HeartButton from "../components/buttons/HeartButton";
import Map from "../components/buttons/Map";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [profile, setProfile] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [formattedCreatedDate, setFormattedCreatedDate] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  const handleImageClick = (index) => {
    const temp = listing.media[0];
    listing.media[0] = listing.media[index];
    listing.media[index] = temp;
    setSelectedImage(index);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    let intervalId; // Declare intervalId outside the fetchListingData function

    const fetchListingData = async () => {
      try {
        const listingData = await fetchListingById(id);
        setListing(listingData);

        // Fetch profile data when listing data is available
        const profileData = await fetchProfileByName(listingData.seller.name);
        setProfile(profileData);

        // Convert created date to a formatted string
        const createdDate = new Date(listingData.created);
        const formattedDate = createdDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setFormattedCreatedDate(formattedDate);

        // Calculate the initial countdown
        calculateCountdown(listingData.endsAt);

        // Update the countdown every second
        intervalId = setInterval(() => {
          calculateCountdown(listingData.endsAt);
        }, 1000);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    const calculateCountdown = (endTime) => {
      const now = new Date().getTime();
      const endsAtTime = new Date(endTime).getTime();
      const timeDifference = endsAtTime - now;

      if (timeDifference <= 0) {
        // Listing has ended, clear the interval
        clearInterval(intervalId);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    fetchListingData();

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleBidSubmit = async () => {
    try {
      // Check if the bid amount is a valid number
      const parsedBidAmount = parseFloat(bidAmount);
      if (isNaN(parsedBidAmount) || parsedBidAmount <= 0) {
        console.error("Invalid bid amount. Please enter a valid number.");
        return;
      }

      const currentBidAmount = listing._count.bids;

      if (parsedBidAmount <= currentBidAmount) {
        console.error("Your bid must be higher than the current bid.");
        return;
      }

      const bidResponse = await submitBid(listing.id, parsedBidAmount);

      if (bidResponse.ok) {
        console.log("Bid submitted successfully:", bidResponse.data);

        // Fetch the updated listing information after a successful bid
        const updatedListingData = await fetchListingById(listing.id);
        setListing(updatedListingData);

        toast.success(`You successfully bid $${parsedBidAmount}`, {
          duration: 5000,
        });
      } else {
        console.error("Error submitting bid:", bidResponse.error);
      }

      // Clear the bid amount after submission
      setBidAmount("");
    } catch (error) {
      console.error("Error submitting bid:", error);
    } finally {
      // Hide loading state after bid submission completes
      // Example: setSubmitting(false);
    }
  };

  if (!listing || !profile || !countdown || !formattedCreatedDate) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto pb-12">
        <div className="flex flex-col">
          <h1 className="capitalize font-semibold text-3xl mt-8">
            {listing.title}
          </h1>
          <div className="font-light text-sm text-neutral-500">
            published on {formattedCreatedDate}
          </div>

          <div className="flex gap-4">
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative mt-5 border-4">
              <img
                src={listing.media[0]}
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="absolute top-5 right-5">
                <HeartButton />
              </div>
            </div>
            {listing.media.length > 1 && (
        <div className="md:w-1/4 flex flex-col gap-4 mt-8">
          {listing.media.slice(1, 5).map((imageSrc, index) => (
            <div
              key={index}
              className="w-full h-28 border-4 border-gray-300 rounded-xl transition duration-200 ease-in-out transform hover:border-blue-400"
              onClick={() => handleImageClick(index + 1)}
            >
              <img
                src={imageSrc}
                alt=""
                className="object-cover w-full h-full rounded-md cursor-pointer"
              />
            </div>
          ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-8 md:gap-10 mt-6">
          {/* Left Side */}
          <div className="col-span-4 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-xl font-semibold flex flex-row items-center gap-3">
                <img
                  src={profile.avatar}
                  alt={`${profile.name}'s Avatar`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                  }}
                />
                <div className="flex flex-col text-blue-500">
                  <div>{profile.name}</div>
                  <div className="flex flex-row gap-1">
                    <RiShieldCheckFill size={20} />
                    <div className="text-sm font-light">
                      Verified with BankId
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-500 overflow-hidden">
              <span className="font-bold text-neutral-600">Description:</span>{" "}
              {listing.description}
            </div>
            <hr />
            <Map />
          </div>
          <div className="col-span-4 flex flex-col gap-5">
            <div className=" bg-white rounded-xl border-2 border-blue-500 overflow-hidden p-4">
              <div className="flex flex-row items-center gap-6 mb-2">
                <div className="text-2xl font-semibold">
                  ${" "}
                  {listing._count.bids > 0
                    ? listing.bids.reduce(
                        (total, bid) =>
                          total > bid.amount ? total : bid.amount,
                        0
                      )
                    : 0}
                </div>
                <div className="font-light text-neutral-600">current bid</div>
              </div>
              {/* Display the countdown or "Auction has ended" */}
              {countdown.days === 0 &&
              countdown.hours === 0 &&
              countdown.minutes === 0 &&
              countdown.seconds === 0 ? (
                <div className="text-md font-light text-red-500">
                  Auction has ended
                </div>
              ) : (
                <div className="text-md font-light text-blue-500">
                  Ends in:{" "}
                  <span className="font-bold text-lg">
                    {countdown.days} days {countdown.hours} hours{" "}
                    {countdown.minutes} minutes {countdown.seconds} seconds
                  </span>
                  ,{" "}
                </div>
              )}
            </div>

            {/* Bid Form */}
            <div className="flex flex-col gap-4 mt-4">
              <label className="text-neutral-600">Place your bid:</label>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="text"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="border-2 rounded-md px-5 py-3 text-sm hover:border-blue-400 cursor-pointer"
                />
                <button
                  onClick={handleBidSubmit}
                  className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-5 py-3 font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
