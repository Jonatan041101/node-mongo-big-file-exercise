const fs = require("node:fs");
const csv = require("csv-parser");

const readFile = async (filePath) => {
  return await new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        rows.push({
          id: Number(data.id),
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          email2: data.email2,
          profession: data.profession,
        });
      })
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
};

module.exports = {
  readFile,
};
