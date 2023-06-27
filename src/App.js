import LandingPage from "./LandingPage";
import Course from "./courses";
import Signup from "./signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
      </Routes>

      <Routes>
          <Route path="/courses" element={<Course/>}></Route>
      </Routes>
      <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
