import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ text = "All Topics" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/placementEssentials");
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-12 flex justify-center">
      <button
        onClick={handleClick}
        className="bg-[#9B1C1C] hover:bg-[#7A1414] transition-colors px-6 py-3 text-white font-medium rounded-2xl"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
