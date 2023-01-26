require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { getData } = require("./notion");

app.use(cors());

app.get("/notion-data", async (req, res) => {
  // Page ID
  const id = req.query.id;

  // Get data from API
  const result = await getData(id);
  const data = result.map((item) => {
    if (item.type === "image") {
      return {
        type: "image",
        content: item[item.type].file.url,
        annotations: "",
      };
    } else if (item[item.type].rich_text.length === 0) {
      return {
        type: "line_break",
        content: "",
        annotations: "",
      };
    } else {
      return {
        type: item.type,
        content: item[item.type].rich_text[0].text.content,
        annotations: item[item.type].rich_text[0].annotations,
      };
    }
  });
  res.send(data);
});

app.listen(
  process.env.PORT,
  console.log("Yay, server is running on Port 5000")
);
