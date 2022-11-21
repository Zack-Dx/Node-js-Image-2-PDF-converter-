const express = require("express");
const app = express();
const port = process.env.PORT || 3519;
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { converter } = require("./converter");
const imgToPDF = require("image-to-pdf");
// const fs = require("fs");
const out_path = path.join(__dirname, "/output.pdf");
console.log(out_path);
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("index");
});

app.post("/converter", upload.array("image", 1), (req, res, next) => {
  console.log(req.files.length);
  if (req.files.length === 0) {
    res.status(400).send("Files not uploaded");
  } else {
    converter(req.files[0].filename);
    console.log(req.files);
    res.sendFile(out_path);
  }
});
app.listen(port, () => {
  console.log(`Listening at port${port}`);
});
