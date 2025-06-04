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
  const [firstThreePlans, setfirstThreePlans] = useState([]);
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
        const firstThree = res.data.slice(0, 3);
        setfirstThreePlans(firstThree);
        const remainingAll = res.data.slice(3);
        setRemainingPlans(remainingAll);
        // console.log("first four plan: ", firstThree);
        // console.log("remaining plans: ", remainingAll);
      })
      .catch((error) => console.log("Error: ", error));
  }

  const handleView = (plan) => {
    setBlur(true);
    setSinglePlanData(plan);
    setPlanPopup(true);
  };

  async function handleDelete(id) {
    const askUser = confirm("Are you sure you want to delete this plan?");
    if (askUser) {
      // console.log("idea that will be deleted: ", id);
      await api
        .delete(`/plan/${id}`)
        .then((res) => {
          // console.log("response from backend: ", res.data.message);
          console.log("Plan deleted succesfully");
          getPlanData();
        })
        .catch((error) => console.log("Error: ", error));
    }
  }

  const closeModal = () => {
    setBlur(false);
    setPlanPopup(false);
  };

  return (
    <div className="w-full h-full p-0 m-0">
      {/* <div onClick={() => setBlur(false)} className={`w-full h-full p-0 m-0 ${planPopup && "flex justify-center items-center"}`}> */}
      <div
        className={`flex h-full flex-col gap-6 flex-1 box-border transition-all duration-100 ${
          planPopup && "blur-sm bg-gray-50 opacity-95"
        }`}
      >
        {/* UPCOMING PLANS */}
        <div className="flex flex-col items-start gap-1 box-border">
          <h3 className="text-sm text-gray-400 font-primaryMedium">
            Upcoming Plans
          </h3>
          <hr className="border-[1px] border-gray-100 w-full mb-3" />
          <div className="w-full  h-[30vh] md:h-fit overflow-y-auto box-border scrollbar-thin">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1 h-fit">
              {/* <ul className="flex w-full flex-wrap gap-2 p-1 border-2 border-green-500"> */}
              {firstThreePlans.length > 0 ? (
                firstThreePlans.map((item) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      handleView(item);
                    }}
                    key={item._id}
                    className="p-4 h-fit cursor-pointer border-[1.8px] border-gray-200 rounded-md hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 transition-all duration-150 flex flex-col"
                  >
                    {/* // <li
                  //   key={item._id}
                  //   className="md:max-w-[32.5%] w-full p-4 bg-none cursor-pointer border-[1.8px] border-gray-200 rounded-md h-fit hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 hover:border- transition-all duration-150"
                  //   onClick={(event) => {
                  //     event.stopPropagation();
                  //     handleView(item);
                  //   }}
                  // > */}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-12">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray-600 text-sm font-primarySemiBold truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400  whitespace-nowrap">
                            {item.date.split("T")[0]}
                          </p>
                        </div>
                        <div className="w-full flex gap-2 justify-between items-start">
                          <div className="w-[80%]">
                            <p className="text-sm h-fit text-gray-400 truncate">
                              {item.message}
                            </p>
                          </div>
                          <div className="flex justify-end">
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
                ))
              ) : (
                <p className="col-span-full text-center mt-4 text-gray-600 font-primaryMedium">
                  No upcoming plans.
                </p>
              )}
            </ul>
          </div>
        </div>

        {/* ALL PLANS */}
        <div className="flex flex-col flex-1 min-h-0 items-start gap-1 box-border">
          {" "}
          <div className="w-full flex justify-between items-center">
            <h3 className="text-sm text-gray-400 font-primaryMedium">
              All Plans
            </h3>
            <input
              className="px-2 py-[6px] w-[40vw] md:w-[28vw] lg:w-[20vw] text-xs outline-none border-[1.8px] rounded-md border-gray-300 text-gray-600 placeholder:text-xs placeholder:text-gray-400"
              type="search"
              placeholder="Search here"
              value={search}
              onChange={(event) => setSearch(event.target.value.toLowerCase())}
            />
          </div>
          <hr className="border-[1px] border-gray-100 w-full mb-3" />
          <div className="flex-1 w-full min-h-0 overflow-y-auto scrollbar-thin py-1 pl-1 pr-2">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {/* <ul className="flex w-full flex-wrap gap-2 p-1 border-2 border-green-500"> */}
              {remainingPlans.length > 0 ? (
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
                      className="p-4 h-fit cursor-pointer border-[1.8px] border-gray-200 rounded-md hover:shadow-sm hover:scale-[1.01] hover:bg-gray-50 hover:border-gray-200 transition-all duration-150 flex flex-col"
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-12">
                          <div className="flex items-center justify-between">
                            <h3 className="text-gray-600 text-sm font-primarySemiBold truncate">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-400 whitespace-nowrap">
                              {item.date.split("T")[0]}
                            </p>
                          </div>
                          <div className="w-full flex gap-2 justify-between items-start">
                            <div className="w-[80%]">
                              <p className="text-sm text-gray-400 h-fit truncate">
                                {item.message}
                              </p>
                            </div>
                            <div className="flex justify-end">
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
                  ))
              ) : (
                <div className="col-span-full h-full text-center pt-10">
                  <h5 className="text-gray-600 font-primaryMedium">
                    No plans found.
                  </h5>
                  <p className="text-gray-400 text-sm mt-1">
                    {`${
                      firstThreePlans.length === 0
                        ? " Please add plans to see here."
                        : " Please add more plans to see here."
                    }`}
                  </p>
                </div>
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
