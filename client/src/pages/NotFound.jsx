import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#9B1C1C]">
        404 – Page Not Found
      </h1>

      {/* Message */}
      <p className="mt-4 text-gray-700 text-lg md:text-xl">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Image */}
     

      {/* Back Button */}
      <Link to="/" className="mt-10">
        <button className="px-6 py-3 bg-[#9B1C1C] text-white rounded-md shadow-md hover:bg-[#7f1616] transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
