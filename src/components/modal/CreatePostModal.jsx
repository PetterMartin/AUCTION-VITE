import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Toaster, toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";
import { FaTshirt, FaWineGlass, FaMobileAlt, FaLaptop } from "react-icons/fa";
import { TiCamera } from "react-icons/ti";
import { GiSofa } from "react-icons/gi";
import { PiHouseBold } from "react-icons/pi";
import { IoAddCircle } from "react-icons/io5";
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
  TIME: 4,
};

export default function CreatePostModal({ isModalOpen, setModalOpen }) {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userTags, setUserTags] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    let formTitle, description, endsAt;

    switch (step) {
      case STEPS.CATEGORY:
      case STEPS.LOCATION:
        break;

      case STEPS.IMAGES:
        break;

      case STEPS.DESCRIPTION:
        break;

      case STEPS.TIME:
        formTitle = form.elements.title.value;
        endsAt = form.elements.endsAt.value;
        description = form.elements.body.value;
        break;

      default:
        break;
    }

    const accessKey = {
      headers: {
        Authorization: `Bearer ${access_key}`,
      },
    };

    const newListing = {
      title: formTitle || "",
      description: description || "",
      tags: userTags.split(",").map((tag) => tag.trim()),
      media: imageUrls,
      endsAt: endsAt || "",
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

        toast.success(`Listing Created`, {
          duration: 5000,
        });
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

  const handleCategoryClick = (clickedCategory) => {
    // You can customize how you want to append the category to existing userTags
    setUserTags(
      (prevUserTags) =>
        prevUserTags + (prevUserTags ? `, ${clickedCategory}` : clickedCategory)
    );
  };

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const moveToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const moveToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  let bodyContent = (
    <>
      <div className="relative p-6 flex-auto">
        <div className="text-start">
          <div className="text-2xl font-semibold">
            Which of these best describe your product?
          </div>
          <div className="font-light text-neutral-500 mt-2 mb-6">
            Pick a category (Optional)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
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
        <div className="mt-6">
          <label
            htmlFor="userTags"
            className="block text-md font-light mb-2 font-light text-neutral-500"
          >
            Or add your own tags (Optional)
          </label>
          <input
            type="text"
            id="userTags"
            name="userTags"
            placeholder="Enter tags separated by commas"
            value={userTags}
            onChange={(e) => setUserTags(e.target.value)}
            className="w-full p-4 border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer"
          />
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
        <div className="flex p-6 gap-4">
          <button
            type="button"
            onClick={moveToPreviousStep}
            className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
          >
            Back
          </button>
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

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const handleAddImage = () => {
    if (imageUrl) {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <div className="flex flex-col">
          <div className="relative p-6 flex-auto">
            <div className="text-start">
              <div className="flex text-2xl font-semibold">
                Take a picture of your listing <TiCamera size={25} className="m-0.5 ms-2"/>
              </div>
              <div className="font-light text-neutral-500 mt-2 mb-6">
                You can add more than one!
              </div>
            </div>
            <div className="flex">
              <div className="w-full relative">
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={isFocused ? "Image URL goes here" : ""}
                  className={`peer w-full p-4 pt-6 font-light border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer`}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />

                <div className="flex flex-wrap mt-2">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative flex items-center w-1/2 mb-4"
                    >
                      <img
                        src={url}
                        alt={`Image Preview ${index + 1}`}
                        className="max-w-full h-auto rounded-xl border-4 cursor-pointer"
                        style={{ maxWidth: "220px", maxHeight: "220px" }}
                      />
                      <button
                        className="ml-2 bg-white text-gray-400 hover:text-black p-1 rounded-full"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <AiOutlineClose size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <label
                  htmlFor="imageUrl"
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
                  Upload Image (Optional)
                </label>
              </div>
              <IoAddCircle
                size={50}
                className="mx-2 mt-2 text-blue-500 transition duration-200 ease-in-out hover:opacity-80 cursor-pointer"
                onClick={handleAddImage}
              />
            </div>
          </div>
          <div className="flex px-6 pb-6 gap-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="button"
              onClick={moveToNextStep}
              className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <div className="relative p-6 flex-auto">
            <div className="text-start">
              <div className="text-2xl font-semibold">
                How would you describe your item?
              </div>
              <div className="font-light text-neutral-500 mt-2 mb-6">
                Short and sweet works best!
              </div>
            </div>
            <div className="w-full relative mb-6">
              <input
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="peer w-full p-4 pt-6 font-light border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer"
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
                Title (Required)
              </label>
            </div>

            <div className="flex flex-col mt-2">
              <div className="w-full relative">
                <input
                  id="body"
                  name="body"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="peer w-full p-4 h-20 font-light overflow-hidden border-2 rounded-md outline-none transition hover:border-blue-400 focus:border-blue-400 cursor-pointer"
                />
                <label
                  htmlFor="userId"
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
                  Description (Optional)
                </label>
              </div>
            </div>
          </div>
          <div className="flex px-6 pb-6 gap-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="button"
              onClick={moveToNextStep}
              className={`w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80 ${
                !title && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!title}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.TIME) {
    bodyContent = (
      <>
        <div className="flex flex-col">
          <div className="relative px-6 flex-auto">
            <div className="text-start">
              <div className="text-2xl font-semibold mt-6">
                Review Your Listing
              </div>
              <div className="font-light text-neutral-500 mt-2">
                Take a moment to ensure everything looks just right!
              </div>
            </div>
            {/* Grouping the inputs into one flex container */}
            <div className="flex flex-col items-center text-center w-full">
              <div className="w-full relative">
                <input
                  id="title"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="py-2 text-3xl font-semibold outline-none cursor-pointer text-center"
                />
              </div>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="hidden border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 p-2 rounded-3xl"
              />

              {imageUrls.length > 0 && (
                <div className="relative flex items-center">
                  <img
                    src={imageUrls[0]}
                    alt="Main Image Preview"
                    className="max-w-full h-auto rounded-xl border-4 cursor-pointer"
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                  />
                  <button
                    className="ml-2 bg-white text-gray-400 hover:text-black p-1 rounded-full"
                    onClick={() => handleRemoveImage(0)}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                </div>
              )}

              <div className="w-full relative">
                <input
                  id="body"
                  name="body"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2 text-xl outline-none cursor-pointer text-center"
                />
              </div>

              {userTags && userTags.length > 0 && (
                <div className="font-light text-neutral-500 my-2 text-sm">
                  <p>Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {userTags.split(",").map((tag, index) => (
                      <div
                        key={index}
                        className="border border-blue-400 p-1 rounded-md"
                      >
                        {tag.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* End of grouped inputs */}

            <div className="flex gap-2 font-semibold p-2">
              <div className="text-xl">🌍</div>
              <div className="mt-0.5">
                {selectedCountry && selectedCountry.label}
              </div>
            </div>
            <div>
              <div className="font-light text-neutral-500 my-2 text-sm">
                Choose an expiration time and date for your listing (Required)
              </div>
              <input
                type="datetime-local"
                id="endsAt"
                name="endsAt"
                required
                className="border-2 hover:border-blue-400 p-2 rounded-3xl cursor-pointer"
              />
            </div>
          </div>

          <div className="flex px-6 pb-6 gap-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
            >
              Post
            </button>
          </div>
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
    <Toaster richColors />
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
