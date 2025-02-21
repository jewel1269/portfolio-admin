import React from "react";
import { useParams } from "react-router-dom";
import { useGetBooksQuery } from "../../../redux/features/api/api-slice";

interface BookInfoCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  author: string;
  rating: number;
  reviews: number;
  description: string;
  publisher: string;
  publishDate: string;
  isbn: string;
  language: string;
  pages: number;
}

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetBooksQuery();
  console.log(data?.data);

  const bookData = data?.data?.find((book: any) => book._id === id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  if (!bookData) {
    return <div>No book found with this ID</div>;
  }

  // Map bookData to BookInfoCardProps
  const book: BookInfoCardProps = {
    imageUrl: bookData.cover,
    title: bookData.title,
    subtitle: bookData.subtitle || "No Subtitle",
    author: bookData.author,
    rating: bookData.rating || 4.5,
    reviews: bookData.reviews || 1000,
    description: bookData.description,
    publisher: bookData.publisher,
    publishDate: bookData.dateReceived,
    isbn: bookData.isbn,
    language: bookData.language,
    pages: bookData.pages,
  };

  return (
    <div className="flex flex-col md:flex-row lg:border min-h-screen  bg-white rounded-2xl shadow-lg p-6 gap-6">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
        <h3 className="text-lg text-orange-600 mt-1">{book.subtitle}</h3>
        <p className="text-gray-600 mt-2">by {book.author}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500">
            {"★".repeat(Math.round(book.rating))}
          </span>
          <span className="text-gray-500">({book.reviews} reviews)</span>
        </div>
        <p className="text-gray-700 mt-4">{book.description}</p>
        <ul className="mt-4 text-sm text-gray-600 space-y-1">
          <li>
            <strong>Publisher:</strong> {book.publisher}
          </li>
          <li>
            <strong>Published:</strong> {book.publishDate}
          </li>
          <li>
            <strong>ISBN:</strong> {book.isbn}
          </li>
          <li>
            <strong>Language:</strong> {book.language}
          </li>
          <li>
            <strong>Pages:</strong> {book.pages}p
          </li>
        </ul>
        <button className="mt-6 bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600 transition">
          Upadte 
        </button>
        <button
          onClick={refetch}
          className="mt-4 ml-4 bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
