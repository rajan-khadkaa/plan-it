import api from "./api/api.js";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

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
        className={`transition-[width] duration-300 z-10 bg-white h-full absolute left-0 top-0 rounded-sm ${
          expandSidebar ? "w-[60%]" : "w-[15%]"
        }  md:w-[24%] lg:w-[18%]`}
      >
        <Sidebar expanded={expandSidebar} setExpanded={setExpandSidebar} />
      </div>
      <div className="h-[100vh] absolute right-0 w-[85%] md:w-[76%] lg:w-[82%] flex flex-1 py-4 px-6">
        {children}
      </div>
    </div>
  );
}

export default ProtectedRoute;
