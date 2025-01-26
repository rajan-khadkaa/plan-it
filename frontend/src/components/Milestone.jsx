import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import {
  EyeIcon,
  ArrowUturnLeftIcon,
  ArrowsPointingOutIcon,
  PencilSquareIcon,
  TrashIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import PlanPopup from "./Plans/PlanPopup.jsx";
import { useContext } from "react";
import { BlurContext } from "../App.jsx";

function Milestone() {
  const [firstFourPlans, setFirstFourPlans] = useState([]);
  const [remainingPlans, setRemainingPlans] = useState([]);
  // const [blur, setBlur] = useState(false);
  const [planPopup, setPlanPopup] = useState(false);
  const [singlePlanData, setSinglePlanData] = useState(null);
  const [search, setSearch] = useState("");
  const { setBlur } = useContext(BlurContext);
  // console.log("blur bg is: ", blurbg);

  useEffect(() => {
    getPlanData();
  }, []);

  async function getPlanData() {
    await api
      .get("/plan")
      .then((res) => {
        const firstFour = res.data.slice(0, 3);
        setFirstFourPlans(firstFour);
        const remainingAll = res.data.slice(3);
        setRemainingPlans(remainingAll);
        // console.log("first four plan: ", firstFour);
        // console.log("remaining plans: ", remainingAll);
      })
      .catch((error) => console.log("Error: ", error));
  }

  const handleView = (plan) => {
    setBlur(true);
    setSinglePlanData(plan);
    setPlanPopup(true);
  };
  const handleDelete = () => {};

  const closeModal = () => {
    setBlur(false);
    setPlanPopup(false);
  };

  return (
    <div className="w-full h-full p-0 m-0">
      {/* <div onClick={() => setBlur(false)} className={`w-full h-full p-0 m-0 ${planPopup && "flex justify-center items-center"}`}> */}
      <div
        className={`flex flex-col gap-6 flex-1 box-border transition-all duration-100 ${
          planPopup && "blur-sm bg-gray-50 opacity-95"
        }`}
      >
        <div className="flex flex-col items-start h-fit gap-1 box-border w-full">
          <h3 className="text-sm text-gray-400 font-primaryMedium">
            Upcoming Plans
          </h3>
          <hr className="border-[1px] border-gray-100 w-full mb-2" />
          <div className="w-full h-auto box-border">
            <ul className="flex-1 h-fit grid py-1 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
              {/* <ul className="flex w-full flex-wrap gap-2 p-1 border-2 border-green-500"> */}
              {firstFourPlans &&
                firstFourPlans.map((item) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      handleView(item);
                    }}
                    key={item._id}
                    className="p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                  >
                    {/* // <li
                  //   key={item._id}
                  //   className="md:max-w-[32.5%] w-full p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                  //   onClick={(event) => {
                  //     event.stopPropagation();
                  //     handleView(item);
                  //   }}
                  // > */}
                    <div className="w-full flex flex-col items-start justify-between gap-5">
                      <div className="w-full flex items-center justify-between">
                        <h3 className="text-gray-600 text-sm font-primarySemiBold">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {item.date.split("T")[0]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-8 w-full overflow-hidden">
                        <p className="text-sm text-gray-400 w-full truncate">
                          {item.message}
                        </p>
                        <div>
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
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start flex-1 gap-1 box-border">
          {" "}
          <div className="w-full flex justify-between items-end">
            <h3 className="text-sm text-gray-400 font-primaryMedium">
              All Plans
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
            <ul className="flex-1 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 px-1 h-[52vh] overflow-y-auto scrollbar-thin">
              {/* <ul className="flex w-full flex-wrap gap-2 p-1 border-2 border-green-500"> */}
              {remainingPlans.length > 1 ? (
                remainingPlans
                  .filter((item) =>
                    search === ""
                      ? item
                      : item.title.toLowerCase().includes(search)
                  )
                  .map((item) => (
                    <li
                      onClick={(event) => {
                        event.stopPropagation();
                        handleView(item);
                      }}
                      key={item._id}
                      className="p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                    >
                      {/* // <li
                    //   key={item._id}
                    //   className="md:max-w-[32.5%] w-full p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                    //   onClick={(event) => {
                    //     event.stopPropagation();
                    //     handleView(item);
                    //   }}
                    // > */}
                      <div className="w-full flex flex-col items-start justify-between gap-5">
                        <div className="w-full flex items-center justify-between">
                          <h3 className="text-gray-600 text-sm font-primarySemiBold">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {item.date.split("T")[0]}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-8 w-full overflow-hidden">
                          <p className="text-sm text-gray-400 w-full truncate">
                            {item.message}
                          </p>
                          <div>
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
                    </li>
                  ))
              ) : (
                <p>No plans found</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      {planPopup && (
        <div className="transition-all duration-1000">
          <PlanPopup plan={singlePlanData} onClose={closeModal} />
        </div>
      )}
    </div>
  );
}

export default Milestone;
