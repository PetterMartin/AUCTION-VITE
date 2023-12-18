import { Toaster, toast } from "sonner";
import { useAuth } from "../AuthContext";
import PropTypes from "prop-types";
import { BiLogOutCircle } from "react-icons/bi";

export default function LogoutButton({ setUser }) {
  const { logout } = useAuth();

  LogoutButton.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  const handleLogout = async () => {
    logout();

    setUser(null);

    toast.success("You have successfully Logged out", {
      duration: 5000, 
    });
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex gap-4 w-full logout-button hover:bg-gray-100/50 p-3 whitespace-nowrap text-rose-500"
      >
        <div>Logout</div>
        <BiLogOutCircle className="text-xl me-8" />
      </button>
    </>
  );
}
