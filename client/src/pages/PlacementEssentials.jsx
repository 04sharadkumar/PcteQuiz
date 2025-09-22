import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { tabs, subTabs, topics } from "../data/placementData";

export default function PlacementEssentials() {
  const [activeTab, setActiveTab] = useState("Aptitude");
  const [activeSub, setActiveSub] = useState("Quantitative Aptitude");
  const [search, setSearch] = useState("");
  const [completedTopics, setCompletedTopics] = useState(
    JSON.parse(localStorage.getItem("completedTopics")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab && activeSub) {
      navigate(`/placementEssentials/${activeTab}/${activeSub}`, {
        replace: true,
      });
    }
  }, [activeTab, activeSub, navigate]);

  const handleTopicClick = (topic) => {
    navigate(`/placementEssentials/${activeTab}/${activeSub}/${topic}`, {
      state: { tab: activeTab, subTab: activeSub, topic },
    });
  };

  const toggleCompleted = (topic) => {
    let updated;
    if (completedTopics.includes(topic)) {
      updated = completedTopics.filter((t) => t !== topic);
    } else {
      updated = [...completedTopics, topic];
    }
    setCompletedTopics(updated);
    localStorage.setItem("completedTopics", JSON.stringify(updated));
  };

  return (
    <div className="text-gray-900 py-12 px-4 sm:px-6 lg:px-12 bg-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 border border-[#9B1C1C] text-[#9B1C1C] rounded-full hover:bg-[#9B1C1C] hover:text-white transition"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-[#9B1C1C]">
        Placement Essentials
      </h2>
      <p className="text-gray-700 text-center mt-2 text-base sm:text-lg md:text-xl">
        Start preparing with our unique features <br />
        a process designed to help you land a job at top companies!
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mt-8 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveSub(subTabs[tab][0]);
            }}
            className={`px-4 sm:px-6 py-2 text-base sm:text-lg font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "text-[#9B1C1C] border-[#9B1C1C]"
                : "text-gray-600 border-transparent hover:text-[#9B1C1C]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row mt-10 gap-6">
        {/* Left Sub Tabs */}
        <div className="md:w-60 w-full">
          {/* On small screens -> dropdown */}
          <div className="md:hidden mb-4">
            <select
              value={activeSub}
              onChange={(e) => setActiveSub(e.target.value)}
              className="w-full px-4 py-2 border border-[#9B1C1C] rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C1C]"
            >
              {subTabs[activeTab]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* On medium+ screens -> sidebar buttons */}
          <div className="hidden md:flex flex-col gap-2">
            {subTabs[activeTab]?.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`w-full text-left px-4 py-2 rounded-md transition-all ${
                  activeSub === sub
                    ? "bg-[#9B1C1C] text-white shadow-md"
                    : "text-gray-700 border border-gray-300 hover:bg-[#9B1C1C] hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Right Topics */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#9B1C1C] rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9B1C1C]"
            />
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics[activeSub]
              ?.filter((topic) =>
                topic.toLowerCase().includes(search.toLowerCase())
              )
              .map((topic) => (
                <div
                  key={topic}
                  className={`p-4 border rounded-lg cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg ${
                    completedTopics.includes(topic)
                      ? "bg-green-100 border-green-300"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div
                    onClick={() => handleTopicClick(topic)}
                    className="font-semibold text-center text-gray-800 mb-2"
                  >
                    {topic}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompleted(topic);
                    }}
                    className={`w-full text-xs py-1 rounded-md ${
                      completedTopics.includes(topic)
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-[#FDE8E8] text-[#9B1C1C] hover:bg-[#9B1C1C] hover:text-white"
                    } transition`}
                  >
                    {completedTopics.includes(topic)
                      ? "✅ Completed"
                      : "Mark Done"}
                  </button>
                </div>
              )) || (
              <p className="text-gray-400 text-center mt-6">
                Select a category to view topics
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
