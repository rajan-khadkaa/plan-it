import "./App.css";
import Archive from "./components/Archive.jsx";
import Idea from "./components/Ideas/Idea.jsx";
import Login from "./components/Login";
import Milestone from "./components/Milestone.jsx";
import Plan from "./components/Plans/Plan.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export const BlurContext = createContext();

function App() {
  const [blur, setBlur] = useState(false);

  return (
    <div className="w-full h-screen box-border">
      <div className="w-full h-full">
        <BlurContext.Provider value={{ blur, setBlur }}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/idea"
                element={
                  <ProtectedRoute>
                    <Idea />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/archive"
                element={
                  <ProtectedRoute>
                    <Archive />
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
            </Routes>
          </Router>
        </BlurContext.Provider>
      </div>
    </div>
  );
}

export default App;
