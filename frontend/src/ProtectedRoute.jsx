import api from "./api/api.js";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import {
  Bars2Icon,
  Bars3Icon,
  Squares2X2Icon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function ProtectedRoute({ children }) {
  const [validUser, setValidUser] = useState(null);
  const location = useLocation();
  const [expandSidebar, setExpandSidebar] = useState(false);

  useEffect(() => {
    checkProtectedRoute();
  }, [location]);

  async function checkProtectedRoute() {
    await api
      .post("/user/protected-route", {})
      .then((res) => {
        if (res.data.success === true) {
          // console.log("res.data.success is: ", res.data.success);
          setValidUser(true);
        } else {
          console.log(res.data.message);
          setValidUser(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // console.log(res.data.message);
        // console.log("Not a verified user. Sign Up or Login first.");
        // console.log("Not a verified user.", error);
        // console.warn(
        //   "Invalid token or session expired. Redirecting to login..."
        // );
        setValidUser(false);
      });
  }

  // While waiting for the API response
  if (validUser === null)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );

  //   if (validUser === null) return <div>Loading...</div>;
  if (!validUser) return <Navigate to="/" />;

  return (
    <div className="flex relative w-full h-full p-0 gap-0 box-border">
      <div
        className={`${
          expandSidebar ? "translate-x-0" : "-translate-x-[100%]"
        } h-full absolute md:translate-x-0 md:relative top-0 left-0 w-[60%] md:w-[24%] lg:w-[18%] transition-transform duration-300 z-10 bg-white`}
      >
        <div className="w-full relative h-full">
          <Sidebar expanded={expandSidebar} setExpanded={setExpandSidebar} />
          <button
            onClick={() => setExpandSidebar(!expandSidebar)}
            type="button"
            className={`block absolute z-10 top-0 right-0 ${
              expandSidebar ? "-translate-x-3 mt-5" : " translate-x-[180%] mt-5"
            } md:hidden  text-primaryBrandOptColor`}
          >
            {expandSidebar ? (
              <Bars3Icon className="size-7" />
            ) : (
              // <XMarkIcon className="size-7" />
              <Bars3Icon className="size-6" />
            )}
          </button>
        </div>
      </div>

      <div
        onClick={() => setExpandSidebar(false)}
        className="h-[100vh] absolute left-0 top-0 md:relative flex w-full flex-1 py-4 px-6"
      >
        {children}
      </div>
    </div>
  );
}

export default ProtectedRoute;
