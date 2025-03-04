import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const IMGBB_API_KEY = "ccf8111c50b51793f51c952e97443e31";

// Define the interface for the form data
interface ProjectFormData {
  title: string;
  stack: string;
  date: string;
  overview: string;
  live: string;
  client: string;
  server: string;
  technology: string;
  features: string;
  screenshotImages: string;
  category: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm<ProjectFormData>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        imageUrl = result.data.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload project image.");
        return;
      }
    }

    try {
      const projectData = {
        ...data,
        stack: data.stack.split(",").map((item) => item.trim()),
        technology: data.technology.split(",").map((item) => item.trim()),
        features: data.features.split(",").map((item) => item.trim()),
        screenshotImages: data.screenshotImages
          .split(",")
          .map((item) => item.trim()),
        image: imageUrl,
      };

      console.log(projectData);

      const response = await axios.post(
        "http://localhost:5000/api/project/create-project",
        projectData
      );

      console.log("Response:", response.data);
      toast.success("Project added successfully!");
      reset();
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-6">
      <div className="w-full max-w-4xl p-8 bg-opacity-40 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          🚀 Add New Project
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm text-black mt-3">Title:</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">
            Stack (comma-separated):
          </label>
          <input
            {...register("stack")}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">Date:</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">Overview:</label>
          <textarea
            {...register("overview", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black h-32"
          ></textarea>

          <label className="block text-sm text-black mt-3">Live Link:</label>
          <input
            {...register("live", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />
          <label className="block text-sm text-black mt-3">Client Repo: </label>
          <input
            {...register("client", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />
          <label className="block text-sm text-black mt-3">Server Repo:</label>
          <input
            {...register("server", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">
            Technology (comma-separated):
          </label>
          <input
            {...register("technology")}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">
            Features (comma-separated):
          </label>
          <input
            {...register("features")}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">
            Screenshot Images (comma-separated URLs):
          </label>
          <input
            {...register("screenshotImages")}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">Category:</label>
          <input
            {...register("category", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          />

          <label className="block text-sm text-black mt-3">Status:</label>
          <select
            {...register("status")}
            className="w-full p-3 rounded-md border border-gray-600 text-black"
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <label className="block text-sm text-black mt-3">
            Project Image:
          </label>
          <div className="border border-gray-400 rounded-md p-4 flex flex-col items-center bg-gray-100">
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-blue-500 transition"
            >
              <FiUploadCloud className="text-4xl" />
              <span className="mt-2">Click to upload project image</span>
            </label>
            {preview && (
              <img
                src={preview}
                alt="Project Preview"
                className="mt-4 w-full max-h-40 object-cover rounded-md shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-6 bg-teal-500 text-black px-6 py-2 rounded-lg"
          >
            Add Project
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ProjectForm;
