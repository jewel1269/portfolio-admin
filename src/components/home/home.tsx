
import {
  FaBook,
  FaUsers,
  FaListAlt,
  FaRecycle,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

const Home= () => {
  // Dashboard Stats Data
  const stats = [
    { title: "Books Listed", value: 2, icon: <FaBook />, color: "text-green-600", border: "border-green-300" },
    { title: "Times Book Issued", value: 6, icon: <FaListAlt />, color: "text-blue-600", border: "border-blue-300" },
    { title: "Times Books Returned", value: 3, icon: <FaRecycle />, color: "text-yellow-600", border: "border-yellow-300" },
    { title: "Registered Users", value: 6, icon: <FaUsers />, color: "text-red-600", border: "border-red-300" },
    { title: "Authors Listed", value: 2, icon: <FaUser />, color: "text-green-600", border: "border-green-300" },
    { title: "Listed Categories", value: 6, icon: <FaFileAlt />, color: "text-blue-600", border: "border-blue-300" },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
      <hr className="my-4 border-gray-300" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-6 bg-white shadow-md rounded-lg border ${stat.border} 
              transition-transform transform hover:scale-105`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 ${stat.color} text-3xl`}>{stat.icon}</div>

            {/* Info */}
            <div className="ml-4">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
