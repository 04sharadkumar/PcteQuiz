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
    const { tab, subTab, topic } = req.params;
    let { question, options, answer, questions } = req.body;

    const placement = await PlacementEssential.findOne({ tabName: tab });
    if (!placement) return res.status(404).json({ error: "Tab not found" });

    const sub = placement.subTabs.find((s) => s.subTabName === subTab);
    if (!sub) return res.status(404).json({ error: "SubTab not found" });

    const topicObj = sub.topics.find((t) => t.topicName === topic);
    if (!topicObj) return res.status(404).json({ error: "Topic not found" });

    // ✅ Handle multiple or single
    if (Array.isArray(questions) && questions.length > 0) {
      // multiple questions at once
      questions.forEach((q) => {
        if (q.question && q.options && q.answer !== undefined) {
          topicObj.questions.push(q);
        }
      });
    } else if (question && options && answer !== undefined) {
      // single question
      topicObj.questions.push({ question, options, answer });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid data format. Provide a question or questions array." });
    }

    await placement.save();

    res.json({ message: "Question(s) added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get questions
export const getQuestions = async (req, res) => {
  try {
    const { tab, subTab, topic } = req.params;

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
