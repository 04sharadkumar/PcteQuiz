import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tabs, subTabs, topics } from "../data/placementData";
export default function PlacementEssentials() {
  const [activeTab, setActiveTab] = useState("Aptitude");
  const [activeSub, setActiveSub] = useState("Quantitative Aptitude");


  const navigate = useNavigate();

  



  useEffect(() => {
    if (activeTab && activeSub) {
      navigate(`/placementEssentials/${activeTab}/${activeSub}`, { replace: true });
    }
  }, [activeTab, activeSub, navigate]);

const handleTopicClick = (topic) => {
    navigate(`/placementEssentials/${activeTab}/${activeSub}/${topic}`, {
      state: { tab: activeTab, subTab: activeSub, topic },
    });
  };

  return (
   <div className="text-white py-12 px-4 sm:px-6 lg:px-12">
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
            className={`px-4 sm:px-6 py-2 text-base sm:text-lg font-medium transition-colors ${
              activeTab === tab
                ? "text-[#9B1C1C] border-b-2 border-[#9B1C1C]"
                : "text-gray-700 hover:text-[#9B1C1C]"
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
              className="w-full px-4 py-2 border rounded-md text-gray-900"
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
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeSub === sub
                    ? "bg-[#9B1C1C] text-white"
                    : "text-gray-900 border hover:bg-[#9B1C1C] hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Right Topics */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {topics[activeSub]?.map((topic) => (
            <div
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className="px-4 py-2 border text-gray-700 rounded-md cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition text-center"
            >
             {topic}
            </div>
          )) || (
            <p className="text-gray-400">Select a category to view topics</p>
          )}
        </div>
      </div>
    </div>
  );
}