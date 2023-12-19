// importo express 
const express = require("express"); 
// router
const librosRouter = express.Router(); 
// Schema
const Libro = require("../models/Libro");
// libreria para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const errorHandler = require("../middleware/errorHandler");

/*
get /libros (listo)
get /libros/:id (listo)
post /libros (listo)
put /libros/:id (listo)
delete /libros/:id (listo)
*/

// get /libros

librosRouter.get("/", requiredScopes("read:libros"), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

// get /libros/:id

librosRouter.get("/:id", requiredScopes("read:libros"), async (req, res) => {
    try {
        // id
        const id = req.params.id;
        // encontrar por id
        const libro = await Libro.findById(id);

        // me fijo si existe

        if (!libro) {
            /*
            const error = new Error("libro no encontrado"); 
            error.status(404); 
            throw error; 
            */
            return res.status(404).json({
                status: "error",
                message: "libro no encontrado"
            });
        }
        
        res.json(libro);
    } catch (error) {
        // res.status(500).json({ error: "Error al obtener libro" });
        const handler = errorHandler(error);
        res.status(handler[0]).json(handler[1]);
    }
});

// put /libros/:id

librosRouter.post("/", requiredScopes("write:libros"), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        // res.status(500).json({ error: "Error al postear el libro" });
        const handler = errorHandler(error);
        res.status(handler[0]).json(handler[1]);
    }
});

// put /libro/:id
librosRouter.put("/:id", requiredScopes("write:libros"), async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {new:true});

        // me fijo que exista
        if (!libro) {
            return res.status(404).json({
                status: "error",
                message: "el libro que solicita actualizar no ha sido encontrado"
            });
        }

        res.json(libro);
    } catch (error) {
        // res.status(500).send({ error: "Error al actualizar el libro" });
        const handler = errorHandler(error);
        res.status(handler[0]).json(handler[1]);
    }
});

// delete /libro/:id
librosRouter.delete("/:id", requiredScopes("write:libros"), async (req, res) => {
    try {
        // dado que findByIdAndDelete retorna el documento removido
        // puedo usarlo si el documento buscado para eliminar
        // siquiera existe
        const libro = await Libro.findByIdAndDelete(req.params.id);

        // me fijo que exista 
        if (!libro) {
            return res.status(404).json({
                status: "error",
                message: "el libro que solicita eliminar no ha sido encontrado"
            });
        }
        res.json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
        // res.status(500).json({ error: "Error al eliminar el libro"});
        const handler = errorHandler(error);
        res.status(handler[0]).json(handler[1]);
    }
});

module.exports = librosRouter;