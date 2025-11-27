import { FaUserCircle, FaBell, FaRegSun, FaBars } from "react-icons/fa";

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-white py-4 px-8 shadow flex justify-between items-center border-b border-indigo-100 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Hamburger menu in header */}
        <button
          className="p-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FaBars size={20} />
        </button>
        <span className="text-2xl font-bold text-indigo-700 tracking-tight">EduChat Admin</span>
        <FaRegSun className="text-xl text-yellow-400 mx-2" title="Settings" />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="text-xl text-indigo-400 hover:text-fuchsia-500 transition" title="Notifications" />
          <span className="absolute -top-2 -right-2 h-3 w-3 bg-fuchsia-500 rounded-full block"></span>
        </button>
        <span className="text-lg text-indigo-700">Admin</span>
        <FaUserCircle className="text-3xl text-indigo-400 hover:text-fuchsia-500 transition" title="Profile" />
      </div>
    </header>
  );
}
