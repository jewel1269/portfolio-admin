import React from "react";

const AdminProfile: React.FC = () => {
  return (
    <div className="max-w-5xl  mx-auto mt-10 shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv0ZIrLidHrXmxdSY38qwW3_FyQZhJo-sFQ&s"
          alt="Jeremy Rose"
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">Jeremy Rose</h2>
          <p className="text-blue-500">Product Designer</p>
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold">8.6</span>
            <span className="ml-2 text-yellow-400">★★★★★☆</span>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold">Work</h3>
        <p className="font-medium">
          Spotify New York <span className="text-blue-600">(Primary)</span>
        </p>
        <p className="text-sm text-gray-600">170 William Street, NY</p>
        <p className="font-medium mt-2">
          Metropolitan Museum{" "}
          <span className="text-purple-600">(Secondary)</span>
        </p>
        <p className="text-sm text-gray-600">525 E 68th Street, NY</p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p>
          <span className="font-medium">Phone:</span> +1 123 456 7890
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:hello@jeremyrose.com" className="text-blue-500">
            hello@jeremyrose.com
          </a>
        </p>
        <p>
          <span className="font-medium">Website:</span>{" "}
          <a href="https://www.jeremyrose.com" className="text-blue-500">
            www.jeremyrose.com
          </a>
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p>
          <span className="font-medium">Birthday:</span> June 5, 1992
        </p>
        <p>
          <span className="font-medium">Gender:</span> Male
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
