import { Outlet } from "react-router-dom";
import NavBar from "./components/NavigationComponents/Navbar";
import Footer from "./components/NavigationComponents/Footer";
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
