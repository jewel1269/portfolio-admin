import React, { useState } from "react";
import {
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa6";

const Dashboard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar */}
      <aside
        className={`lg:flex fixed  h-full flex-col shadow-lime-100 ${
          isHovered ? "w-72" : "w-28"
        } bg-gradient-to-b from-[#0D2B2F] to-[#386a70] px-4 py-6 overflow-y-auto border-r 
        dark:bg-gray-900 dark:border-gray-700 transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1
          className={`text-xl text-center text-white font-bold transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          Jewel Mia
        </h1>

        {/* Search Box */}
        {isHovered && (
          <div className="relative mt-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <HiOutlineSearch className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-opacity-40 focus:outline-none"
              placeholder="Search"
            />
          </div>
        )}

        {/* Navigation Links */}
        <nav className="mt-6 flex-1 space-y-3">
          {[
            {
              to: "/dashboard/createProject",
              icon: BiBook,
              label: "Create Project",
            },

            {
              to: "/dashboard/createBlog",
              icon: FaAddressBook,
              label: "Create Blog",
            },
            {
              to: "/dashboard/profile",
              icon: HiOutlineCog,
              label: "Profile",
            },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  isActive
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    : "text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span
                className={`ml-4 font-medium transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        <hr className="my-6 border-gray-200 dark:border-gray-600" />

        {/* Logout */}
        <NavLink
          to="/logout"
          className="flex items-center px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md transition-colors duration-300"
        >
          <FaSignOutAlt className="w-6 h-6" />
          <span
            className={`ml-4 font-medium transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Logout
          </span>
        </NavLink>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
