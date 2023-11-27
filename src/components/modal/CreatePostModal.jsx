import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { FaTshirt, FaWineGlass, FaMobileAlt, FaLaptop } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { PiHouseBold } from "react-icons/pi";

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

export default function CreatePostModal({ isModalOpen, setModalOpen }) {
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
                  <div className="text-lg font-semibold">Login</div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                  <div className="text-start">
                    <div className="text-2xl font-semibold">
                      Which of these best describe your product?
                    </div>
                    <div className="font-light text-neutral-500 mt-2 mb-6">
                      Pick a category
                    </div>
                  </div>

                  <section>
                    <div className="flex flex-col gap-1 my-4">
                      <label
                        htmlFor="title"
                        className="block text-sm leading-6 text-black"
                      >
                        Subject
                      </label>

                      <input
                        id="title"
                        name="title"
                        required
                        className="w-full h-auto resize-none overflow-hidden text-sm border border-gray-300  dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 p-2 rounded-3xl"
                      />
                    </div>
                  </section>

                  <div>
                    <div className="flex flex-col gap-1 my-4">
                      <label
                        htmlFor="userId"
                        className="block text-sm leading-6 text-black"
                      >
                        What´s on your mind?
                      </label>
                      <input
                        id="body"
                        name="body"
                        className="w-full h-20 resize-none overflow-hidden text-sm border border-gray-300  dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 p-2 rounded-3xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="rounded-xl border-2 p-2 flex flex-col items-start text-gray-500 hover:text-blue-500 hover:border-blue-500 transition cursor-pointer"
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

                <div className="flex flex-col gap-1 my-4">
                  <label
                    htmlFor="endsAt"
                    className="block text-sm leading-6 text-black"
                  >
                    Auction End Time
                  </label>
                  <input
                    type="datetime-local" // Use datetime-local input for date and time
                    id="endsAt"
                    name="endsAt"
                    required
                    className="border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 p-2 rounded-3xl"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-2 mb-4">
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm leading-6 text-black"
                  >
                    Upload Image (Optional)
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 p-2 rounded-3xl"
                  />
                </div>
                {/* FOOTER */}
                <div className="flex flex-col gap-4 p-6">
                  <button
                    type="submit"
                    className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
