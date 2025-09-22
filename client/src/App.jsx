import { Routes, Route } from "react-router-dom";
import PlacementEssentials from "./pages/PlacementEssentials";
import TopicPage from "./pages/TopicPage";
import PlacementHome from "./pages/PlacementHome";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound"; // optional

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<PlacementHome />} />

    
      <Route path="/placementEssentials" element={<PlacementEssentials />} />

     
      <Route
        path="/placementEssentials/:tabName/:subTabName"
        element={<PlacementEssentials />}
      />

    
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName"
        element={<TopicPage />}
      />

      
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName/questions"
        element={<QuizPage />}
      />

     
      <Route
        path="/placementEssentials/:tabName/:subTabName/:topicName/quizQuestion"
        element={<QuizPage />}
      />

      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
