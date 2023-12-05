import "./App.css";
import { Toaster, toast } from "sonner";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "./components/nav/Sidebar";
import Mobilenav from "./components/nav/MobileNav";

export default function App() {
  return (
    <>
    <Toaster />
      <Sidebar />
      <Outlet />
      <div className="md:hidden">
        <Mobilenav />
      </div>
    </>
  );
}
