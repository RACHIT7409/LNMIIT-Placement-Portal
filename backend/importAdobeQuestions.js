const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Company = require("./models/Company");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const csvFilePath = path.join(__dirname, "data", "adobe_alltime.csv");

// Change this if you want a different logo
const adobeLogo =
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_wordmark.svg";

const questions = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    questions.push({
      title: row["Title"]?.trim() || "",
      difficulty: row["Difficulty"]?.trim() || "",
      topic: "", // CSV does not contain topic
      problemLink: row["Leetcode Question Link"]?.trim() || "",
    });
  })
  .on("end", async () => {
    try {
      const cleanedQuestions = questions.filter(
        (q) => q.title && q.problemLink
      );

      const companyData = {
        name: "Adobe",
        logo: adobeLogo,
        questions: cleanedQuestions,
      };

      // Upsert: update if Adobe exists, otherwise create
      const result = await Company.findOneAndUpdate(
        { name: "Adobe" },
        companyData,
        { new: true, upsert: true }
      );

      console.log(`Imported Adobe successfully.`);
      console.log(`Total questions saved: ${result.questions.length}`);

      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error("Import error:", error.message);
      await mongoose.connection.close();
      process.exit(1);
    }
  })
  .on("error", async (error) => {
    console.error("CSV read error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  });