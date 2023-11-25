import { logoutUser } from "../../libs/api";
import { useAuth } from "../AuthContext";

const LogoutButton = ({ setUser }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    // Call the logout function from the authentication context
    logout();

    // Reset the user state to null to ensure it reflects immediately in the UI
    setUser(null);

    // Call your logoutUser function from the api.js
    logoutUser();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};


export default LogoutButton;