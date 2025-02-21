import React from "react";
import {
  FaBook,
  FaUsers,
  FaListAlt,
  FaRecycle,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { useGetBooksQuery } from "../../redux/features/api/api-slice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

const Home = () => {
  const { data: books } = useGetBooksQuery();

  const stats = [
    {
      title: "Books Listed",
      value: books?.data?.length || 0,
      icon: <FaBook />,
      color: "text-green-600",
      border: "border-green-300",
    },
    {
      title: "Times Book Issued",
      value: 6,
      icon: <FaListAlt />,
      color: "text-blue-600",
      border: "border-blue-300",
    },
    {
      title: "Times Books Returned",
      value: 3,
      icon: <FaRecycle />,
      color: "text-yellow-600",
      border: "border-yellow-300",
    },
    {
      title: "Registered Users",
      value: 6,
      icon: <FaUsers />,
      color: "text-red-600",
      border: "border-red-300",
    },
    {
      title: "Authors Listed",
      value: 2,
      icon: <FaUser />,
      color: "text-green-600",
      border: "border-green-300",
    },
    {
      title: "Listed Categories",
      value: 6,
      icon: <FaFileAlt />,
      color: "text-blue-600",
      border: "border-blue-300",
    },
  ];

  // Sample Data for Charts
  const lineChartData = [
    { month: "Jan", books: 10, users: 4 },
    { month: "Feb", books: 15, users: 8 },
    { month: "Mar", books: 12, users: 6 },
    { month: "Apr", books: 20, users: 12 },
    { month: "May", books: 25, users: 18 },
    { month: "Jun", books: 22, users: 16 },
  ];

  const barChartData = [
    { category: "Fiction", count: 30 },
    { category: "Science", count: 15 },
    { category: "History", count: 10 },
    { category: "Biography", count: 5 },
    { category: "Fiction", count: 30 },
    { category: "Science", count: 15 },
    { category: "History", count: 10 },
    { category: "Biography", count: 5 },
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
            <div className={`w-12 h-12 ${stat.color} text-3xl`}>
              {stat.icon}
            </div>

            {/* Info */}
            <div className="ml-4">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

     <div className="lg:flex justify-around gap-10">
       {/* Line Chart */}
       <div className="mt-10 lg:w-[50%] ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
         1. Books & Users Growth (Line Chart)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="books"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="mt-10 lg:w-[50%]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          2. Category Distribution (Bar Chart)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
     </div>
    </div>
  );
};

export default Home;
