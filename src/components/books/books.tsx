import { useState } from "react";

const books = Array(175).fill(null); 

export default function BookList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  const filteredBooks = books.filter(() => true); 

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div className="p-6">
      {/* Search Bar */}
      <h2 className="text-3xl font-semibold mb-4">Books List</h2>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Type Student Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full max-w-lg rounded-l-md"
        />
        <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md">
          Search
        </button>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-4 gap-6">
        {currentBooks.map((_, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-md flex flex-col items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
              alt="Book Icon"
              className="w-16 h-16 mb-4"
            />
            <div className="h-4 w-32 bg-gray-200 mb-2 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="p-2 disabled:opacity-50"
        >
          ⬅️previous
        </button>
        <span>
          {booksPerPage * (currentPage - 1) + 1}-
          {Math.min(booksPerPage * currentPage, filteredBooks.length)} of{" "}
          {filteredBooks.length}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 disabled:opacity-50"
        >
          Next➡️
        </button>
      </div>
    </div>
  );
}
