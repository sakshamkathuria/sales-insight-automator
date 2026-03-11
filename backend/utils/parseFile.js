const fs = require("fs");
const csv = require("csv-parser");
const XLSX = require("xlsx");

async function parseFile(filePath) {

  const ext = filePath.split(".").pop();

  if (ext === "csv") {
    return parseCSV(filePath);
  }

  if (ext === "xlsx") {
    return parseExcel(filePath);
  }

  throw new Error("Unsupported file type");
}

function parseCSV(filePath) {

  return new Promise((resolve, reject) => {

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);

  });

}

function parseExcel(filePath) {

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(worksheet);

  return data;
}

module.exports = parseFile;