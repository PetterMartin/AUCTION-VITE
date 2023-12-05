import { Toaster, toast } from "sonner";
import { logoutUser } from "../../libs/api";
import { useAuth } from "../AuthContext";
import PropTypes from "prop-types";
import { BiLogOutCircle } from "react-icons/bi";

export default function LogoutButton({ setUser }) {
  const { logout } = useAuth();

  LogoutButton.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  const handleLogout = async () => {
    // Call the logout function from the authentication context
    logout();

    // Reset the user state to null to ensure it reflects immediately in the UI
    setUser(null);

    toast("You have successfully Logged out", {
      duration: 5000, // Optional, how long the toast should be displayed
    });

    // Call your logoutUser function from the api.js
    logoutUser();
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex gap-4 w-full logout-button hover:bg-gray-100/50 p-3 whitespace-nowrap text-red-500"
      >
        <div>Logout</div>
        <BiLogOutCircle className="text-xl me-8" />
      </button>
    </>
  );
}
