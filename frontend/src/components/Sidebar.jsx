import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api.js";
import {
  LightBulbIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  FlagIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); //get location first
  const locationEndpoint = location.pathname.split("/")[1]; //and then split and get the endpoint to set active
  const [isActive, setIsActive] = useState("");
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setIsActive(locationEndpoint); //set the active sidebar to whichever endpoint is in the URL
  }, [locationEndpoint]);

  useEffect(() => {
    getProfileInfo();
  }, []);

  async function getProfileInfo() {
    await api
      .get("/user/profile-info")
      .then((res) => {
        // console.log(res.data);
        setUserInfo(res.data);
        // console.log("user data are: ", userInfo);
      })
      .catch((error) => console.log(error));
  }

  const handleLogout = async () => {
    const choice = confirm("Are you sure you want to logout?");
    if (choice) {
      await api
        .post("/user/logout", {})
        .then((res) => {
          console.log(res.data.message);
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-full font-primaryMedium text-sm">
      <div className="flex flex-col gap-0 w-full">
        <div className="mb-4">
          <h3 className="px-3 py-2 text-lg font-primarySemiBold w-full">
            <span className="text-primaryBrandOptColor">Plan-</span>
            <span className="text-primaryBrandOptColor">It</span>
          </h3>
        </div>
        <Link
          to="/idea"
          //   onClick={() => setIsActive("idea")}
          className={`${
            isActive === "idea" ? "bg-gray-200" : ""
          } text-gray-600 px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <LightBulbIcon
            className={`${
              isActive === "idea" ? "text-gray-600" : "text-gray-400 "
            } size-[19px]`}
          />
          <p className="font-primarySemiBold text-base">Idea</p>
        </Link>
        <Link
          to="/archive"
          //   onClick={() => setIsActive("archive")}
          className={`${
            isActive === "archive" ? "bg-gray-200" : ""
          } text-gray-600 px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <ArchiveBoxIcon
            className={`${
              isActive === "archive" ? "text-gray-600" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Archive</p>
        </Link>
        <Link
          to="/plan"
          //   onClick={() => setIsActive("plan")}
          className={`${
            isActive === "plan" ? "bg-gray-200" : ""
          } text-gray-600 px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <CalendarIcon
            className={`${
              isActive === "plan" ? "text-gray-600" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Plan</p>
        </Link>
        <Link
          to="/milestone"
          //   onClick={() => setIsActive("milestone")}
          className={`${
            isActive === "milestone" ? "bg-gray-200" : ""
          } text-gray-600 px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <FlagIcon
            className={`${
              isActive === "milestone" ? "text-gray-600" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Milestone</p>
        </Link>
      </div>
      <div className=" flex flex-col items-start w-full gap-3">
        <div className="flex  items-center gap-3 py-2 w-full rounded-sm">
          {/* <hr className="w-full border-[1.2px] border-gray-200" /> */}
          <div className="w-full flex justify-center items-center gap-2">
            {userInfo ? (
              // <div className="w-9 h-9 bg-red-400 rounded-full overflow-hidden  border-[2px] border-primaryBrandOptColor">
              <img
                className="w-8 h-8 object-cover border-[3px] rounded-full border-gray-300"
                src={userInfo.picture}
                alt="img"
              />
            ) : (
              // </div>
              ""
            )}
            <p className="flex-1 text-sm font-primarySemiBold text-gray-600">
              {userInfo ? userInfo.name : "Guest"}
              {/* {console.log("user datait got from backend are: ", userInfo)} */}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-0 text-red-700 rounded-sm"
          >
            <ArrowLeftStartOnRectangleIcon className="size-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
