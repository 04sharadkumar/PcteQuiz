import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const topicSchema = new mongoose.Schema({
  topicName: { type: String, required: true },
  questions: [questionSchema]
});

const subTabSchema = new mongoose.Schema({
  subTabName: { type: String, required: true },
  topics: [topicSchema]
});

const tabSchema = new mongoose.Schema({
  tabName: { type: String, required: true },
  subTabs: [subTabSchema]
});

const PlacementEssential = mongoose.model("PlacementEssential", tabSchema);


export default PlacementEssential;
