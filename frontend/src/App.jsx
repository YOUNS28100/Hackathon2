import { Outlet } from "react-router-dom";
import NavBar from "./components/NavigationComponents/Navbar";
import Footer from "./components/NavigationComponents/Footer";
import BasketContextProvider from "./context/BasketCount";
import "./tailwind.css";

function App() {
  return (
    <div className="font-cbnormal">
      <BasketContextProvider>
        <NavBar />
        <Outlet />
        <Footer />
      </BasketContextProvider>
    </div>
  );
}

export default App;
