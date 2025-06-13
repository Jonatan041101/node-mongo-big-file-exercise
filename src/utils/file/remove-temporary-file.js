const fs = require("node:fs");

const removeTemporaryFile = (filePath) => {
  fs.unlinkSync(filePath);
};

module.exports = {
  removeTemporaryFile,
};
