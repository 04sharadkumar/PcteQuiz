// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function TopicPage() {
//   const { tabName, subTabName, topicName } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // New question form
//   const [newQuestion, setNewQuestion] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//   });

//   // ✅ Fetch questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/placement-essentials/${tabName}/${subTabName}/${topicName}/questions`
//         );
//         setQuestions(res.data.questions || []);
//       } catch (err) {
//         console.error("Error fetching questions", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, [tabName, subTabName, topicName]);

//   // ✅ Handle posting new question
//   const handleAddQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/placement-essentials/${tabName}/${subTabName}/${topicName}/question`,
//         newQuestion
//       );
//       setQuestions([...questions, res.data]); // push new question
//       setNewQuestion({ question: "", options: ["", "", "", ""], answer: "" });
//     } catch (err) {
//       console.error("Error adding question", err);
//     }
//   };

//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="p-6 text-gray-900">
//       <h2 className="text-2xl font-bold mb-4">
//         {topicName} Questions
//       </h2>

//       {/* ✅ Display Questions */}
//       <div className="space-y-4">
//         {questions.length > 0 ? (
//           questions.map((q, idx) => (
//             <div key={idx} className="border p-4 rounded-lg shadow">
//               <p className="font-medium">{q.question}</p>
//               <ul className="mt-2 space-y-1">
//                 {q.options.map((opt, i) => (
//                   <li
//                     key={i}
//                     className={`p-2 rounded border ${
//                       q.answer === opt
//                         ? "bg-green-100 border-green-500"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {opt}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p>No questions found for this topic.</p>
//         )}
//       </div>

//       {/* ✅ Add Question Form */}
//       <form onSubmit={handleAddQuestion} className="mt-8 space-y-4">
//         <h3 className="text-lg font-semibold">Add New Question</h3>
//         <input
//           type="text"
//           placeholder="Question"
//           value={newQuestion.question}
//           onChange={(e) =>
//             setNewQuestion({ ...newQuestion, question: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         {newQuestion.options.map((opt, i) => (
//           <input
//             key={i}
//             type="text"
//             placeholder={`Option ${i + 1}`}
//             value={opt}
//             onChange={(e) => {
//               const opts = [...newQuestion.options];
//               opts[i] = e.target.value;
//               setNewQuestion({ ...newQuestion, options: opts });
//             }}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         ))}

//         <input
//           type="text"
//           placeholder="Correct Answer"
//           value={newQuestion.answer}
//           onChange={(e) =>
//             setNewQuestion({ ...newQuestion, answer: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-[#9B1C1C] text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Add Question
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function TopicPage() {
  const { topic } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const topicName = location.state?.topic || topic;

  const [activeTab, setActiveTab] = useState("Quizzes");

  const tabs = ["Quizzes"];

  // Handle quiz start
  const startQuiz = () => {
  
  const currentPath = location.pathname;

 
  navigate(`${currentPath}/quizQuestion`, {
    state: { card: { topic: topicName } },
  });
};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border mb-6 text-center">
        <h1 className="text-3xl font-bold text-[#9B1C1C]">{topicName}</h1>
        <p className="mt-2 text-gray-600">
          Explore <b>{topicName}</b> with quizzes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === tab
                ? "bg-[#9B1C1C] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "Quizzes" && (
          <>
            <div className="p-5 bg-white shadow-md rounded-xl border hover:shadow-lg transition">
              <h2 className="text-lg font-bold text-gray-800">{topicName} Quiz</h2>
              <p className="text-gray-600 mt-2">
                Practice questions on {topicName}.
              </p>
              <button
                onClick={() => startQuiz("")}
                className="mt-4 px-4 py-2 bg-[#9B1C1C] text-white rounded-lg hover:bg-red-800"
              >
                Start Quiz
              </button>
            </div>

         
          </>
        )}

        {/* {activeTab === "Notes" && (
          <div className="p-5 bg-white shadow-md rounded-xl border hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-800">Quick Notes</h2>
            <p className="text-gray-600 mt-2">
              Summary notes for {topicName}.
            </p>
            <button className="mt-4 px-4 py-2 border border-[#9B1C1C] text-[#9B1C1C] rounded-lg hover:bg-[#9B1C1C] hover:text-white transition">
              View Notes
            </button>
          </div>
        )} */}

        {/* {activeTab === "Study Material" && (
          <div className="p-5 bg-white shadow-md rounded-xl border hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-800">PDF Material</h2>
            <p className="text-gray-600 mt-2">
              Downloadable study resource for {topicName}.
            </p>
            <button className="mt-4 px-4 py-2 bg-[#9B1C1C] text-white rounded-lg hover:bg-red-800">
              Download
            </button>
          </div>
        )} */}
      </div>
    </div>

  );
}
