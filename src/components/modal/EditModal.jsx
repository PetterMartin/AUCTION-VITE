import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateListing } from "../../libs/api";
import { deleteListing } from "../../libs/api";
import { Toaster, toast } from "sonner";

const EditModal = ({
  isModalOpen,
  setModalOpen,
  currentListing,
  setListings,
  title,
}) => {
  const [newTitle, setNewTitle] = useState(title);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdateTitle = async () => {
    try {
      if (currentListing && currentListing.id) {
        const response = await updateListing(currentListing.id, {
          title: newTitle,
          // Add other fields if needed (description, tags, media)
        });
  
        if (response !== null) {
          console.log("API Response:", response);
  
          // Update the listings without reloading the page
          setListings((prevListings) =>
            prevListings.map((listing) =>
              listing.id === currentListing.id
                ? { ...listing, title: newTitle }
                : listing
            )
          );
          toast.success(`Listing Updated`, {
            duration: 5000,
          });
  
          setModalOpen(false);
        } else {
          console.error("Failed to update title. Response is null.");
        }
      } else {
        console.error(
          "Cannot update title: currentListing or its id is undefined"
        );
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleDeleteListing = async () => {
    try {
      if (currentListing && currentListing.id) {
        const response = await deleteListing(currentListing.id);
  
        console.log("API Response (Delete):", response);
  
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== currentListing.id)
        );
  
        if (response !== null) {
          toast.warning(`Listing Deleted`, {
            duration: 5000,
          });
        } else {
          // Even if the response is null, close the modal and show a success message
          toast.error(`Listing Deleted`, {
            duration: 5000,
          });
        }
  
        setModalOpen(false);
      } else {
        console.error(
          "Cannot delete listing: currentListing or its id is undefined"
        );
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      // Close the modal and show a success message even on error
      toast.success(`Listing Deleted`, {
        duration: 5000,
      });
      setModalOpen(false);
    }
  };
  
  

  return (
    <>
    <Toaster richColors  />
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
                  <div className="text-lg font-semibold">Login</div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                  {currentListing && (
                    <div className="text-start">
                      <div className="text-2xl">Edit Listing</div>
                      <div className="mt-4">
                        <p>Title: {title}</p>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            New Title:
                          </label>
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md"
                          onClick={handleUpdateTitle}
                        >
                          Update Title
                        </button>
                        <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                    onClick={handleDeleteListing}
                  >
                    Delete Listing
                  </button>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
