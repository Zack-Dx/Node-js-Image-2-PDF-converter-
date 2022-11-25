const imgToPDF = require("image-to-pdf");
const Fs = require("node:fs/promises");
const FsSync = require("node:fs");
const Path = require("node:path");
const upload_path = Path.join(__dirname, "./uploads/");

async function converter(filepath) {
  let page = await Fs.readFile(`${upload_path}${filepath}`);
  const pages = [
    page,
  ];
  
  let rs = Fs.createWriteStream("output.pdf");
  
  let p = new Promise(function (resolve, reject) {
    rs.on('close', resolve);
    rs.on('end', resolve);
    rs.on('error', reject);
  })
  
  imgToPDF(pages, imgToPDF.sizes.A4).pipe(rs);
  
  return await p;
};
module.exports = { converter };
