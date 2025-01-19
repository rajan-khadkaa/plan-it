import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api.js";
import {
  LightBulbIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  FlagIcon,
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
          <h3 className="px-3 py-2 w-full">Logo here</h3>
        </div>
        <Link
          to="/idea"
          //   onClick={() => setIsActive("idea")}
          className={`${
            isActive === "idea"
              ? "bg-primaryBrandOptColor text-white"
              : "text-gray-600"
          } px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <LightBulbIcon
            className={`${
              isActive === "idea" ? "text-gray-50" : "text-gray-400 "
            } size-[19px]`}
          />
          <p className="font-primarySemiBold text-base">Idea</p>
        </Link>
        <Link
          to="/archive"
          //   onClick={() => setIsActive("archive")}
          className={`${
            isActive === "archive"
              ? "bg-primaryBrandOptColor text-white"
              : "text-gray-600"
          } px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <ArchiveBoxIcon
            className={`${
              isActive === "archive" ? "text-gray-50" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Archive</p>
        </Link>
        <Link
          to="/plan"
          //   onClick={() => setIsActive("plan")}
          className={`${
            isActive === "plan"
              ? "bg-primaryBrandOptColor text-white"
              : "text-gray-600"
          } px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <CalendarIcon
            className={`${
              isActive === "plan" ? "text-gray-50" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Plan</p>
        </Link>
        <Link
          to="/milestone"
          //   onClick={() => setIsActive("milestone")}
          className={`${
            isActive === "milestone"
              ? "bg-primaryBrandOptColor text-white"
              : "text-gray-600"
          } px-3 py-2 w-full transition-all duration-150 rounded-sm flex justify-start items-center gap-[8px]`}
        >
          <FlagIcon
            className={`${
              isActive === "milestone" ? "text-gray-50" : "text-gray-400 "
            } size-4`}
          />
          <p className="font-primarySemiBold text-base">Milestone</p>
        </Link>
      </div>
      <div className=" flex flex-col items-start w-full gap-3">
        <div className="flex flex-col items-start gap-3 py-2 w-full rounded-sm">
          <div className="w-full flex justify-center items-center gap-2">
            {userInfo ? (
              // <div className="w-9 h-9 bg-red-400 rounded-full overflow-hidden  border-[2px] border-primaryBrandOptColor">
              <img
                className="w-10 h-10 object-cover border-[3px] rounded-full border-gray-300"
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
          <hr className="w-full border-[1.2px] border-gray-200" />
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-2 w-full bg-red-700 text-white rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
