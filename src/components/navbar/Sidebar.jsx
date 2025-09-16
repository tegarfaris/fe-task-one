import { Home, BriefcaseBusiness } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-6">
      <h2 className="text-2xl font-semibold">PT JagooIT</h2>
      <nav className="flex-1 space-y-3">
        <NavLink
          to="/product-list"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive ? "bg-white text-black" : "hover:bg-gray-700"
            }`
          }
        >
          <Home size={18} /> Product List
        </NavLink>
        <NavLink
          to="/job-list"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive ? "bg-white text-black" : "hover:bg-gray-700"
            }`
          }
        >
          <BriefcaseBusiness size={18} /> Job List
        </NavLink>
      </nav>
    </aside>
  );
}
