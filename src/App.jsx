import "./App.css";
import { useState } from 'react';
import { Toaster, toast } from "sonner";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "./components/nav/Sidebar";
import Mobilenav from "./components/nav/MobileNav";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <>
    <Toaster />
    <Sidebar handleClearSearch={handleClearSearch} />
      <Outlet />
      <div className="xl:hidden">
        <Mobilenav />
      </div>
    </>
  );
}
