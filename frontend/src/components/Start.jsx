import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();
  return (
    <div className="md:px-40 px-8 pt-5 min-h-screen overflow-hidden w-full bg-primaryBrandColor flex flex-col gap-36 relative box-border m-0">
      {/* Left Spotlight */}
      <div className="absolute top-0 -left-[150px] sm:-left-[50px] w-[400px] h-[100px] bg-white/10 rotate-45 blur-3xl rounded-full"></div>

      {/* Right Spotlight */}
      <div className="absolute top-0 -right-[400px] sm:-right-[200px] w-[900px] h-[100px] bg-white/10 -rotate-45 blur-3xl rounded-full"></div>
      <nav className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img className="w-[30px] " src="/logo/icon.svg" alt="plan-it logo" />
          <p className="text-white font-primaryMedium text-lg">Plan-It</p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="btnNavStarted bg-gray-500"
        >
          <span>Get Started</span>
        </button>
      </nav>
      <div className="flex flex-col justify-center items-center">
        {/* <h1 className="text-5xl text-white text-center font-primaryBold leading-tight bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent"> */}
        <h1 className="text-5xl w-[95%] sm:w-[90%] lg:w-[75%] text-white text-center font-primaryBold leading-tight">
          Master Your Goals With Productivity System That Works
        </h1>
        <p className="text-lg w-[80%] sm:w-[75%] lg:w-[60%] text-gray-300 mt-4 text-center">
          Imagine a place where your ideas are stored, your goals are clear, and
          your progress is visible. That’s Plan-It—the smarter way to plan and
          grow.
        </p>
        <button onClick={() => navigate("/login")} className="btnHeroStarted">
          <span>Get Started</span>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <span className="dotIcon relative flex items-center bg-gray-400 text-gray-50 rounded-full px-6 py-2 bg-opacity-10 text-[10px] font-primaryMedium tracking-wide">
          FEATURES
        </span>
        <h3 className="text-4xl w-[95%] sm:w-[90%] lg:w-[75%] text-gray-200 text-center font-primaryBold leading-tight mt-2">
          Why Use Plan-It?
        </h3>
        <div className="w-full flex gap-3 flex-wrap mt-6">
          <div className="rounded-xl bg-gray-500/10 min-w-[300px] flex-1 px-5 py-5">
            <p className="text-xs text-gray-400 font-primarySemiBold">
              Capture. Organize. Grow.
            </p>
            <h5 className="mt-2 text-2xl w-fit font-primarySemiBold bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent">
              Ideas
            </h5>
            <div className="bg-gray-500/20 mt-6 px-3 py-3 rounded-lg">
              <p className="text-xs text-gray-400">
                Quickly save and categorize ideas into different sections, so
                you can revisit and develop them into actionable goals anytime.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-gray-500/10 min-w-[300px] flex-1 px-5 py-5">
            <p className="text-xs text-gray-400 font-primarySemiBold">
              Plan Smart, Achieve More.
            </p>
            <h5 className="mt-2 text-2xl w-fit font-primarySemiBold bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent">
              Planning
            </h5>
            <div className="bg-gray-500/20 mt-6 px-3 py-3 rounded-lg">
              <p className="text-xs text-gray-400">
                Define your goals, set deadlines, and break them into smaller
                steps with an intuitive planning system that keeps you on track.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-gray-500/10 min-w-[300px] flex-1 px-5 py-5">
            <p className="text-xs text-gray-400 font-primarySemiBold">
              Track Progress, Stay Motivated.
            </p>
            <h5 className="mt-2 text-2xl w-fit font-primarySemiBold bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent">
              Milestones
            </h5>
            <div className="bg-gray-500/20 mt-6 px-3 py-3 rounded-lg">
              <p className="text-xs text-gray-400">
                Visualize your journey, track past accomplishments, and see
                upcoming goals in a structured timeline that keeps you
                motivated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
