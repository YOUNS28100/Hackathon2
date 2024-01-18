import { Outlet } from "react-router-dom";
import NavBar from "./components/NavigationComponents/Navbar";
import Footer from "./components/NavigationComponents/Footer";
import "./tailwind.css";

function App() {
  // const path = useLocation().pathname;
  return (
    <div className="font-cbnormal">
      <NavBar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
