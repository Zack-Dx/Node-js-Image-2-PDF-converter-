const express = require("express");
const app = express();
const port = process.env.PORT || 3520;
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { converter } = require("./converter");
const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const out_path = path.join(__dirname, "/output.pdf");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("index");
});
app.get("/converter", (req, res) => {
  res.sendFile(out_path);
});
app.post("/converter", upload.array("image", 1), async (req, res, next) => {
  if (req.files.length === 0) {
    res.status(400).send("Files not uploaded");
  } else {
    await converter(req.files[0].filename);
    res.redirect(`http://localhost:${port}/converter`);
  }
});
app.listen(port, () => {
  console.log(`Listening at port${port}`);
});
