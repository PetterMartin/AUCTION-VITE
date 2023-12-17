import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { motion, useAnimation } from "framer-motion";
import vr from "../../assets/Vr.png";
import headset from "../../assets/Headset.png";
import speaker from "../../assets/Speaker.png";
import chair from "../../assets/Chair.png";
import RegisterModal from "../modal/RegisterModal";

export default function Banners() {
  const { isLoggedIn } = useAuth();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const bannerControls = useAnimation();

  useEffect(() => {
    const animateBanner = async () => {
      await bannerControls.start({ opacity: 1, y: 0 });
      setAnimationComplete(true);
    };

    animateBanner();

    return () => bannerControls.stop(); // Cleanup on component unmount
  }, [bannerControls]);

  const headingAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const imgAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.2 } },
  };

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 max-w-screen-xl hidden md:block">
        {!isLoggedIn && (
          <div className="relative w-full bg-gradient-to-b from-emerald-500 to-emerald-400 py-8 px-24 rounded-2xl">
            <div className="flex justify-between items-center text-white text-2xl">
              <div>
                <motion.div
                  className="text-8xl font-bold my-2"
                  variants={headingAnimation}
                  initial="hidden"
                  animate={animationComplete ? "visible" : "hidden"}
                >
                  <p className="text-lg font-light">Limited-Time Offer</p>
                  <h1>SIGN UP</h1>
                  <h1>TODAY!</h1>
                  <p className="text-lg font-light">28 Nov To 31 Dec</p>
                </motion.div>
              </div>
              <div>
                <motion.div
                  className="text-8xl font-bold my-2"
                  variants={headingAnimation}
                  initial="hidden"
                  animate={animationComplete ? "visible" : "hidden"}
                >
                  <p className="text-lg font-light">Electronics</p>
                  <h2 className="text-4xl font-semibold my-4">Welcome Gift</h2>
                  <p className="text-lg font-light">
                    To welcome new users, we are offering a gift of <br />
                    1000 credits for their first purchases for FREE
                  </p>
                  <button
                    className="bg-white rounded-full px-6 py-2 text-emerald-500 text-lg hover:bg-gray-100"
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    Sign Up
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn && (
          <div className="relative w-full bg-gradient-to-b from-emerald-500 to-emerald-400 py-8 px-24 rounded-2xl">
            <div className="flex justify-between items-center text-white text-2xl">
              <div>
                <motion.div
                  className="text-8xl font-bold my-2"
                  variants={headingAnimation}
                  initial="hidden"
                  animate={animationComplete ? "visible" : "hidden"}
                >
                  <p className="text-lg font-light">20% Off</p>
                  <h1>WINTER</h1>
                  <h1>SALE!</h1>
                  <p className="text-lg font-light">28 Nov To 31 Dec</p>
                </motion.div>
              </div>
              <div className="me-12">
                <motion.div
                  className="text-8xl font-bold my-2"
                  variants={headingAnimation}
                  initial="hidden"
                  animate={animationComplete ? "visible" : "hidden"}
                >
                  <p className="text-lg font-light">Beats Pro max</p>
                  <h2 className="text-4xl font-semibold my-2">Devices</h2>
                  <h1 className="text-6xl font-bold text-emerald-200">
                    OCULUS
                  </h1>
                  <button className="bg-white rounded-full px-6 py-2 text-emerald-500 text-lg hover:bg-gray-100">
                    Browse
                  </button>
                </motion.div>
              </div>
              <motion.img
                src={vr}
                alt="VR-Image"
                style={{ width: "auto", height: "350px" }}
                className="absolute right-[400px] bottom-0 z-10"
                variants={imgAnimation}
                initial="hidden"
                animate={animationComplete ? "visible" : "hidden"}
              />
            </div>
          </div>
        )}

        <RegisterModal
          isModalOpen={isRegisterModalOpen}
          setModalOpen={setRegisterModalOpen}
        />

        <div className="flex justify-center p-8 gap-8 text-white">
          <div className="flex gap-8">
            <div className="bg-gradient-to-b from-amber-400 to-amber-300 p-8 rounded-2xl">
              <div>
                <p className="text-lg font-light">New</p>
                <p className="text-2xl font-semibold my-2">Furniture</p>
                <h1 className="text-5xl font-bold text-amber-200">IKEA</h1>
                <button className="bg-white rounded-full px-6 py-2 mt-4 text-amber-500 text-lg hover:bg-gray-100">
                  Browse
                </button>
              </div>
              <img
                src={chair}
                alt="Chair Image"
                style={{ width: "180px", height: "auto" }}
                className="ms-6"
              />
            </div>
            <div className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-3xl p-8">
              <div>
                <p className="text-lg font-light">New</p>
                <p className="text-2xl font-semibold my-2">Electronics</p>
                <h1 className="text-5xl font-bold text-blue-400">SPEAKER</h1>
                <button className="bg-white rounded-full px-6 py-2 mt-4 text-blue-500 text-lg hover:bg-gray-100">
                  Browse
                </button>
              </div>
              <img
                src={speaker}
                alt="Speaker Image"
                style={{ width: "180px" }}
                className="ms-6"
              />
            </div>
          </div>
          <div className="bg-gradient-to-b from-rose-600 to-rose-500 p-8 rounded-3xl flex gap-2">
            <div className="mt-36">
              <p className="text-lg font-light">Trending</p>
              <p className="text-3xl font-semibold my-2">Devices</p>
              <h1 className="text-5xl font-bold text-rose-400">HEADSET</h1>
              <button className="bg-white rounded-full px-6 py-2 mt-4 text-rose-500 text-lg hover:bg-gray-100">
                Browse
              </button>
            </div>
            <img
              src={headset}
              alt="Headset Image"
              style={{ width: "auto", height: "300px" }}
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
