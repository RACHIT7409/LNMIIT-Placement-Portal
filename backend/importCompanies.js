const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Company = require("./models/Company");

// -----------------------------
// CONFIG
// -----------------------------
const DATA_FOLDER = path.join(__dirname, "data");

// Add all CSV filenames you want to import here
const FILES_TO_IMPORT = [
"accolite_alltime.csv",
"adobe_alltime.csv",
"aetion_alltime.csv",
"affinity_alltime.csv",
"affirm_alltime.csv",
"airbnb_alltime.csv",
"airtel_alltime.csv",
"akamai_alltime.csv",
"akuna-capital_alltime.csv",
"alation_alltime.csv",
"alibaba_alltime.csv",
"amazon_alltime.csv",
"american-express_alltime.csv",
"appdynamics_alltime.csv",
"apple_alltime.csv",
"arista-networks_alltime.csv",
"asana_alltime.csv",
"atlassian_alltime.csv",
"audible_alltime.csv",
"baidu_alltime.csv",
"barclays_alltime.csv",
"blackrock_alltime.csv",
"bloomberg_alltime.csv",
"bookingcom_alltime.csv",
"box_alltime.csv",
"bytedance_alltime.csv",
"c3-iot_alltime.csv",
"c3ai_alltime.csv",
"capital-one_alltime.csv",
"cisco_alltime.csv",
"citadel_alltime.csv",
"citrix_alltime.csv",
"cloudera_alltime.csv",
"cohesity_alltime.csv",
"coupang_alltime.csv",
"coursera_alltime.csv",
"cruise-automation_alltime.csv",
"databricks_alltime.csv",
"dataminr_alltime.csv",
"de-shaw_alltime.csv",
"dell_alltime.csv",
"deutsche-bank_alltime.csv",
"didi_alltime.csv",
"docusign_alltime.csv",
"doordash_alltime.csv",
"drawbridge_alltime.csv",
"dropbox_alltime.csv",
"druva_alltime.csv",
"ebay_alltime.csv",
"electronic-arts_alltime.csv",
"epic-systems_alltime.csv",
"evernote_alltime.csv",
"expedia_alltime.csv",
"facebook_alltime.csv",
"factset_alltime.csv",
"flipkart_alltime.csv",
"forusall_alltime.csv",
"garena_alltime.csv",
"ge-digital_alltime.csv",
"godaddy_alltime.csv",
"goldman-sachs_alltime.csv",
"google_alltime.csv",
"grab_alltime.csv",
"groupon_alltime.csv",
"hbo_alltime.csv",
"houzz_alltime.csv",
"huawei_alltime.csv",
"hulu_alltime.csv",
"ibm_alltime.csv",
"indeed_alltime.csv",
"infosys_alltime.csv",
"intel_alltime.csv",
"intuit_alltime.csv",
"ixl_alltime.csv",
"jpmorgan_alltime.csv",
"karat_alltime.csv",
"linkedin_alltime.csv",
"liveramp_alltime.csv",
"lyft_alltime.csv",
"mathworks_alltime.csv",
"medianet_alltime.csv",
"meituan_alltime.csv",
"microsoft_alltime.csv",
"morgan-stanley_alltime.csv",
"netease_alltime.csv",
"netflix_alltime.csv",
"netsuite_alltime.csv",
"nutanix_alltime.csv",
"nvidia_alltime.csv",
"opendoor_alltime.csv",
"oracle_alltime.csv",
"palantir-technologies_alltime.csv",
"paypal_alltime.csv",
"pinterest_alltime.csv",
"pocket-gems_alltime.csv",
"ponyai_alltime.csv",
"postmates_alltime.csv",
"pure-storage_alltime.csv",
"qualcomm_alltime.csv",
"qualtrics_alltime.csv",
"quip_alltime.csv",
"quora_alltime.csv",
"radius_alltime.csv",
"reddit_alltime.csv",
"redfin_alltime.csv",
"riot-games_alltime.csv",
"robinhood_alltime.csv",
"roblox_alltime.csv",
"rubrik_alltime.csv",
"salesforce_alltime.csv",
"samsung_alltime.csv",
"sap_alltime.csv",
"servicenow_alltime.csv",
"snapchat_alltime.csv",
"splunk_alltime.csv",
"spotify_alltime.csv",
"square_alltime.csv",
"sumologic_alltime.csv",
"tableau_alltime.csv",
"tencent_alltime.csv",
"tesla_alltime.csv",
"tripadvisor_alltime.csv",
"triplebyte_alltime.csv",
"twilio_alltime.csv",
"twitch_alltime.csv",
"twitter_alltime.csv",
"two-sigma_alltime.csv",
"uber_alltime.csv",
"uipath_alltime.csv",
"united-health-group_alltime.csv",
"valve_alltime.csv",
"virtu_alltime.csv",
"visa_alltime.csv",
"vmware_alltime.csv",
"wayfair_alltime.csv",
"wish_alltime.csv",
"works-applications_alltime.csv",
"yahoo_alltime.csv",
"yandex_alltime.csv",
"yelp_alltime.csv",
"zappos_alltime.csv",
"zillow_alltime.csv",
"zoho_alltime.csv",
"zulily_alltime.csv"
];

