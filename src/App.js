import Main from "./components/admin/Main.jsx";
import Index from "./components/index/Index.jsx";
import Navbar from "./components/index/Navbar.js";
import Footer from "./components/index/Footer.js";
import Registration from "./components/index/account/Registration.js";
import Profile from "./components/index/account/Profile.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const handleClick = () => {
      if (localStorage.getItem("name") !== "null" && localStorage.getItem("name") !== null) {
          window.location.replace("/profile");
      } else {
          setLogin(!login);
      }
  }

  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-slate-900 to-gray-900">
        <Navbar handleLogin={handleClick} login={login} setLogin={setLogin}/>
        <Routes>
          <Route path="/" element={<Index handleLogin={handleClick} login={login} setLogin={setLogin}/>}/>
          <Route path="/admin" element={<Main />}/>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;