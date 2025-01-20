import react from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import api from "../api/api.js";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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
    <div className="flex flex-col text-center items-center justify-between my-auto w-full h-full box-border">
      <header className="p-10">
        <h3 className="font-primaryBold text-xl text-primaryBrandOptColor">
          Welcome to <span className="text-secondaryBrandColor">Plan-It.</span>
        </h3>
      </header>
      <main>
        <button
          type="button"
          className="py-3 px-8 w-fit bg-primaryBrandOptColor text-sm font-primaryMedium text-white rounded-sm  hover:bg-primaryBrandColor hover:shadow-lg transition-colors duration-150"
          onClick={handleGoogleSignIn}
        >
          Continue with google
        </button>
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
