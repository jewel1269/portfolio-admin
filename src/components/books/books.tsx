import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../../redux/features/api/api-slice";
import { Link } from "react-router";

export default function BookList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Fetch books from API
  const { data, error, isLoading, refetch } = useGetBooksQuery();

  // Call refetch to refresh the data
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books!</p>;

  const books = data?.data || [];

  interface Book {
    _id: string;
    title: string;
    author: string;
    cover?: string;
    availableCopies: number;
    borrowedCount: number;
    dateReceived: string;
    description: string;
    isbn: string;
    price: string;
    publisher: string;
    quantity: number;
  }

  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
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
          placeholder="Search Book Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full max-w-lg rounded-l-md"
        />
        <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md">
          Search
        </button>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-5 gap-6">
        {currentBooks.map((book: Book) => (
          <div
            key={book._id}
            className="border-r border-l border-b  rounded-lg shadow-lg bg-white flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <img
              src={
                book.cover ||
                "https://cdn-icons-png.flaticon.com/512/29/29302.png"
              }
              alt={book.title}
              className="w-full h-42 bg-cover rounded-md mb-4"
            />
            <div className="flex flex-col flex-grow p-3">
              <h3 className="text-lg  text-gray-900"><strong>Name: </strong> {book.title}</h3>
              <p className="text-gray-700"><strong>By: </strong> {book.author}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Publisher: </strong> {book.publisher}
              </p>
              <p className="text-sm text-gray-500"><strong>ISBN: </strong>{book.isbn}</p>
              <p className="text-sm text-gray-500"><strong>Price: </strong> {book.price} BTD</p>
              <p className="text-sm text-gray-500">
                <strong>Available: </strong> {book.availableCopies}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Borrowed: </strong> {book.borrowedCount}
              </p>
            </div>
           <Link to={`/dashboard/books/${book._id}`}>
           <button
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md w-full hover:bg-teal-600"
              
            >
              View Details
            </button>
           </Link>
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
          ⬅️ Previous
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
          Next ➡️
        </button>
      </div>
    </div>
  );
}
