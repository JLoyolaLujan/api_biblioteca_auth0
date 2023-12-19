// importo mongoose 
const mongoose = require("mongoose");

// connect
mongoose.connect("mongodb://127.0.0.1:27017/biblioteca")
    .then(() => {
        console.log("conección DB ha sido exitosa");
    }).catch((err) => {
        console.log(`error de conección DB: ${err}`);
    });

// Schema

const LibroSchema = new mongoose.Schema({
    titulo: String,
    autor: String
}, { collection: "libros" });

// modelo

const Libro = mongoose.model("Libro", LibroSchema);

// exporto

module.exports = Libro;