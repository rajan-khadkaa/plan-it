import React, { useEffect, useState } from "react";
import api from "../api/api";
import ViewPopup from "./Ideas/ViewPopup";
import {
  EyeIcon,
  ArrowUturnLeftIcon,
  ArrowsPointingOutIcon,
  PencilSquareIcon,
  TrashIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import EditPopup from "./Ideas/EditPopup";
import { useContext } from "react";
import { BlurContext } from "../App.jsx";

function Archieve() {
  const [ideas, setIdeas] = useState([]);
  const [firstFourIdeas, setFirstFourIdeas] = useState([]);
  const [remainingIdeas, setRemainingIdeas] = useState([]);
  const [popupModal, setPopupModal] = useState(null);
  const [sendIdea, setSendIdea] = useState(null);
  const [search, setSearch] = useState("");
  const { setBlur } = useContext(BlurContext);

  useEffect(() => {
    getIdeas();
  }, []);

  useEffect(() => {
    if (ideas.length > 0) {
      separateData(ideas);
    }
  }, [ideas]);

  async function getIdeas() {
    await api
      .get("/idea")
      .then((res) => {
        // console.log("response ideas are: ", res.data);
        setIdeas(res.data);
      })
      .catch((error) => console.error(error));
  }

  function separateData(ideas) {
    // console.log("all ideas are", ideas);
    const firstFour = ideas.slice(0, 3);
    setFirstFourIdeas(firstFour); //this stores the first four data
    // console.log("first four:", firstFour);
    const remaining = ideas.slice(3);
    setRemainingIdeas(remaining); //this stores all other data after 4th indexed object data
    // console.log("remaining", remaining);
  }

  const tagColors = {
    // Health: "green",
    // Lifestyle: "cyan",
    // Finance: "sky",
    // Knowledge: "orange",
    // Career: "blue",
    // Creativity: "teal",
    // Technology: "indigo",
    // Other: "purple",
  };

  function handleDelete(id) {
    const askUser = confirm("Are you sure you want to delete this idea?");
    if (askUser) console.log("idea that will be deleted: ", id);
  }

  function handleEdit(idea) {
    // console.log("idea id that will be edited: ", idea._id);
    setBlur(true);
    setSendIdea(idea);
    setPopupModal("editModal");
  }

  function handleView(idea) {
    // console.log("idea id that will be viewed: ", idea._id);
    setBlur(true);
    setSendIdea(idea);
    setPopupModal("viewModal");
  }

  const closeModal = () => {
    setBlur(false);
    setSendIdea(null);
    setPopupModal(null);
  };

  return (
    <div className="w-full h-full p-0 m-0">
      <div
        className={`flex flex-col gap-6 flex-1 box-border transition-all duration-100 ${
          popupModal && ""
        }`}
      >
        <div className="flex flex-col items-start h-fit gap-1 box-border">
          {/* <button
              onClick={() => setPopupModal(true)}
              className="text-sm bg-gray-700 text-white rounded-md"
            >
              Open Popup
            </button> */}
          <h3 className="text-sm text-gray-400 font-primaryMedium">
            Upcoming Ideas
          </h3>
          <hr className="border-[1px] border-gray-100 w-full mb-3" />
          <div className="w-full h-auto box-border">
            <ul className="flex-1 h-fit grid py-1 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
              {firstFourIdeas &&
                firstFourIdeas.map((item) => (
                  <li
                    onClick={() => handleView(item)}
                    key={item._id}
                    className="p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                  >
                    <div className="w-full flex flex-col items-start gap-5">
                      <div className="w-full flex flex-col items-start justify-between gap-6">
                        <div className="w-full flex items-center justify-between">
                          <h3 className="text-gray-600 text-sm font-primarySemiBold">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {item.createdAt.split("T")[0]}
                          </p>
                        </div>
                        {/* <div className="w-full flex justify-start gap-1">
                        <p className="bg-none border-[1px] border-gray-200 rounded-md px-3 py-1 text-xs text-green-600">
                          Creativity
                        </p>
                        <p className="bg-none border-[1px] border-gray-200 rounded-md px-3 py-1 text-xs text-purple-600">
                          Technology
                        </p>
                      </div> */}
                        <div className="w-full flex gap-2 justify-between items-end">
                          <div className="w-full flex flex-wrap items-end justify-start gap-1 h-[36px] overflow-y-auto scrollbar-thin">
                            {item.tags.length > 0 ? (
                              item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  // className={`bg-${tagColors[tag]}-100 text-gray-700  rounded-md px-2 h-fit py-1 text-xs`}
                                  className={`bg-gray-50 text-gray-700 border-gray-200 border-[1px] rounded-md px-2 h-fit py-1 text-xs`}
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <div className="text-gray-400 text-xs flex justify-start items-center gap-1">
                                <MinusCircleIcon className="size-4" />
                                No tags
                              </div>
                            )}
                          </div>
                          <div className="flex justify-end gap-2 ">
                            {/* <button
                            type="button"
                            onClick={() => handleView(item._id)}
                            className="size-7 cursor-pointer border-[1px] text-gray-600 border-gray-200 rounded-md hover:bg-gray-600 hover:text-gray-100 p-1"
                          >
                            <ArrowsPointingOutIcon />
                          </button> */}
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation(); //this stops the parent's event to stop running automatically
                                handleEdit(item);
                              }}
                              className=" size-7 cursor-pointer rounded-md border-gray-200 border-[1px] text-gray-500 hover:bg-sky-500 hover:text-gray-100 p-1"
                            >
                              <PencilSquareIcon />
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation(); //this stops the parent's event to stop running automatically
                                handleDelete(item._id);
                              }}
                              className="size-7 cursor-pointer rounded-md border-[1px] border-gray-200 text-gray-500 hover:bg-red-500 hover:text-gray-100 p-1"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start flex-1 gap-1 box-border">
          {" "}
          <div className="w-full flex justify-between items-end">
            <h3 className="text-sm text-gray-400 font-primaryMedium">
              All ideas
            </h3>
            <input
              className="px-2 py-[6px] min-w-[200px] text-xs outline-none border-[1.8px] rounded-md border-gray-300 text-gray-600 placeholder:text-xs placeholder:text-gray-400"
              type="search"
              placeholder="Search here"
              value={search}
              onChange={(event) => setSearch(event.target.value.toLowerCase())}
            />
          </div>
          <hr className="border-[1px] border-gray-100 w-full mb-3" />
          <div className="w-full  box-border ">
            <ul className="flex-1 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 px-2 py-1 h-[52vh] overflow-y-auto scrollbar-thin">
              {remainingIdeas &&
                remainingIdeas
                  .filter((item) =>
                    search.toLowerCase() === ""
                      ? item
                      : item.title.toLowerCase().includes(search)
                  )
                  .map((item) => (
                    <li
                      onClick={() => handleView(item)}
                      key={item._id}
                      className="p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                    >
                      <div className="w-full flex flex-col items-start gap-5">
                        <div className="w-full flex flex-col items-start justify-start gap-6">
                          <div className="w-full flex items-center justify-between">
                            <h3 className="text-gray-600 text-sm font-primarySemiBold">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {item.createdAt.split("T")[0]}
                            </p>
                          </div>
                          <div className="w-full flex gap-2 justify-between items-end">
                            <div className="w-full flex flex-wrap items-end justify-start gap-1 h-[36px] overflow-y-auto scrollbar-thin">
                              {item.tags.length > 0 ? (
                                item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    // className={`bg-${tagColors[tag]}-100 text-gray-700  rounded-md px-2 h-fit py-1 text-xs`}
                                    className={`bg-gray-50 text-gray-700 border-gray-200 border-[1px] rounded-md px-2 h-fit py-1 text-xs`}
                                  >
                                    {tag}
                                  </span>
                                ))
                              ) : (
                                <div className="text-gray-400 text-xs flex justify-start items-center gap-1">
                                  <MinusCircleIcon className="size-4" />
                                  No tags
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation(); //this stops the parent's event to stop running automatically
                                  handleEdit(item);
                                }}
                                className=" size-7 cursor-pointer rounded-md border-gray-200 border-[1px] text-gray-500 hover:bg-sky-500 hover:text-gray-100 p-1"
                              >
                                <PencilSquareIcon />
                              </button>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation(); //this stops the parent's event to stop running automatically
                                  handleDelete(item._id);
                                }}
                                className="size-7 cursor-pointer rounded-md border-[1px] border-gray-200 text-gray-500 hover:bg-red-500 hover:text-gray-100 p-1"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      {popupModal ? (
        popupModal === "editModal" ? (
          <div className="transition-all duration-1000">
            <EditPopup idea={sendIdea} onClose={closeModal} />
          </div>
        ) : (
          <div className="transition-all duration-1000">
            <ViewPopup idea={sendIdea} onClose={closeModal} />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Archieve;

{
  /* <div className="w-full flex items-start gap-3">
  {item.image ? (
    <img
      className="w-[100px] bg-cover h-[100px] "
      src={item.image}
      alt="idea image"
    />
  ) : (
    <img
      className="w-[100px] bg-cover h-[100px]"
      src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1736709317~exp=1736712917~hmac=75745b231bc0b0649d223aa3d7253977504f9d1ccbb1b9444c19a77b984ba5f7&w=740"
    ></img>
  )}
  <p>{item.content}</p>
</div>; */
}
