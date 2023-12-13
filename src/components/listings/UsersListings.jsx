import { useEffect, useState } from "react";
import { getProfileListings } from "../../libs/api";
import { Link } from "@tanstack/react-router";
import { FaEdit } from "react-icons/fa";
import EditModal from "../modal/EditModal";
import NoImage from "../../assets/No-Image.png";
import { useAuth } from "../AuthContext";

function UsersListings() {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("name");
  const [listings, setListings] = useState([]);
  const [currentListing, setCurrentListing] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        if (userId && user) {
          const data = await getProfileListings(userId);
          setListings(data || []);
        } else {
          // Handle the case where the user is not logged in
          console.warn("User is not logged in.");
          // You might want to redirect to the login page or handle it in some way
        }
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    };

    fetchUserListings();
  }, [userId, user]);

  console.log("User:", user);
  console.log("UserId:", userId);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = (listing) => {
    setCurrentListing(listing);
    setEditModalOpen(true);
  };

  const sortBidsByCreationTime = (bids) => {
    return bids
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created));
  };

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {listings.map(({ id, title, description, media, bids, endsAt }) => (
          <div key={id} className="listing-item">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
              <img
                src={media[0] ? media[0] : NoImage} // Replace with your placeholder image
                alt="Listing Image"
                className="object-cover w-full h-full hover:scale-110 transition"
              />
              {userId && (
                <div className="flex absolute top-0 left-4 z-10 gap-2 font-semibold bg-white text-blue-500 py-2 px-4 rounded-b-xl hover:bg-gray-100 cursor-pointer">
                  {userId && user && userId === user.name && (
                    <div
                      onClick={() =>
                        openEditModal({
                          id,
                          title,
                          description,
                          media,
                          bids,
                          endsAt,
                        })
                      }
                    >
                      Edit <FaEdit size={15} className="mt-0.5" />
                    </div>
                  )}
                </div>
              )}

              <div className="absolute bottom-3 left-3 font-bold text-white z-10 flex justify-between w-full">
                <div>{`$${
                  bids?.length > 0 ? sortBidsByCreationTime(bids)[0].amount : 0
                }.00`}</div>
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
              <Link to={`/listing?id=${id}`} key={id} className="listing-link">
                {title}
              </Link>
            </div>
            <div className="font-semibold text-gray-400">{description}</div>
          </div>
        ))}
      </div>
      <EditModal
        isModalOpen={isEditModalOpen}
        setModalOpen={setEditModalOpen}
        currentListing={currentListing}
        setListings={setListings}
        title={currentListing?.title}
        description={currentListing?.description}
        media={currentListing?.media}
      />
    </main>
  );
}

export default UsersListings;
