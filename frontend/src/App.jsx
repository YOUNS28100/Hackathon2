import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavigationComponents/Navbar";
import Footer from "./components/NavigationComponents/Footer";
import "./tailwind.css";

function App() {
  const [auth, setAuth] = useState();

  return (
    <div className="font-cbnormal">
      <NavBar />
      <main className="">
        <Outlet context={{ auth, setAuth }} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
