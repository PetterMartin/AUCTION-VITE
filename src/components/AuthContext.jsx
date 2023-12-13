import { createContext, useContext, useState, useEffect } from "react";
import logoutFunction from "../libs/api"
import getProfile from "../libs/api"

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    const token = window.localStorage.getItem("jwt");
    const name = window.localStorage.getItem("user_name");

    if (token && name) {
      try {
        const userData = await getProfile(name);
        if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
          console.log("userData", userData);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Call fetchUserData directly when AuthProvider is rendered
  useEffect(() => {
    fetchUserData();
  }, []);
    

  const login = (userData) => {
    window.localStorage.setItem("jwt", userData.accessToken);
    window.localStorage.setItem("user_email", userData.email);
    window.localStorage.setItem("user_name", userData.name);
    window.localStorage.setItem("user_avatar", userData.avatar);
    window.localStorage.setItem("user_credits", userData.credits);
    setUser(userData);
    setIsLoggedIn(true)
  };

  const logout = () => {
    logoutFunction();
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};