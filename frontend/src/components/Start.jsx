import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  FlagIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import VanillaTilt from "vanilla-tilt";

function Start() {
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
          //if the animation needs to be there in each observation/view
          // else {
          //   entry.target.classList.remove("show");
          // }
        });
      },
      {
        threshold: 0.7,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const elementToObserve = document.querySelectorAll(
      ".cardContainer, .numContainer, .lineContainer"
    );

    elementToObserve.forEach((element) => observer.observe(element));
    // return () => observer.disconnect(); //if animation is needed only for first render
  }, []);

  const cardRef = useRef([]);

  useEffect(() => {
    cardRef.current.forEach((card) => {
      VanillaTilt.init(card, {
        max: 9,
        scale: 1.01,
        glare: true,
        "max-glare": 0.3,
      });
    });
    return () => {
      cardRef.current.forEach((card) => card?.vanillaTilt?.destroy());
    };
  });

  const cardContents = [
    {
      suppText: "Capture. Organize. Grow.",
      headText: "Ideas",
      descText:
        "Save and sort ideas easily, so you can turn them into goals anytime.",
    },
    {
      suppText: "Plan Smart, Achieve More.",
      headText: "Planning",
      descText:
        "Set goals and deadlines in a simple system that keeps you focused.",
    },
    {
      suppText: "Track Progress, Stay Motivated.",
      headText: "Milestones",
      descText:
        "See past wins, track progress, and stay motivated with a clear timeline.",
    },
  ];

  return (
    <div className="pt-5 min-h-screen overflow-hidden w-full bg-primaryBrandColor flex flex-col items-center gap-32 relative box-border m-0">
      {/* <div className="md:px-40 px-8 pt-5 min-h-screen overflow-hidden w-full bg-white flex flex-col gap-32 relative box-border m-0"> */}
      {/* Left Spotlight */}
      <div className="absolute top-0 -left-[150px] sm:-left-[50px] w-[400px] h-[100px] bg-white/10 rotate-45 blur-3xl rounded-full"></div>

      {/* Right Spotlight */}
      <div className="absolute top-0 -right-[400px] sm:-right-[200px] w-[900px] h-[100px] bg-white/10 -rotate-45 blur-3xl rounded-full"></div>

      <div className="flex flex-col gap-32 w-[90%] md:w-[90%] lg:w-[80%] max-w-[1000px]">
        <nav id="home" className="flex justify-between sticky top-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-[30px] "
              src="/logo/icon.svg"
              alt="plan-it logo"
            />
            <p className="text-white font-primaryMedium text-lg">Plan-It</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="btnNavStarted bg-gray-500"
          >
            <span>Get Started</span>
          </button>
        </nav>
        <section className="flex w-full flex-col justify-center items-center">
          {/* <h1 className="text-5xl text-white text-center font-primaryBold leading-tight bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent"> */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl w-full  lg:w-[65%] text-white text-center font-primaryBold leading-tight">
            Master Your Goals With Productivity System That Works
          </h1>
          <p className="text-lg w-[95%] md:w-[90%] lg:w-[60%] text-gray-300 mt-4 text-center">
            Imagine a place where your ideas are stored, your goals are clear,
            and your progress is visible. That’s Plan-It, the smarter way to
            plan and grow.
          </p>
          <button onClick={() => navigate("/login")} className="btnHeroStarted">
            <span>Get Started</span>
          </button>
        </section>
        <section className="flex flex-col justify-center items-center">
          <span className="dotIcon relative flex items-center bg-gray-400 text-gray-50 rounded-full px-6 py-2 bg-opacity-10 text-[10px] font-primaryMedium tracking-wide">
            FEATURES
          </span>
          <h3 className="text-3xl md:text-4xl w-[95%] sm:w-[90%] lg:w-[75%] text-gray-200 text-center font-primaryBold leading-tight mt-5">
            Why Use Plan-It?
          </h3>
          <div className="w-full flex justify-center md:justify-start gap-3 flex-wrap mt-7">
            {cardContents.map((content, index) => (
              <div
                key={index}
                ref={(elem) => (cardRef.current[index] = elem)}
                className="rounded-xl cursor-default bg-[#1a1b22] border-[1.5px] border-gray-500/10 min-w-full md:min-w-[300px] max-w-[49%] flex-1 px-5 py-5"
              >
                <p className="text-sm text-gray-400 font-primarySemiBold">
                  {content.suppText}
                </p>
                <h5 className="mt-1 text-2xl md:text-3xl w-fit font-primarySemiBold bg-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent">
                  {content.headText}
                </h5>
                <div className="bg-[#23242d] mt-6 px-3 py-3 rounded-lg">
                  <p className="text-sm text-gray-400">{content.descText}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col justify-center items-center">
          <span className="dotIcon relative flex items-center bg-gray-400 text-gray-50 rounded-full px-6 py-2 bg-opacity-10 text-[10px] font-primaryMedium tracking-wide">
            WORKFLOW
          </span>
          <h3 className="text-3xl md:text-4xl w-[95%] sm:w-[90%] lg:w-[75%] text-gray-200 text-center font-primaryBold leading-tight mt-5">
            How It Works
          </h3>
          <div className="w-[95%] sm:w-[90%] lg:w-[75%] flex flex-col gap-3 items-start mt-12">
            {/* <div className="flex flex-row border-2  gap-5 items-center w-full "> */}
            <div className="flex flex-col sm:flex sm:flex-row  gap-5 sm:items-center w-full ">
              <span className="numContainer hidden p-6 size-14 sm:flex items-center justify-center rounded-full bg-[#1a1b22] text-xl font-primarySemiBold text-white">
                1
              </span>
              <hr className="lineContainer hidden sm:flex sm:flex-1 border-[1px] border-gray-500/15" />
              <div className="cardContainer relative overflow-hidden w-full sm:w-[300px] bg-[#1a1b22] border-[1.5px] border-gray-500/10 rounded-xl p-6">
                <div className="absolute top-0 right-[50px] w-[100px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <div className="absolute top-0 -right-[150px] w-[300px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <p className="bg-[#23242d] rounded-full size-fit flex items-center justify-center">
                  {/* <span className=" size-12 flex items-center justify-center text-gradient-to-r from-sky-500 via-purple-500 to-red-600 bg-clip-text text-transparent text-xl font-primarySemiBold"> */}
                  <span className="p-3 flex items-center justify-center text-xl font-primarySemiBold">
                    <LightBulbIcon className="size-6 text-gray-400" />
                  </span>
                </p>
                <h5 className="text-[22px] font-primarySemiBold text-gray-200 mt-4">
                  Add Ideas
                </h5>
                <p className="text-gray-400 text-sm mt-2">
                  Write down your ideas and organize them into categories. Save
                  them in the archive.
                </p>
              </div>
            </div>
            {/* <div className="flex gap-5 items-center w-full"> */}
            <div className="flex flex-col sm:flex sm:flex-row  gap-5 sm:items-center w-full ">
              <span className="numContainer hidden p-6 size-14 sm:flex items-center justify-center rounded-full bg-[#1a1b22] text-xl font-primarySemiBold text-white">
                2
              </span>
              {/* <hr className="lineContainer flex flex-1 border-[1px] border-gray-500/15" /> */}
              <hr className="lineContainer hidden sm:flex sm:flex-1 border-[1px] border-gray-500/15" />
              {/* <div className="cardContainer relative overflow-hidden w-[300px] bg-[#1a1b22] border-[1.5px] border-gray-500/10 rounded-xl p-6"> */}
              <div className="cardContainer relative overflow-hidden w-full sm:w-[300px] bg-[#1a1b22] border-[1.5px] border-gray-500/10 rounded-xl p-6">
                <div className="absolute top-0 right-[50px] w-[100px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <div className="absolute top-0 -right-[150px] w-[300px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <p className="bg-[#23242d] rounded-full size-fit flex items-center justify-center">
                  <span className="p-3 flex items-center justify-center text-xl font-primarySemiBold">
                    <PresentationChartLineIcon className="size-6 text-gray-400" />
                  </span>
                </p>
                <h5 className="text-[22px] font-primarySemiBold text-gray-200 mt-4">
                  Plan & Track
                </h5>
                <p className="text-gray-400 text-sm mt-2">
                  Convert ideas into goals by setting milestones and keep track
                  of your progress.
                </p>
              </div>
            </div>
            {/* <div className="flex gap-5 items-center w-full"> */}
            <div className="flex flex-col sm:flex sm:flex-row  gap-5 sm:items-center w-full ">
              <span className="numContainer hidden p-6 size-14 sm:flex items-center justify-center rounded-full bg-[#1a1b22] text-xl font-primarySemiBold text-white">
                3
              </span>
              {/* <hr className="lineContainer flex flex-1 border-[1px] border-gray-500/15" /> */}
              <hr className="lineContainer hidden sm:flex sm:flex-1 border-[1px] border-gray-500/15" />
              {/* <div className="cardContainer relative overflow-hidden w-[300px] bg-[#1a1b22] border-[1.5px] border-gray-500/10 rounded-xl p-6"> */}
              <div className="cardContainer relative overflow-hidden w-full sm:w-[300px] bg-[#1a1b22] border-[1.5px] border-gray-500/10 rounded-xl p-6">
                <div className="absolute top-0 right-[50px] w-[100px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <div className="absolute top-0 -right-[150px] w-[300px] h-[10px] bg-white/30 -rotate-45 blur-xl rounded-full"></div>
                <p className="bg-[#23242d] rounded-full size-fit flex items-center justify-center">
                  <span className="p-3 flex items-center justify-center text-xl font-primarySemiBold">
                    <FlagIcon className="size-6 text-gray-400" />
                  </span>
                </p>
                <h5 className="text-[22px] font-primarySemiBold text-gray-200 mt-4">
                  Achieve Goals
                </h5>
                <p className="text-gray-400 text-sm mt-2">
                  Complete your goals by following your plan and track
                  achievements to accomplish more.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center items-center text-center">
          <span className="dotIcon relative flex items-center bg-gray-400 text-gray-50 rounded-full px-6 py-2 bg-opacity-10 text-[10px] font-primaryMedium tracking-wide">
            LAUNCH
          </span>
          <h3 className="text-3xl md:text-4xl w-[95%] sm:w-[90%] lg:w-[75%] text-gray-200 text-center font-primaryBold leading-tight mt-5">
            Ready to Turn Your Ideas into Reality?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-4 w-[90%] sm:w-[60%]">
            Organize your thoughts, plan your future, and accomplish more with
            Plan-It. Start your journey today!
          </p>

          <button
            onClick={() => navigate("/login")}
            className="btnHeroStarted mt-6"
          >
            <span>Get Started</span>
          </button>
        </section>
      </div>
      <footer
        id="footer"
        className="flex w-full flex-col sm:flex-row sm:justify-center bg-[#1a1b22]"
      >
        <div className="w-[95%] sm:w-[90%] lg:w-[75%] flex  flex-col gap-6 sm:gap-6 sm:flex-row justify-between py-10  px-8">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 items-center">
              <img
                className="w-[30px] "
                src="/logo/icon.svg"
                alt="plan-it logo"
              />
              <p className="text-white font-primaryMedium text-lg">Plan-It</p>
            </div>
            <p className="text-gray-100 text-sm">
              © 2025 Plan-it. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-between text-sm sm:w-[80%] lg:max-w-[60%]">
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-primaryMedium">Company</p>
              <a href="#footer" className="text-gray-300">
                Update
              </a>
              <a href="#footer" className="text-gray-300">
                Status
              </a>
              <a href="#footer" className="text-gray-300">
                About
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-primaryMedium">Legal</p>
              <a href="#footer" className="text-gray-300">
                Privacy Policy
              </a>
              <a href="#footer" className="text-gray-300">
                Terms of Service
              </a>
              <a href="#footer" className="text-gray-300">
                About
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-primaryMedium">Social</p>
              <a href="#footer" className="text-gray-300">
                Discord
              </a>
              <a href="#footer" className="text-gray-300">
                Instagram
              </a>
              <a href="#footer" className="text-gray-300">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Start;
