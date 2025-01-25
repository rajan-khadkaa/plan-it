import api from "./api/api.js";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

function ProtectedRoute({ children }) {
  const [validUser, setValidUser] = useState(null);
  const location = useLocation();

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
    <div className="flex w-full h-full p-0 gap-0 box-border">
      <div className="boder-2 border-gray-300 h-full rounded-sm w-[18%]">
        <Sidebar />
      </div>
      <div className="h-full flex flex-1 py-4 px-6">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
