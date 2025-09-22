import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0); // track group of 5

  const { tabName, subTabName, topicName } = useParams();
  const topic = card?.topic || topicName;

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!tabName || !subTabName || !topicName) return;

        const res = await axios.get(
          `https://pctequiz.onrender.com/api/placement/${tabName}/${subTabName}/${topicName}/questions`
        );

        let fetched = res.data || [];
        fetched = fetched.sort(() => Math.random() - 0.5).slice(0, 25); // shuffle & max 25
        setQuestions(fetched);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [tabName, subTabName, topicName]);

  const handleChange = (qId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q) => {
      const selectedIndex = answers[q._id];
      if (selectedIndex !== undefined && q.options[selectedIndex] === q.answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">⏳ Loading questions...</p>;

  const startIndex = page * 5;
  const endIndex = startIndex + 5;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(questions.length / 5);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 border border-[#9B1C1C] text-[#9B1C1C] rounded hover:bg-[#9B1C1C] hover:text-white transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#9B1C1C]">{topic} Quiz</h1>
        <p className="mt-2 text-gray-600">
          Answer the questions below ({questions.length} total, showing 5 at a time)
        </p>
      </div>

      {/* Progress Bar */}
      {!submitted && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-[#9B1C1C] h-2 rounded-full transition-all"
            style={{
              width: `${((startIndex + currentQuestions.length) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      {!submitted ? (
        <>
          {currentQuestions.map((q, idx) => (
            <div
              key={q._id}
              className="bg-white p-6 rounded-lg shadow-md mb-6 border transition-all"
            >
              {/* Question Number Badge */}
              <div className="inline-block px-3 py-1 bg-[#9B1C1C] text-white rounded-full text-sm font-bold mb-2">
                Q{startIndex + idx + 1}
              </div>

              <h2 className="text-lg font-semibold mb-4">{q.question}</h2>
              <div className="space-y-2">
                {q.options.map((opt, index) => (
                  <label
                    key={index}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${
                      answers[q._id] === index
                        ? "bg-red-100 border border-[#9B1C1C]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${q._id}`}
                      value={index}
                      checked={answers[q._id] === index}
                      onChange={() => handleChange(q._id, index)}
                      className="text-[#9B1C1C]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ⬅ Previous
            </button>

            {page < totalPages - 1 ? (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-6 py-2 bg-[#9B1C1C] text-white rounded-lg hover:bg-red-800"
              >
                Next ➡
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Quiz ✅
              </button>
            )}
          </div>
        </>
      ) : (
        // Result
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3">🎉 Quiz Completed!</h2>

          {/* Score Circle */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="#9B1C1C"
                strokeWidth="8"
                fill="none"
                strokeDasharray="301.6"
                strokeDashoffset={301.6 - (score / questions.length) * 301.6}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {score}/{questions.length}
            </div>
          </div>

          <p className="text-lg mb-2">
            You scored{" "}
            <span className="font-bold text-[#9B1C1C]">
              {score} / {questions.length}
            </span>
          </p>
          <p className="mt-4 text-gray-600">
            {score === questions.length
              ? "Perfect Score! 🔥"
              : score > questions.length / 2
              ? "Well done! Keep practicing 💪"
              : "Don’t worry, try again and improve 📚"}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[#9B1C1C] text-white rounded-lg hover:bg-red-800 transition"
          >
            Back to Topic
          </button>
        </div>
      )}
    </div>
  );
}
