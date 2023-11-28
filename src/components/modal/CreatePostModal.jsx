import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { FaTshirt, FaWineGlass, FaMobileAlt, FaLaptop } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { PiHouseBold } from "react-icons/pi";
import CountrySelect from "../buttons/CountrySelect";
import Map from "../buttons/Map";

const categories = [
  "Electronics",
  "Fashion",
  "Phone",
  "Wine",
  "Housing",
  "Furniture",
];

const categoryIcons = {
  Electronics: <FaLaptop className="text-3xl" size={26} />,
  Fashion: <FaTshirt className="text-3xl" size={26} />,
  Phone: <FaMobileAlt className="text-3xl" size={26} />,
  Wine: <FaWineGlass className="text-3xl" size={26} />,
  Housing: <PiHouseBold className="text-3xl" size={26} />,
  Furniture: <GiSofa className="text-3xl" size={26} />,
};

let lastRequestTime = 0;

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  IMAGES: 2,
  DESCRIPTION: 3,
  PRICE: 4,
};

const currentStep = STEPS.CATEGORY;

export default function CreatePostModal({ isModalOpen, setModalOpen }) {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const closeModal = () => {
    setModalOpen(false);
  };

  CreatePostModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
  };

  const access_key = localStorage.getItem("jwt");

  async function handleOnSubmit(event) {
    const currentTime = Date.now();

    if (currentTime - lastRequestTime < 10000) {
      console.log("Wait 10 seconds between requests.");
      return;
    }

    lastRequestTime = currentTime;

    event.preventDefault();

    const form = event.target;
    const { title, body, imageUrl } = form.elements;

    const accessKey = {
      headers: {
        Authorization: `Bearer ${access_key}`,
      },
    };

    const newListing = {
      title: title.value,
      description: body.value,
      media: [imageUrl.value],
      endsAt: form.elements.endsAt.value,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/auction/listings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...accessKey.headers,
          },
          body: JSON.stringify(newListing),
        }
      );

      if (response.ok) {
        console.log("Listing successful!");
        closeModal();
      } else {
        throw new Error("Failed to create listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  }

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const moveToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  let bodyContent = (
    <>
      <div className="relative p-6 flex-auto">
        <div className="text-start">
          <div className="text-2xl font-semibold">
            Which of these best describe your product?
          </div>
          <div className="font-light text-neutral-500 mt-2 mb-6">
            Pick a category
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-xl border-2 p-2 flex flex-col items-start text-gray-500 hover:text-blue-400 hover:border-blue-400 focus:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-center ms-5">
                {categoryIcons[category]}
              </div>
              <div className="px-5 rounded-full mt-2">
                <p>{category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <button
          type="button"
          onClick={moveToNextStep}
          className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
        >
          Next
        </button>
      </div>
    </>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <div className="relative p-6 flex-auto">
            <div className="text-start">
              <div className="text-2xl font-semibold">
                Where are you located?
              </div>
              <div className="font-light text-neutral-500 mt-2 mb-6">
                Help the bøver know where to find you
              </div>
            </div>
            <CountrySelect value={selectedCountry} onChange={handleChange} />
            <Map />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <button
            type="button"
            onClick={moveToNextStep}
            className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
          >
            Next
          </button>
        </div>
      </>
    );
  }

  useEffect(() => {
    // Reset step to 0 when modal is closed
    if (!isModalOpen) {
      setStep(STEPS.CATEGORY);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <form
          onSubmit={handleOnSubmit}
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
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
                  <div className="text-lg font-semibold">Create a listing</div>
                </div>
                {/* BODY */}
                {bodyContent}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
