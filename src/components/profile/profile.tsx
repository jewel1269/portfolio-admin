import React from "react";

const AdminProfile: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 shadow-lg rounded-lg p-6 bg-white">
      <div className="flex items-center space-x-6">
        <img
          src="https://i.ibb.co.com/y7NWJVF/profile-removebg-preview.png"
          alt="Jewel Mia"
          className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Jewel Mia</h2>
          <p className="text-blue-600">Full Stack Software Developer</p>
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold">8.6</span>
            <span className="ml-2 text-yellow-400">★★★★★☆</span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Work</h3>
        <p className="font-medium text-gray-700">
          E-bitans Limited <span className="text-blue-600">(Primary)</span>
        </p>
        <p className="text-sm text-gray-600">Location: Remote</p>
        <p className="font-medium text-gray-700 mt-2">
          Fiverr (Junior Full Stack Developer){" "}
          <span className="text-purple-600">(Secondary)</span>
        </p>
        <p className="text-sm text-gray-600">Freelance / Remote</p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Contact Information
        </h3>
        <p>
          <span className="font-medium">Phone:</span> +880 123 456 7890
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:jewel.mia@example.com" className="text-blue-500">
            jewel.mia@example.com
          </a>
        </p>
        <p>
          <span className="font-medium">Website:</span>{" "}
          <a href="https://www.jewelmia.com" className="text-blue-500">
            www.jewelmia.com
          </a>
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>
        <p>
          <span className="font-medium">Birthday:</span> April 10, 1997
        </p>
        <p>
          <span className="font-medium">Gender:</span> Male
        </p>
        <p>
          <span className="font-medium">Languages:</span> Bengali, English,
          Hindi
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Hobbies</h3>
        <p className="text-gray-700">
          Continuous Learning, Coding, Discovering New Things, Programming
          Contests
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
        <p className="text-gray-700">
          Professional MERN Stack Web Application Developer (Programming Hero)
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
