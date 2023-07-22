import LandingPage from "./LandingPage";
import Course from "./courses";
import Signup from "./signup";
import Contact from "./contactUs";
import Login from "./login";
import CourseDetails from './courseDetails';
import Searchbar from "./searchbar";
import SearchResult from "./searchResult";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>

          <Route path="/courses" element={<Course/>}></Route>

          <Route path="/signup" element={<Signup/>}></Route>

          <Route path="/contact" element={<Contact/>}></Route>

          <Route path="/login" element={<Login/>}></Route>

          <Route path="/courseDetails/:id" element={<CourseDetails/>}></Route>

          <Route path="/searchbar" element={<Searchbar/>}></Route>

          <Route path="/searchResult/:searchValue" element={<SearchResult/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
