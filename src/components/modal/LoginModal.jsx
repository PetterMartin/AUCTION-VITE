import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../libs/api";
import { AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import RegisterModal from "./RegisterModal";
import { useAuth } from "../AuthContext";

const labels = ["Email", "Password"];

const LoginModal = ({ isModalOpen, setModalOpen }) => {
  const { login } = useAuth();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(null);

  LoginModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
  };

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const handleInputChange = (label, value) => {
    setInputValues((prevState) => ({
      ...prevState,
      [label.toLowerCase()]: value,
    }));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogin = async () => {
    try {
        setLoginStatus("loading");

        const loginData = await loginUser(inputValues.email, inputValues.password);

        // Use loginData.accessToken instead of data.accessToken
        login(loginData);

        // Set the user ID and access token separately
        localStorage.setItem("jwt", loginData.accessToken);
        localStorage.setItem("user_name", loginData.name);


        setLoginStatus("success");
        setModalOpen(false);
        console.log("Login successful:", loginData);
    } catch (error) {
        console.error("Login failed:", error.message);
        setLoginStatus("error");
    }
};

  useEffect(() => {
    if (isModalOpen) {
      setInputValues({
        email: "",
        password: "",
      });
      setLoginStatus(null); // Reset login status on modal open
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
            <RegisterModal
              isModalOpen={isRegisterModalOpen}
              setModalOpen={setRegisterModalOpen}
            />
            {/* CONTENT */}
            <div>
              <div className="h-full lg:h-auo md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
                {/* HEADER */}
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    onClick={closeModal}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">Login</div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                  <div className="text-start">
                    <div className="text-2xl">Welcome back</div>
                    <div className="font-light text-neutral-500 mt-2 mb-6">
                      Login to your account
                    </div>
                    <p>godzilla@stud.noroff.no</p>
                  </div>

                  {labels.map((label, index) => (
                    <div className="w-full relative mb-6" key={index}>
                      <input
                        type={
                          label.toLowerCase() === "email" ? "email" : "text"
                        }
                        value={inputValues[label.toLowerCase()]}
                        onChange={(e) =>
                          handleInputChange(label, e.target.value)
                        }
                        className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer"
                      />
                      <label
                        className="
                  absolute 
                  text-md
                  duration-150 
                  transform 
                  -translate-y-3 
                  top-5 
                  z-10 
                  origin-[0] 
                  left-4
                  peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75
                  peer-focus:-translate-y-4
                "
                      >
                        {label}
                      </label>
                    </div>
                  ))}

                  {loginStatus === "success" ? (
                    // Render success message or redirect
                    <p className="text-emerald-600 ">
                      Login successful! Redirecting...
                    </p>
                  ) : loginStatus === "error" ? (
                    // Render error message and keep the login form visible
                    <>
                      <p className="text-red-500 mb-4">
                        Login failed. Please check your credentials and try
                        again.
                      </p>
                      <button
                        className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                        onClick={handleLogin}
                      >
                        Continue
                      </button>
                    </>
                  ) : (
                    // Render login form
                    <button
                      className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                      onClick={handleLogin}
                    >
                      Continue
                    </button>
                  )}
                </div>
                {/* FOOTER */}
                <div className="flex flex-col gap-4 p-6">
                  <hr />
                  <button className="flex items-center w-full p-3 font-light bg-white border-2 border-gray-800 rounded-md outline-none transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white">
                    <FcGoogle size={24} className="mr-2" />
                    <span className="flex-grow text-center">
                      Sign in with Google
                    </span>
                  </button>
                  <button className="flex items-center w-full p-3 font-light bg-white border-2 border-gray-800 rounded-md outline-none transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white">
                    <AiFillGithub size={24} className="mr-2" />
                    <span className="flex-grow text-center">
                      Sign in with Github
                    </span>
                  </button>

                  <div className="text-neutral-500 text-center mt-2 font-light">
                    <div className="flex flex-row  justify-center items-center gap-2">
                      <p>Don´t have an account?</p>
                      <p
                        className="text-neutral-800 cursor-pointer hover:underline font-semibold"
                        onClick={openRegisterModal}
                      >
                        Create account
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