// Company logo URLs
const COMPANY_LOGOS = {
  adobe:
    "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_wordmark.svg",
  amazon:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  microsoft:
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  google:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  apple:
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
};

// -----------------------------
// HELPERS
// -----------------------------
const toTitleCase = (str) =>
  str
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const getCompanyNameFromFile = (filename) => {
  // "amazon_alltime.csv" -> "Amazon"
  const base = filename.replace(".csv", "");
  const companyPart = base.split("_")[0];
  return toTitleCase(companyPart);
};

const getLogoForCompany = (companyName) => {
  return COMPANY_LOGOS[companyName.toLowerCase()] || "";
};

// Topic inference from title + URL slug
const inferTopic = (title = "", link = "") => {
  const text = `${title} ${link}`.toLowerCase();

  const topicRules = [
    { topic: "Arrays", keywords: ["array", "subarray", "matrix", "prefix sum", "rotate array"] },
    { topic: "Strings", keywords: ["string", "substring", "palindrome", "anagram", "word break", "word pattern"] },
    { topic: "Hashing", keywords: ["hash", "map", "set", "dictionary", "duplicate", "frequency"] },
    { topic: "Linked List", keywords: ["linked list", "linked-list", "cycle list", "reverse list"] },
    { topic: "Stack", keywords: ["stack", "parentheses", "next greater", "monotonic stack"] },
    { topic: "Queue", keywords: ["queue", "deque", "circular queue", "monotonic queue"] },
    { topic: "Heap / Priority Queue", keywords: ["heap", "priority queue", "top k", "kth", "merge k"] },
    { topic: "Binary Search", keywords: ["binary search", "search insert", "rotated sorted", "lower bound", "upper bound"] },
    { topic: "Two Pointers", keywords: ["two sum ii", "two pointers", "container with most water", "3sum", "4sum"] },
    { topic: "Sliding Window", keywords: ["sliding window", "window", "longest substring", "minimum window"] },
    { topic: "Greedy", keywords: ["greedy", "jump game", "interval", "meeting rooms", "gas station"] },
    { topic: "Recursion", keywords: ["recursion", "recursive"] },
    { topic: "Backtracking", keywords: ["backtracking", "subset", "permutation", "combination", "n-queens", "sudoku"] },
    { topic: "Dynamic Programming", keywords: ["dp", "dynamic programming", "knapsack", "coin change", "lis", "lcs", "house robber"] },
    { topic: "Trees", keywords: ["tree", "binary tree", "bst", "n-ary", "serialize tree", "deserialize tree"] },
    { topic: "Graphs", keywords: ["graph", "bfs", "dfs", "topological", "dijkstra", "union find", "disjoint set", "mst"] },
    { topic: "Trie", keywords: ["trie", "prefix tree"] },
    { topic: "Bit Manipulation", keywords: ["bit", "xor", "and", "or", "hamming", "single number"] },
    { topic: "Math", keywords: ["math", "prime", "gcd", "lcm", "pow", "sqrt", "roman", "number"] },
    { topic: "Sorting", keywords: ["sort", "sorted", "merge intervals", "merge sort", "quick sort"] },
    { topic: "Design", keywords: ["design", "lru cache", "lfu cache", "browser history", "min stack"] },
    { topic: "System Design", keywords: ["tinyurl", "web crawler", "design twitter", "design search autocomplete"] },
  ];

  for (const rule of topicRules) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      return rule.topic;
    }
  }

  return "General";
};

const parseCsvFile = (filePath) =>
  new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });

// -----------------------------
// MAIN IMPORT
// -----------------------------
const runImport = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    for (const filename of FILES_TO_IMPORT) {
      const filePath = path.join(DATA_FOLDER, filename);

      if (!fs.existsSync(filePath)) {
        console.log(`Skipped: ${filename} not found`);
        continue;
      }

      const companyName = getCompanyNameFromFile(filename);
      const logo = getLogoForCompany(companyName);

      const rows = await parseCsvFile(filePath);

      const questions = rows
        .map((row) => {
          const title = row["Title"]?.trim() || "";
          const difficulty = row["Difficulty"]?.trim() || "";
          const problemLink = row["Leetcode Question Link"]?.trim() || "";

          return {
            title,
            difficulty,
            topic: inferTopic(title, problemLink),
            problemLink,
          };
        })
        .filter((q) => q.title && q.problemLink);

      const companyPayload = {
        name: companyName,
        logo,
        questions,
      };

      const result = await Company.findOneAndUpdate(
        { name: companyName },
        companyPayload,
        { new: true, upsert: true }
      );

      console.log(
        `Imported ${companyName}: ${result.questions.length} questions`
      );
    }

    console.log("All selected companies imported successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Import failed:", error.message);
    try {
      await mongoose.connection.close();
    } catch (_) {}
    process.exit(1);
  }
};

runImport();