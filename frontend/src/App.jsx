import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./tailwind.css";

function App() {
  return (
    <div className="bg-responsivecity lg:bg-city bg-contain ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
