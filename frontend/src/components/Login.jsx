import react from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import api from "../api/api.js";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      // console.log("token is: ", token);
      await api
        .post(
          "/user/login",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data.message);
          // const cookies = document.cookie;  //can't access because of httpOnly: true in backend
          // console.log("cookies are: ", cookies);
          // if (cookies.includes("token")) {
          //   alert("it has cookie.");
          // }
          if (res.data.success) {
            // alert("sucessful login");
            navigate("/idea");
          }
        })
        .catch((error) => console.log("Could not login. Try again.", error));
    } catch (error) {
      alert("Could not sign in with google at the moment. Try again.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-center p-0 m-0 h-[100vh] box-border">
      <main className="flex max-w-[380px] h-full pt-10  gap-3 flex-col items-center">
        <img
          className="w-[50px] opacity-90"
          src="/logo/name&logo_vertical.svg"
          alt="plan-it logo"
        />
        <h3 className="text-primaryBrandOptColor mt-6 font-primaryBold text-3xl">
          Welcome to Plan-It
        </h3>
        <p className="text-sm font-primaryRegular text-gray-400 text-center">
          Your ideas, your goals, your way – Plan-It is here to help you
          organize and achieve it all effortlessly.
        </p>
        <div className="flex flex-col gap-4 mt-8 items-center w-full">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-8  w-full border-[1.8px] border-primaryBrandOptColor bg-primaryBrandOptColor text-sm font-primaryMedium text-white rounded-sm  hover:bg-primaryBrandColor hover:shadow-lg transition-colors duration-150"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="size-4" />
            {/* <FcGoogle className="size-4" /> */}
            <span>Sign In with google</span>
          </button>
          {/* <hr className="border-[1.5px] border-gray-300 w-full" /> */}
          {/* <p className="text-sm text-gray-600">
            New user? Register below to continue.
          </p> */}
          <p className="text-sm font-primarySemiBold text-gray-600">OR</p>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-8 w-full border-[1.8px] border-gray-400 text-sm font-primaryMedium text-gray-500 rounded-sm hover:border-primaryBrandOptColor  hover:bg-primaryBrandOptColor hover:text-white hover:shadow-lg transition-colors duration-150"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="size-4" />
            <span>Sign Up with google</span>
          </button>
        </div>
      </main>

      <footer className="py-8 w-full bg-primaryBrandOptColor">
        <p className="text-center text-xs w-full text-white">
          © 2025 Plan-it. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Login;

// <div className="w-full box-border relative p-0 m-0 h-[100vh]">
//   <div className="fixed inset-0 border-2 border-green-600 overflow-hidden">
//     <img
//       className="object-cover"
//       src="/images/bg.jpg"
//       alt="productivity image"
//     />
//   </div>
//   <div className=" w-full h-[100vh] relative z-10 ">
//     <main className="flex w-full h-full relative gap-3 flex-col items-center border-2">
//       <button
//         type="button"
//         className="py-3 px-8 w-fit bg-primaryBrandOptColor text-sm font-primaryMedium text-white rounded-sm  hover:bg-primaryBrandColor hover:shadow-lg transition-colors duration-150"
//         onClick={handleGoogleSignIn}
//       >
//         Continue with google
//       </button>
//     </main>

//     <footer className="py-8 w-full bottom-0 bg-primaryBrandOptColor">
//       <p className="text-center text-xs w-full text-white">
//         © 2025 Plan-it. All rights reserved.
//       </p>
//     </footer>
//   </div>
// </div>
