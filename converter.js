const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const path = require("path");
const upload_path = path.join(__dirname, "./uploads/");

const converter = (filepath) => {
  const pages = [
    `${upload_path}${filepath}`, // path to the image
    fs.readFileSync(`${upload_path}${filepath}`), // Buffer
  ];

  return imgToPDF(pages, imgToPDF.sizes.A4);
};

module.exports = { converter };
