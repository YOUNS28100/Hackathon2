import { Outlet } from "react-router-dom";
import NavBar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import "./tailwind.css";

function App() {
  return (
    <div className="font-cbnormal">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
