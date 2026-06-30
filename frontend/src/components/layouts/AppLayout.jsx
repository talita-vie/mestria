import { Outlet } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar/>
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}