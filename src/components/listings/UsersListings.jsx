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
        {listings.map(({ id, title, description, media, endsAt, bids }) => (
          <div key={id} className="relative">
            {userId && user && userId === user.name && (
              <div className="flex absolute top-7 left-8 z-10 gap-2 bg-white text-gray-800 py-2 px-4 rounded-full text-sm font-semibold border-2 hover:bg-gray-100 cursor-pointer">
                <div
                  className="flex items-center"
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
                  Edit <FaEdit size={15} className="mt-0.5 ml-2" />
                </div>
              </div>
            )}
            <Link to={`/listing?id=${id}`} key={id} className="listing-link">
              <div className="listing-item overflow-hidden border p-4 rounded-3xl shadow-xl">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <img
                    src={media[0] ? media[0] : NoImage}
                    alt="Listing Image"
                    className="object-cover w-full h-full hover:scale-110 transition"
                  />
                </div>
                <div className="flex flex-col gap-2 px-2">
                  <div className="font-semibold text-xl text-gray-700 mt-3">
                    {title}
                  </div>
                  <div className="flex font-semibold justify-between">
                    <div className="text-lg text-neutral-500">Price</div>
                    <div className="text-xl text-blue-400">{`$ ${
                      bids.length > 0
                        ? sortBidsByCreationTime(bids)[0].amount
                        : 0
                    }`}</div>
                  </div>
                </div>
              </div>
            </Link>
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
