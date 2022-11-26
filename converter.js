const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const fsSync = require("node:fs");
const Path = require("node:path");
const upload_path = Path.join(__dirname, "./uploads/");

async function converter(filepath) {
  let page = fs.readFileSync(`${upload_path}${filepath}`);
  const pages = [page];

  let rs = fs.createWriteStream("output.pdf");

  let p = new Promise(function (resolve, reject) {
    rs.on("close", resolve);
    rs.on("end", resolve);
    rs.on("error", reject);
  });

  imgToPDF(pages, imgToPDF.sizes.A4).pipe(rs);

  return await p;
}
module.exports = { converter };
