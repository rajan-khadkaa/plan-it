import "./App.css";
import Collection from "./components/Collection.jsx";
import Idea from "./components/Ideas/Idea.jsx";
import Login from "./components/Login";
import Milestone from "./components/Milestone.jsx";
import Plan from "./components/Plans/Plan.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import Start from "./components/Start.jsx";
import { ArrowLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export const BlurContext = createContext();

function NotFound() {
  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      <img
        className="size-32"
        // className="size-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01]"
        src="/logo/logo.svg"
        alt="Planit Logo"
      />
      <h1 className="text-8xl font-bold mb-2 text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <a
        href="/"
        className="mt-8 text-sm flex justify-center items-center gap-2 
                    bg-primaryBrandOptColor text-white
                  py-[10px] px-4 rounded-lg"
      >
        <ArrowLeftIcon className="size-5" />
        <p className="font-primaryRegular">Go Back Home</p>
      </a>
    </div>
  );
}

function App() {
  const [blur, setBlur] = useState(false);

  return (
    <div className="w-full h-[100vh] overflow-visible box-border">
      <div className="w-full h-full">
        <BlurContext.Provider value={{ blur, setBlur }}>
          <Router>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/idea"
                element={
                  <ProtectedRoute>
                    <Idea />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/collection"
                element={
                  <ProtectedRoute>
                    <Collection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan"
                element={
                  <ProtectedRoute>
                    <Plan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/milestone"
                element={
                  <ProtectedRoute>
                    <Milestone />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </BlurContext.Provider>
      </div>
    </div>
  );
}

export default App;
