import { useEffect, useState } from "react";
import { getProfileListings } from "../../libs/api";
import { Link } from "@tanstack/react-router";
import { FaEdit } from "react-icons/fa";
import EditModal from "../modal/EditModal";
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
        console.error("Error fetching user listings:", error);
      }
    };

    fetchUserListings();
  }, [userId]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  return (
    <main className="container mx-auto lg:px-20 mt-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {listings.map(({ id, title, description, media, _count, endsAt }) => (
          <div key={id} className="listing-item">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
              <img
                src={media[0] ? media[0] : NoImage} // Replace with your placeholder image
                alt="Listing Image"
                className="object-cover w-full h-full hover:scale-110 transition"
              />
              <div
                className="flex absolute top-0 left-0 z-10 gap-2 font-semibold bg-white text-blue-500 py-2 px-4 rounded-br-xl hover:rounded-tl-xl hover:bg-gray-100 cursor-pointer"
                onClick={openEditModal}
              >
                Edit <FaEdit size={15} className="mt-0.5" />
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
      />
    </main>
  );
}

export default UsersListings;
