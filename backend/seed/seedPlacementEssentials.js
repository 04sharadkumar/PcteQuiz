// seedPlacementEssentials.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import PlacementEssential from "../models/PlacementEssential.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const seedPlacementEssentials = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected for seeding...");

    // Seed data matching your React tabs/subTabs/topics
    const seedData = [
      {
        tabName: "Aptitude",
        subTabs: [
          {
            subTabName: "Quantitative Aptitude",
            topics: [
              { topicName: "Ages", questions: [] },
              { topicName: "Arithmetic Progression", questions: [] },
              { topicName: "Average", questions: [] },
              { topicName: "Boats and Streams", questions: [] },
              { topicName: "Chain Rule", questions: [] },
              { topicName: "Circles", questions: [] },
              { topicName: "Compound Interest", questions: [] },
              { topicName: "Coordinate Geometry", questions: [] },
              { topicName: "Geometric Progression", questions: [] },
              { topicName: "HCF and LCM", questions: [] },
              { topicName: "Height and Distance", questions: [] },
              { topicName: "Logarithm", questions: [] },
              { topicName: "Mixture and Alligation", questions: [] },
              { topicName: "Number System", questions: [] },
              { topicName: "Partnership", questions: [] },
              { topicName: "Percentage", questions: [] },
              { topicName: "Permutations and Combinations", questions: [] },
              { topicName: "Pipes and Cistern", questions: [] },
              { topicName: "Probability", questions: [] },
              { topicName: "Problems on Trains", questions: [] },
              { topicName: "Profit and Loss", questions: [] },
              { topicName: "Races and Games", questions: [] },
              { topicName: "Ratio and Proportion", questions: [] },
              { topicName: "Simple Interest", questions: [] },
            ],
          },
          {
            subTabName: "Data Interpretation",
            topics: [
              { topicName: "Bar Graphs", questions: [] },
              { topicName: "Line Graphs", questions: [] },
              { topicName: "Pie Charts", questions: [] },
              { topicName: "Tabulation", questions: [] },
              { topicName: "Caselets", questions: [] },
            ],
          },
          {
            subTabName: "Logical Reasoning",
            topics: [
              { topicName: "Analyzing Arguments", questions: [] },
              { topicName: "Calendar", questions: [] },
              { topicName: "Cause and Effect", questions: [] },
              { topicName: "Clock", questions: [] },
              { topicName: "Course of Action", questions: [] },
              { topicName: "Letter and Symbol Series", questions: [] },
              { topicName: "Logical Problems", questions: [] },
              { topicName: "Making Judgments", questions: [] },
              { topicName: "Number Series", questions: [] },
              { topicName: "Odd Man Out", questions: [] },
              { topicName: "Order and Ranking", questions: [] },
              { topicName: "Series Completion", questions: [] },
              { topicName: "Statement and Argument", questions: [] },
              { topicName: "Statement and Assumption", questions: [] },
              { topicName: "Statement and Conclusion", questions: [] },
              { topicName: "Theme Detection", questions: [] },
            ],
          },
          {
            subTabName: "Verbal Reasoning",
            topics: [
              { topicName: "Analogy", questions: [] },
              { topicName: "Blood Relation", questions: [] },
              { topicName: "Coding and Decoding", questions: [] },
              { topicName: "Cube and Cuboid", questions: [] },
              { topicName: "Data Sufficiency", questions: [] },
              { topicName: "Dice", questions: [] },
              { topicName: "Direction Sense", questions: [] },
              { topicName: "Logical Sequence of Words", questions: [] },
              { topicName: "Seating Arrangement", questions: [] },
              { topicName: "Syllogism", questions: [] },
              { topicName: "Venn Diagrams", questions: [] },
            ],
          },
          {
            subTabName: "Non Verbal Reasoning",
            topics: [
              { topicName: "Analogy", questions: [] },
              { topicName: "Counting of Figures", questions: [] },
              { topicName: "Figure Matrix", questions: [] },
              { topicName: "Pattern Completion", questions: [] },
              { topicName: "Series", questions: [] },
              { topicName: "Mirror Images", questions: [] },
              { topicName: "Water Images", questions: [] },
              { topicName: "Paper Folding", questions: [] },
              { topicName: "Paper Cutting", questions: [] },
              { topicName: "Embedded Figures", questions: [] },
              { topicName: "Figure Classification", questions: [] },
              { topicName: "Figure Formation", questions: [] },
              { topicName: "Cubes and Dice", questions: [] },
              { topicName: "Dot Situation", questions: [] },
            ],
          },
          {
            subTabName: "Verbal Ability",
            topics: [
              { topicName: "Antonyms", questions: [] },
              { topicName: "Change of Speech", questions: [] },
              { topicName: "Change of Voice", questions: [] },
              { topicName: "Cloze Test", questions: [] },
              { topicName: "Completing Statements", questions: [] },
              { topicName: "Error Spotting", questions: [] },
              { topicName: "Idioms and Phrases", questions: [] },
              { topicName: "One Word Substitutes", questions: [] },
              { topicName: "Ordering of Sentences", questions: [] },
              { topicName: "Paragraph Formation", questions: [] },
              { topicName: "Reading Comprehension", questions: [] },
              { topicName: "Selecting Words", questions: [] },
              { topicName: "Sentence Correction", questions: [] },
              { topicName: "Sentence Formation", questions: [] },
              { topicName: "Sentence Improvement", questions: [] },
              { topicName: "Spellings", questions: [] },
              { topicName: "Synonyms", questions: [] },
              { topicName: "Verbal Analogies", questions: [] },
            ],
          },
        ],
      },
      {
        tabName: "Programming",
        subTabs: [
          {
            subTabName: "C",
            topics: [
              { topicName: "Introduction to C", questions: [] },
              { topicName: "Data Types", questions: [] },
              { topicName: "Operators", questions: [] },
              { topicName: "Input/Output", questions: [] },
              { topicName: "Control Statements", questions: [] },
              { topicName: "Loops", questions: [] },
            ],
          },
          {
            subTabName: "C++",
            topics: [
              { topicName: "Introduction to C++", questions: [] },
              { topicName: "Data Types", questions: [] },
              { topicName: "Operators", questions: [] },
              { topicName: "Control Statements", questions: [] },
              { topicName: "Loops", questions: [] },
            ],
          },
          {
            subTabName: "Java",
            topics: [
              { topicName: "Introduction to Java", questions: [] },
              { topicName: "Data Types", questions: [] },
            ],
          },
          {
            subTabName: "Python",
            topics: [
              { topicName: "Introduction to Python", questions: [] },
              { topicName: "Data Types", questions: [] },
            ],
          },
        ],
      },
      {
        tabName: "CompanySpecific",
        subTabs: [
          { subTabName: "Tech Mutant", topics: [] },
          { subTabName: "Websphere", topics: [] },
          { subTabName: "Tekki", topics: [] },
        ],
      },
      {
        tabName: "Resources",
        subTabs: [
          { subTabName: "Interview Tips", topics: [] },
          { subTabName: "Resume Prep", topics: [] },
          { subTabName: "Mock Tests", topics: [] },
        ],
      },
    ];

    // Clear previous data
    await PlacementEssential.deleteMany({});

    // Insert new seed data
    await PlacementEssential.insertMany(seedData);

    console.log("Placement Essentials seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

// Run the seeding function
seedPlacementEssentials();
