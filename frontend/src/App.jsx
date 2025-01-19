import "./App.css";
import Archive from "./components/Archive.jsx";
import Idea from "./components/Ideas/Idea.jsx";
import Login from "./components/Login";
import Milestone from "./components/Milestone.jsx";
import Plan from "./components/Plan.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] box-border">
      <div className="w-full h-full">
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
      </div>
    </div>
  );
}

export default App;
