import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase.js";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign-In and Sign-Up
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // State for error messages

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  // Handle Google Sign-In/Sign-Up
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
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
          if (res.data.success) {
            // alert("sucessful login");
            navigate("/idea");
          }
        })
        .catch((error) => console.log("Could not login. Try again.", error));
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign in failed. Please try again.");
      } else {
        const errorMsg = error.code.split("/")[1] || error.message;
        setError(`Error: ${errorMsg}`);
        // setError("Something went wrong. Please try again.");
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Email/Password Sign-In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth(app);
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
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
          if (res.data.success) {
            // alert("sucessful login");
            navigate("/idea");
          }
        })
        .catch((error) => console.log("Could not login. Try again.", error));
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Email/Password Sign-Up
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const auth = getAuth(app);
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // Update user profile with full name
      await updateProfile(result.user, { displayName: formData.fullName }); //this lets add user's name in the firebase as
      // email/password service won't return the name and image BUT it is not instantly updating in the firebase to get in
      // decodedToken in user.controller so sending name in the body. this displayName will be updated later and will be
      // useful future sign-ins.
      const token = await result.user.getIdToken();
      // console.log("token is: ", token);
      await api
        .post(
          "/user/login",
          { fullName: formData.fullName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.data.success) {
            // alert("sucessful login");
            navigate("/idea");
          }
        })
        .catch((error) => console.log("Could not login. Try again.", error));
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else if (error.code === "auth/weak-password") {
        const errorMsg = error.message.split("(")[0].slice(9);
        setError(errorMsg);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-y-auto pt-7 pb-10 h-screen lg:h-fit lg:min-h-screen flex flex-row items-center justify-center box-border">
      {/* Left Side: Image */}
      {/* <div className="w-1/2 border-2 h-full  flex-col hidden md:block">
        <img
          className="w-full h-[80%] object-cover"
          src="/images/image.jpeg"
          alt="Plan-It illustration"
        />
      </div> */}

      {/* Right Side: Form */}
      <div className="w-[100%] md:w-[65%] lg:w-[36%] flex flex-col justify-center items-center bg-white">
        <div className="flex w-[90%] flex-col gap-2 px-4">
          {/* Logo */}
          {/* <img
            className="w-[50px] opacity-90 mb-4"
            src="/logo/name&logo_vertical.svg"
            alt="plan-it logo"
          /> */}
          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h3 className="text-primaryBrandOptColor font-primaryBold text-2xl">
              {isSignUp ? "Sign up for Planit" : "Welcome Back"}
            </h3>
            {/* Supporting Text */}
            <p className="font-primaryRegular text-gray-400">
              {isSignUp
                ? "Sign up and start organizing your ideas and goals."
                : "Sign in to manage your goals and track progress."}
            </p>
          </div>
          {/* Toggle between Sign-In and Sign-Up */}
          <div className="flex gap-4 mt-4 lg:mt-2">
            <button
              className={`overflow-hidden group font-primaryMedium ${
                !isSignUp ? "text-primaryBrandOptColor" : "text-gray-400"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              <p>Sign In</p>
              <div
                className={` ${
                  !isSignUp
                    ? "translate-x-0"
                    : "-translate-x-[105%] opacity-0 group-hover:translate-x-[105%] group-hover:opacity-100"
                } h-[1.2px] w-full transition-transform duration-500  bg-primaryBrandOptColor`}
              />
            </button>
            <button
              className={`overflow-hidden group font-primaryMedium ${
                isSignUp ? "text-primaryBrandOptColor" : "text-gray-400"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              <p>Sign Up</p>
              <div
                className={` ${
                  isSignUp
                    ? "translate-x-0"
                    : "-translate-x-[105%] opacity-0 group-hover:translate-x-[105%] group-hover:opacity-100"
                } h-[1px] w-full transition-transform duration-500  bg-primaryBrandOptColor`}
              />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn}
            className="flex flex-col gap-3 mt-4 w-full"
          >
            {isSignUp && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-primaryMedium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Andy Dufresne"
                  className="py-[0.62rem] px-3 border-[1.8px] border-gray-300 rounded-sm text-sm font-primaryRegular focus:border-primaryBrandOptColor focus:outline-none"
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-primaryMedium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="andydufresne@gmail.com"
                className="py-[0.62rem] px-3 border-[1.8px] border-gray-300 rounded-sm text-sm font-primaryRegular focus:border-primaryBrandOptColor focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-primaryMedium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="py-[0.62rem] px-3 border-[1.8px] border-gray-300 rounded-sm text-sm font-primaryRegular focus:border-primaryBrandOptColor focus:outline-none"
                required
              />
            </div>
            {isSignUp && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-primaryMedium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="py-[0.62rem] px-3 border-[1.8px] border-gray-300 rounded-sm text-sm font-primaryRegular focus:border-primaryBrandOptColor focus:outline-none"
                  required
                />
              </div>
            )}
            {error && (
              <p className="text-sm font-primaryRegular text-red-500 text-center">
                {error}
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading
                  ? "text-gray-500 bg-zinc-300 border-zinc-300"
                  : "text-white bg-primaryBrandOptColor border-primaryBrandOptColor hover:bg-primaryBrandColor hover:shadow-lg"
              } py-3 px-8 mt-1 w-full border-[1.8px]  text-sm font-primaryMedium rounded-sm transition-colors duration-150`}
            >
              {isSignUp
                ? loading
                  ? "Signing Up..."
                  : "Sign Up"
                : loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <p className="text-sm font-primarySemiBold text-gray-600 mt-4 text-center">
            OR
          </p>

          {/* Google Button */}
          <button
            disabled={loading}
            type="button"
            className={`${
              loading
                ? "text-gray-400 bg-zinc-200"
                : "text-gray-500 hover:border-zinc-100 hover:bg-zinc-100 hover:text-primaryBrandColor"
            } flex items-center justify-center gap-2 py-3 px-8 w-full border-[1.8px] text-sm font-primaryMedium rounded-sm transition-colors duration-150`}
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="size-4" />
            {/* <FaGoogle className="size-4" /> */}
            <span>
              {isSignUp
                ? loading
                  ? "Signing Up with Google..."
                  : "Sign Up with Google"
                : loading
                ? "Signing In with Google..."
                : "Sign In with Google"}
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="absolute bottom-0 py-4 w-full bg-primaryBrandOptColor">
        <p className="text-center text-xs w-full text-white">
          © 2025 Plan-it. All rights reserved.
        </p>
      </footer> */}
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
