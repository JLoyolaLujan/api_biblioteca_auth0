// importar express
const express = require("express");

// importar express-oauth2-jwt-bearer
const { auth } = require("express-oauth2-jwt-bearer");

// importamos e inicializamos el errorHandler
const errorHandler = require("./middleware/errorHandler");

// configuracion middleware con el servidor de autorizacion
const autenticacion = auth({
    audience: 'http://localhost:3000/libros',
    issuerBaseURL: 'https://dev-7edcxzgeanzx2aax.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// express app
const app = express();
app.use(express.json());

// importamos el router de libros
const librosRouter = require("./routes/libros");

// configuramos el middleware de autenticacion
app.use("/libros", autenticacion, librosRouter);
app.use(errorHandler);

// para saber si esta todo en orden...
app.get("/", (req, res) => {
    res.send("hola, mundo!")
});

/*
app.get("/api/productos", (req, res) => {
    res.send("no se")
});
*/

// inicializando el servidor

const PUERTO_3000 = process.env.PORT || 3000; 

app.listen(PUERTO_3000, () => {
    console.log(`Servidor iniciado en el puerto ${PUERTO_3000}`);
});

/*
para poder hacer funcionar el programa tuve que generar mis propios
tokens en auth0.com

aquí estan el codigo para importar en postman, y asi conseguir el token

detalles ---> read:libros y write:libros 

curl --request POST \
  --url https://dev-7edcxzgeanzx2aax.us.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"0CVVFecXWklrBngDaRdLLI8Oqsh70efB","client_secret":"FRIs7x6gmYYADygHQ45UxVgTM6jq90Rg-q-zjA-Apu_xiz-WZhmT2woLEV5MXBWK","audience":"http://localhost:3000/libros","grant_type":"client_credentials"}'

dejare activo el link el tiempo necesario, hasta que se califiquen las tareas, o hasta que termine el curso
*/