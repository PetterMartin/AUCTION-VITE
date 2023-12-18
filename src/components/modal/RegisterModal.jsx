import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import PropTypes from "prop-types";
import { registerUser } from "../../libs/api";
import { AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import LoginModal from "./LoginModal";

const labels = ["Username", "Email", "Password"];

const RegisterModal = ({ isModalOpen, setModalOpen }) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  RegisterModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
  };

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setModalOpen(false);
    setLoginModalOpen(true);
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

  const handleRegistration = async () => {
    try {
      if (inputValues.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (inputValues.username.length < 8) {
        throw new Error("Username must be at least 8 characters long");
      }

      const registrationData = await registerUser({
        email: inputValues.email,
        password: inputValues.password,
        username: inputValues.username,
      });

      console.log("Registration successful:", registrationData);
      setRegistrationStatus("success");

      toast.success("Registration successful! You may now Login", {
        duration: 5000, 
      });

      closeModal(); 
    } catch (error) {
      console.error("Registration failed:", error.message);
      setRegistrationStatus("error");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setInputValues({
        username: "",
        email: "",
        password: "",
      });
      setRegistrationStatus(null); 
    }
  }, [isModalOpen]);

  return (
    <>
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setModalOpen={setLoginModalOpen}
      />
      {isModalOpen && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
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
                  <div className="text-lg font-semibold">Register</div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                  <div className="text-start">
                    <div className="text-2xl">Welcome to Finn</div>
                    <div className="font-light text-neutral-500 mt-2 mb-6">
                      Create an account
                    </div>
                  </div>

                  {labels.map((label, index) => (
                    <div className="w-full relative mb-6" key={index}>
                      <input
                        type={
                          label.toLowerCase() === "email"
                            ? "email"
                            : label.toLowerCase() === "password"
                            ? "password"
                            : "text"
                        }
                        value={inputValues[label.toLowerCase()]}
                        onChange={(e) =>
                          handleInputChange(label, e.target.value)
                        }
                        onFocus={() => setIsFocused(label.toLowerCase())}
                        onBlur={() => setIsFocused(null)}
                        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer 
                        ${label.toLowerCase() === "email" ? "" : ""}`}
                        placeholder={
                          label.toLowerCase() === "email" &&
                          (isFocused === "email" || inputValues.email !== "")
                            ? "Please provide your '@stud.noroff.no' email"
                            : label.toLowerCase() === "password" &&
                              (isFocused === "password" ||
                                inputValues.password !== "")
                            ? "Password must be at least 8 characters long"
                            : label.toLowerCase() === "username" &&
                              (isFocused === "username" ||
                                inputValues.username !== "")
                            ? "Username must be at least 8 characters long"
                            : ""
                        }
                      />

                      <label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                        {label}
                      </label>

                      {label.toLowerCase() === "password" &&
                        inputValues.password.length < 8 &&
                        registrationStatus === "error" && (
                          <p className="text-red-500 mt-2">
                            Password must be at least 8 characters long.
                          </p>
                        )}

                      {label.toLowerCase() === "username" &&
                        inputValues.username.length < 8 &&
                        registrationStatus === "error" && (
                          <p className="text-red-500 mt-2">
                            Username must be at least 8 characters long.
                          </p>
                        )}
                    </div>
                  ))}

                  {registrationStatus === "success" && (
                    <p>Registration successful! Redirecting...</p>
                  )}

                  {registrationStatus === "error" && (
                    <p>Registration failed. Please try again.</p>
                  )}


                  <button
                    className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                    onClick={handleRegistration}
                  >
                    Continue
                  </button>
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
                      <p>Already have an account?</p>
                      <p
                        className="text-neutral-800 cursor-pointer hover:underline font-semibold"
                        onClick={openLoginModal}
                      >
                        Log in
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

export default RegisterModal;
