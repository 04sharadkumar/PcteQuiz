import { Routes, Route } from "react-router-dom";
import PlacementEssentials from "./pages/PlacementEssentials";
import TopicPage from "./pages/TopicPage";
import PlacementHome from "./pages/PlacementHome";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound"; // optional

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<PlacementHome />} />

      {/* Main placement page */}
      <Route path="/placementEssentials" element={<PlacementEssentials />} />

      {/* Sub-tab page */}
      <Route
        path="/placementEssentials/:tabName/:subTabName"
        element={<PlacementEssentials />}
      />

      {/* Topic page */}
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName"
        element={<TopicPage />}
      />

      {/* ✅ Quiz page with /questions */}
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName/questions"
        element={<QuizPage />}
      />

      {/* (Optional) Quiz page with /quizQuestion (if you still use it) */}
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName/quizQuestion"
        element={<QuizPage />}
      />

      {/* Optional 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
