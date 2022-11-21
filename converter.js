const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const path = require("path");
const upload_path = path.join(__dirname, "./uploads/");

const converter = (filepath) => {
  const pages = [
    `${upload_path}${filepath}`, // path to the image
    fs.readFileSync(`${upload_path}${filepath}`), // Buffer
  ];

  imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream("output.pdf"));
};
module.exports = { converter };
