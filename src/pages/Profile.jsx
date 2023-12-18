import { useEffect, useState } from "react";
import { getProfile, updateProfileImage } from "../libs/api";
import { FaEdit } from "react-icons/fa";
import defaultUser from "../assets/defaultUser.png";
import UsersListings from "../components/listings/UsersListings";
import { useAuth } from "../components/AuthContext";
import Loader from "../components/loader/Loader";

export default function Profile() {
  const { user: authUser } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("name");
  const [user, setUser] = useState(null);
  const [creditInfo, setCreditInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userId && storedToken) {
          try {
            const profileData = await getProfile(userId, storedToken);

            setUser(profileData);
            setCreditInfo({ credits: profileData.credits, currency: "USD" });
            setProfileImageUrl(profileData.avatar || defaultUser);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          } finally {
            setIsProfileLoading(false); // Set loading state to false when done loading
          }
        } else {
          setIsAuthenticated(false);
          setIsProfileLoading(false); // Set loading state to false if conditions are not met
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsProfileLoading(false); // Set loading state to false in case of an error
      }
    };

    fetchUserProfile();
  }, [userId, isAuthenticated]);

  const handleChangeImage = () => {
    setShowImageModal(true);
  };

  const handleImageUrlChange = (e) => {
    setNewImageUrl(e.target.value);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  const handleImageSubmit = async () => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      await updateProfileImage(
        userId,
        newImageUrl,
        localStorage.getItem("jwt")
      );
      setProfileImageUrl(newImageUrl);
      setShowImageModal(false);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  if (isProfileLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-8 p-4">
        {/* Profile Image */}
        <div className="flex flex-col">
          <div className="mx-auto flex items-center justify-center relative">
            <div className="h-40 w-40 relative ">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="absolute inset-1.5 rounded-full bg-white overflow-hidden p-2">
                <img
                  src={profileImageUrl || defaultUser}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
            {userId &&
              isAuthenticated &&
              authUser &&
              userId === authUser.name && (
                <button
                  onClick={handleChangeImage}
                  className="absolute bottom-[-15px] p-2.5 rounded-full z-10 border-4 border-white bg-gradient-to-r from-blue-600 to-blue-500  text-white transform transition-transform hover:scale-110"
                >
                  <FaEdit size={15} />
                </button>
              )}
          </div>
        </div>

        {/* User Information */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{user && user.name}</h1>
          <p className="text-gray-600">Email: {user && user.email}</p>
          <p className="text-gray-600">
            Listings: {user && user._count.listings}
          </p>
          <h2 className="text-2xl font-semibold mt-4 text-emerald-400">
            $ {user && user.credits}
          </h2>
        </div>
      </div>
      <div className="border-b-2 border-blue-400 w-full mt-2 mb-8"></div>

      {/* Image Change Modal */}
      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-lg font-semibold"
            >
              New Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              value={newImageUrl}
              onChange={handleImageUrlChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleImageSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Include the UsersListings component here */}
      <UsersListings userId={userId} />
    </div>
  );
}
