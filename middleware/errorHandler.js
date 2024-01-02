const errorHandler = (err, req, res, next) => {
    // checkeo si hay codigo de error definido
    const statusCode = err.statusCode || 500;

    // construyo objeto respuesta de error
    const errorResponse = {
        error: {
            message: err.message || "error interno del servidor",
            code: err.code || "internal_error"
        },
    };

    // envio respuesta en formato JSON
    res.status(statusCode).json(errorResponse);
};

// exporto
module.exports = errorHandler;