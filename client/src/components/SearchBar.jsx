import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tabs, subTabs, topics } from "../data/placementData";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    let matches = [];
    tabs.forEach((tab) => {
      subTabs[tab]?.forEach((sub) => {
        topics[sub]?.forEach((topic) => {
          if (topic.toLowerCase().includes(value)) {
            matches.push({ tab, sub, topic });
          }
        });
      });
    });

    setResults(matches);
  };

  const handleSelect = (item) => {
    navigate(`/placementEssentials/${item.tab}/${item.sub}/${item.topic}`, {
      state: item,
    });
    setQuery("");
    setResults([]);
  };

  // highlight matched text
  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query ? (
        <span key={i} className="text-[#9B1C1C] font-semibold underline">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // ✅ Press Enter → go to first match
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto"> {/* wider search bar */}
      {/* Search Input */}
      <div className="flex items-center px-5 py-4 rounded-2xl bg-white border border-gray-300 shadow-sm focus-within:shadow-lg transition w-full">
        <Search className="w-6 h-6 text-gray-500 mr-3" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}  // ✅ enter key handler
          placeholder="Search placement topics..."
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-lg"
        />
      </div>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-72 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {results.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-5 py-3 hover:bg-[#9B1C1C]/10 cursor-pointer transition flex justify-between items-center"
              >
                <div className="font-medium text-gray-900">
                  {highlightMatch(item.topic)}
                </div>
                <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                  {item.tab} → {item.sub}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results */}
      {query && results.length === 0 && (
        <div className="absolute left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg px-5 py-4 text-gray-500 text-center text-sm animate-fadeIn">
          No results found 🚫
        </div>
      )}
    </div>
  );
}
