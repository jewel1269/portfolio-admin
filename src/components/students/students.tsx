import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Rakesh Kumar",
    session: "2023-2024",
    gender: "Male",
    dob: "26/08/2005",
    guardian: "KL Kumar",
    email: "kumar.kl@gmail.com",
    phone: "+91 9876543210",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Gosh",
    session: "2023-2024",
    gender: "Female",
    dob: "01/12/2006",
    guardian: "Suman Gosh",
    email: "goshsuman09@gmail.com",
    phone: "+91 8745671235",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Shivam Das",
    session: "2023-2024",
    gender: "Male",
    dob: "12/04/2005",
    guardian: "Krishna Das",
    email: "daskrish12@gmail.com",
    phone: "+91 8567312908",
    status: "Active",
  },
];

export default function StudentTable() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold">Student Management Panel</h1>
      <div className="flex justify-between lg:mt-8 mb-4">
        <div className="flex items-center ">
          <input
            type="text"
            placeholder="Type Student Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full max-w-lg rounded-l-2xl"
          />
          <button className="bg-teal-500 ml-1 text-white px-4 py-2 rounded-r-2xl">
            Search
          </button>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">
          + Add Student
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Session</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Guardian Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="border-b">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.session}</td>
              <td className="border p-2">{student.gender}</td>
              <td className="border p-2">{student.dob}</td>
              <td className="border p-2">{student.guardian}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    student.status === "Active"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {student.status}
                </span>
              </td>
              <td className="border p-2 flex gap-2 justify-center">
                <button className="text-gray-600 hover:text-blue-500">
                  ✏️
                </button>
                <button className="text-red-600 hover:text-red-800">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
