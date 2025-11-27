import { NavLink } from "react-router-dom";
import { FaTimes, FaRobot, FaChartPie, FaBook, FaCogs } from "react-icons/fa";

const menu = [
  { label: "Overview", path: "/", icon: FaChartPie },
  { label: "Bots", path: "/bots", icon: FaRobot },
  // { label: "Materials", path: "/materials", icon: FaBook },
  // { label: "Settings", path: "/settings", icon: FaCogs }
];

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 flex flex-col pt-8 pb-6 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-80"
      }`}
      style={{ minWidth: '288px' }} // 72 * 4 px for Tailwind's w-72
    >
      <div className="flex items-center gap-3 px-7 mb-10 border-b border-fuchsia-100 pb-6">
        <FaRobot className="text-indigo-700 text-2xl animate-pulse" />
        <span className="text-xl font-bold text-indigo-700 tracking-tight">EduChat</span>
        <button
          className="ml-auto text-indigo-400 hover:text-fuchsia-500 transition"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes size={22} />
        </button>
      </div>
      <nav className="flex flex-col flex-1 gap-1 px-2 mt-2">
        {menu.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-indigo-700 hover:bg-indigo-50 transition-all duration-150 mb-1 ${
                isActive ? "bg-indigo-100 shadow" : ""
              }`
            }
            onClick={() => setOpen(false)}
          >
            <item.icon className="text-lg" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
