import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/user" element={<UserHome />} />
        <Route exact path="/admin" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
