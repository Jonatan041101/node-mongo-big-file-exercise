const Records = require("./records.model");
const { readFile } = require("./utils/file/read-file");
const { removeTemporaryFile } = require("./utils/file/remove-temporary-file");

const upload = async (req, res) => {
  const { file } = req;
  const filePath = file.path;
  /* Acá va tu código! Recordá que podés acceder al archivo desde la constante file */
  try {
    // Leer el csv para obtener los valores de cada linea
    const results = await readFile(filePath);

    // Ahora insertamos los resultados
    const BATCH_SIZE = 10_000;

    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const chunk = results.slice(i, i + BATCH_SIZE);
      await Records.insertMany(chunk);
    }
    // Borrar el archivo temporal
    await removeTemporaryFile(filePath);

    return res.status(201).json({
      message: "Records saved successfully",
      count: results.length,
    });
  } catch (error) {
    console.error("Error in upload:", error);
    return res
      .status(500)
      .json({ error: "Error processing the CSV", details: error });
  }
};

const list = async (_, res) => {
  try {
    const data = await Records.find({}).limit(10).lean();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  upload,
  list,
};
