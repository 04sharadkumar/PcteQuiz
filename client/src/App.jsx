import { Routes, Route } from "react-router-dom";
import PlacementEssentials from "./pages/PlacementEssentials";
import TopicPage from "./pages/TopicPage";
import PlacementHome from "./pages/PlacementHome";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<PlacementHome />} />

      {/* Placement Essentials with optional params */}
      <Route path="/placementEssentials" element={<PlacementEssentials />} />


      <Route
        path="/placementEssentials/:tabName/:subTabName"
        element={<PlacementEssentials />}
      />

      {/* Topic Page inside Placement Essentials */}
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName"
        element={<TopicPage />}
      />

      <Route
      path="/placementEssentials/:tabName/:subTabName/:topicName/quizQuestion"
      element={<QuizPage />}
      />

    </Routes>
  );
}

export default App;
