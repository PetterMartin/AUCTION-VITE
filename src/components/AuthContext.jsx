import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../libs/api";

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem("jwt");
      const name = window.localStorage.getItem("user_name");

      if (token && name) {
        try {
          const userData = await getProfile(name);
          console.log("Fetched userData:", userData);

          if (userData) {
            setUser(userData);
            setIsLoggedIn(true);
          } else {
            console.error("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures it only runs once after the initial render

  const login = (userData) => {
    window.localStorage.setItem("jwt", userData.accessToken);
    window.localStorage.setItem("user_email", userData.email);
    window.localStorage.setItem("user_name", userData.name);
    window.localStorage.setItem("user_avatar", userData.avatar);
    window.localStorage.setItem("user_credits", userData.credits);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_name");
    window.localStorage.removeItem("user_email");
    localStorage.removeItem("user_credits"); 
    localStorage.removeItem("user_avatar");  
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
