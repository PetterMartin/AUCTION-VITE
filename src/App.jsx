import "./App.css";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "./components/nav/Sidebar";
import Mobilenav from "./components/nav/MobileNav";

export default function App() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <div className="md:hidden">
        <Mobilenav />
      </div>
    </>
  );
}
