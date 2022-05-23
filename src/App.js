import "./App.css";
import Landing from "./Pages/Landing/Landing";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";
import Profile from "./Pages/Profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FAQ from "./Pages/FAQ/FAQ";
import ViewTest from "./Pages/ViewTest/ViewTest";
import TestSubmit from "./Pages/TestSubmit/TestSubmit";
import ReviewTest from "./Pages/ReviewTest/ReviewTest";
import MCQ from "./Pages/MCQ/MCQ";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        <Routes>
          <Route path="/studentDashboard" element={<StudentDashboard />} />
        </Routes>
        <Routes>
          <Route path="/studentProfile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
        <Routes>
          <Route path="/viewTest" element={<ViewTest />} />
        </Routes>
        <Routes>
          <Route path="/testsubmit" element={<TestSubmit />} />
        </Routes>
        <Routes>
          <Route path="/reviewTest" element={<ReviewTest />} />
        </Routes>
        <Routes>
          <Route path="/studentMCQ" element={<MCQ />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
