import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const IMGBB_API_KEY = "ccf8111c50b51793f51c952e97443e31";

interface BlogFormData {
  title: string;
  subtitle?: string;
  category: string;
  tags: string;
  author: string;
  publishDate: string;
  readTime: string;
  content: string;
  prerequisites: string;
  codeSnippets: { title: string; code: string; language: string }[];
}

const BlogForm = () => {
  const { register, handleSubmit, reset } = useForm<BlogFormData>();
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [codeSnippets, setCodeSnippets] = useState<
    { title: string; code: string; language: string }[]
  >([]);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCover(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addCodeSnippet = () => {
    setCodeSnippets([...codeSnippets, { title: "", code: "", language: "" }]);
  };

  const updateCodeSnippet = (
    index: number,
    field: keyof BlogFormData["codeSnippets"][0],
    value: string
  ) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[index][field] = value;
    setCodeSnippets(updatedSnippets);
  };

  const onSubmit = async (data: BlogFormData) => {
    let coverUrl = "";

    if (cover) {
      const formData = new FormData();
      formData.append("image", cover);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        coverUrl = result.data.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload cover image.");
        return;
      }
    }

    try {
      const blogPost = {
        ...data,
        tags: data.tags.split(",").map((tag) => tag.trim()), 
        prerequisites: data.prerequisites
          .split(",")
          .map((prereq) => prereq.trim()), 
        cover: coverUrl,
        codeSnippets,
      };

      console.log(blogPost);

      const response = await axios.post(
        "http://localhost:5000/api/blog/create-blog",
        blogPost
      );

      console.log("Response:", response.data);
      toast.success("Blog post added successfully!");
      reset();
      setCover(null);
      setPreview("");
      setCodeSnippets([]);
    } catch (error) {
      console.error("Error adding blog post:", error);
      toast.error("Failed to add blog post.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-6">
      <div className="w-full max-w-4xl p-8 bg-opacity-40 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          ✍️ Add New Blog Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm text-black mt-3">Title:</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Subtitle:</label>
          <input
            {...register("subtitle")}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Category:</label>
          <input
            {...register("category", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">
            Tags (comma-separated):
          </label>
          <input
            {...register("tags")}
            placeholder="e.g. JavaScript, React, Web Dev"
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Author:</label>
          <input
            {...register("author", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Publish Date:</label>
          <input
            type="date"
            {...register("publishDate", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">
            Read Time (e.g. "5 min"):
          </label>
          <input
            {...register("readTime", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Content:</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400 h-32"
          ></textarea>

          <label className="block text-sm text-black mt-3">
            Prerequisites (comma-separated):
          </label>
          <input
            {...register("prerequisites")}
            placeholder="e.g. Basic JavaScript, Node.js"
            className="w-full p-3 rounded-md border border-gray-600 text-black focus:ring-2 focus:ring-teal-400"
          />

          <label className="block text-sm text-black mt-3">Cover Image:</label>
          <div className="border border-gray-400 rounded-md p-4 flex flex-col items-center bg-gray-100">
            <input
              type="file"
              onChange={handleCoverUpload}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-blue-500 transition"
            >
              <FiUploadCloud className="text-4xl" />
              <span className="mt-2">Click to upload cover image</span>
            </label>
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-4 w-full max-h-40 object-cover rounded-md shadow-md"
              />
            )}
          </div>

          <label className="block text-sm text-black mt-3">
            Code Snippets:
          </label>
          {codeSnippets.map((snippet, index) => (
            <div key={index} className="border p-3 mb-2 text-black rounded-md">
              <input
                placeholder="Snippet Title"
                value={snippet.title}
                onChange={(e) =>
                  updateCodeSnippet(index, "title", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-600 rounded-md"
              />
              <textarea
                placeholder="Code"
                value={snippet.code}
                onChange={(e) =>
                  updateCodeSnippet(index, "code", e.target.value)
                }
                className="w-full p-2 mb-2 border border-gray-600  rounded-md"
              />
              <input
                placeholder="Language (e.g. JavaScript)"
                value={snippet.language}
                onChange={(e) =>
                  updateCodeSnippet(index, "language", e.target.value)
                }
                className="w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCodeSnippet}
            className="mt-2 text-blue-500"
          >
            + Add Snippet
          </button>

          <button
            type="submit"
            className="mt-6 bg-teal-500 text-black px-6 py-2 rounded-lg"
          >
            Add Blog Post
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default BlogForm;
