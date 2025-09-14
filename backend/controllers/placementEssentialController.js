import PlacementEssential from "../models/PlacementEssential.js";

// Add question

// export const addQuestion = async (req, res) => {
//   try {
//     const { tab, subTab, topic } = req.params;
//     const { question, options, answer } = req.body;

//     const placement = await PlacementEssential.findOne({ tabName: tab });
//     if (!placement) return res.status(404).json({ error: "Tab not found" });

//     const sub = placement.subTabs.find(s => s.subTabName === subTab);
//     if (!sub) return res.status(404).json({ error: "SubTab not found" });

//     const topicObj = sub.topics.find(t => t.topicName === topic);
//     if (!topicObj) return res.status(404).json({ error: "Topic not found" });

//     topicObj.questions.push({ question, options, answer });
//     await placement.save();

//     res.json({ message: "Question added successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


//add multiple question

export const addQuestion = async (req, res) => {
  try {
    // ✅ Decode URL parameters in case they have spaces or special characters
    const tab = decodeURIComponent(req.params.tab);
    const subTab = decodeURIComponent(req.params.subTab);
    const topic = decodeURIComponent(req.params.topic);

    // ✅ Support both single question and bulk
    const { question, options, answer, questions } = req.body;

    // 🧠 Validate data shape
    if (
      (!question || !options || answer === undefined) &&
      (!Array.isArray(questions) || questions.length === 0)
    ) {
      return res.status(400).json({
        error: "Provide either a single question (question, options, answer) or a valid 'questions' array.",
      });
    }

    // ✅ Find the tab
    const placement = await PlacementEssential.findOne({ tabName: tab });
    if (!placement) return res.status(404).json({ error: "Tab not found" });

    // ✅ Find sub-tab
    const sub = placement.subTabs.find((s) => s.subTabName === subTab);
    if (!sub) return res.status(404).json({ error: "SubTab not found" });

    // ✅ Find topic
    const topicObj = sub.topics.find((t) => t.topicName === topic);
    if (!topicObj) return res.status(404).json({ error: "Topic not found" });

    // ✅ Add questions (either one or many)
    if (Array.isArray(questions) && questions.length > 0) {
      questions.forEach((q) => {
        if (q.question && q.options && q.answer !== undefined) {
          topicObj.questions.push(q);
        }
      });
    } else {
      topicObj.questions.push({ question, options, answer });
    }

    // ✅ Save
    await placement.save();

    res.status(201).json({ message: "Question(s) added successfully" });
  } catch (err) {
    console.error("❌ Error adding question:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};



// Get questions
export const getQuestions = async (req, res) => {
  try {
    // ✅ Decode URI components
    const tab = decodeURIComponent(req.params.tab);
    const subTab = decodeURIComponent(req.params.subTab);
    const topic = decodeURIComponent(req.params.topic);

    const placement = await PlacementEssential.findOne({ tabName: tab });
    if (!placement) return res.status(404).json({ error: "Tab not found" });

    const sub = placement.subTabs.find(s => s.subTabName === subTab);
    if (!sub) return res.status(404).json({ error: "SubTab not found" });

    const topicObj = sub.topics.find(t => t.topicName === topic);
    if (!topicObj) return res.status(404).json({ error: "Topic not found" });

    res.json(topicObj.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};