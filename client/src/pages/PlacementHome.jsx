"use client";
import { useEffect } from "react";
import Button from "../components/Button";
import SearchBar from '../components/SearchBar'

export default function PlacementHome() {
 

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-white">
      {/* Background Grid + Gradient */}
     

      {/* Tagline */}
      <h1 className="text-3xl md:text-5xl font-bold text-center z-10 animate-fadeIn">
        <span className="text-[#9B1C1C]">Your Placement Journey,</span>{" "}
        <span className="text-gray-700">With PCTE</span>
      </h1>

      {/* Sub Tagline */}
      <p className="mt-4 text-gray-700 text-center text-lg md:text-xl z-10 animate-fadeIn delay-200">
        Practice, Prepare & Perform – all in one place 🚀
      </p>

      {/* Search Bar */}
     

      {/* Glowing Brain Image */}
      <div className="mt-14 z-10 animate-float  ">
        <img
          src="/images.png"
          alt="Glowing Brain"
          className="max-w-[400px] md:max-w-[520px] drop-shadow-[0_0_35px_rgba(155,28,28,0.8)] rounded-4xl"
        />
      </div>
       <div className="mt-8">
        <SearchBar />
      </div>
      <div className="mt-12">
      <Button />
      </div>

      
    </div>
  );
}

/* Extra animations */
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}
.animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
.animate-float { animation: float 4s ease-in-out infinite; }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
