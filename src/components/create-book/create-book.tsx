import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";

const BookForm = () => {
  const { register, handleSubmit, reset } = useForm<BookFormData>();
  const [cover, setCover] = useState("");

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCover(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

interface BookFormData {
    id: string;
    isbn: string;
    title: string;
    author: string;
    quantity: number;
    price: string;
    publisher: string;
    dateReceived: string;
    description: string;
}

const onSubmit = (data: BookFormData) => {
    console.log("Book Data:", { ...data, cover });
    reset();
    setCover("");
};

  return (
    <div className="flex items-center justify-center min-h-screen  text-white p-6">
      <div className="w-full max-w-4xl p-8 bg-opacity-40 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">📚 Add New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-black mb-1">ID:</label>
              <input {...register("id")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">ISBN:</label>
              <input {...register("isbn")} required className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">Title:</label>
              <input {...register("title")} required className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">Author:</label>
              <input {...register("author")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
            </div>
            <div>
              <label className="block text-sm text-black  mb-1">Quantity:</label>
              <input type="number" {...register("quantity")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">Price:</label>
              <input {...register("price")} required className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">Publisher:</label>
              <input {...register("publisher")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
              
              <label className="block text-sm text-black  mt-3">Date Received:</label>
              <input type="date" {...register("dateReceived")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400" />
            </div>
          </div>

          <label className="block text-sm text-black  mt-3">Description:</label>
          <textarea {...register("description")} className="w-full p-3 rounded-md  border border-gray-600 text-black focus:ring-2 focus:ring-teal-400 h-24"></textarea>
          
          <label className="block text-sm text-black  mt-3">Cover:</label>
          <div className="flex items-center justify-center border border-dashed border-gray-500 rounded-lg p-6 hover:bg-gray-800">
            <input type="file" onChange={handleCoverUpload} className="hidden" id="upload-cover" />
            <label htmlFor="upload-cover" className="cursor-pointer flex flex-col items-center text-gray-400">
              <FiUploadCloud className="text-4xl" />
              <span className="mt-2">Upload Cover</span>
            </label>
          </div>

          {cover && <img src={cover} alt="Cover Preview" className="w-auto h-40 mt-4 mx-auto object-cover rounded-lg shadow-lg" />}

          <div className="flex justify-between mt-6">
            <button type="submit" className="px-6 py-2 rounded-lg bg-teal-500 text-black font-semibold tracking-wide shadow-md transition-all hover:bg-teal-400">
              Add Book
            </button>
            <button type="button" onClick={() => { reset(); setCover(""); }} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold tracking-wide shadow-md transition-all hover:bg-red-400">
              Clear Fields
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
