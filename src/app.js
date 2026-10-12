import express from "express";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";
import { registrarLog } from "./utils/persistencia.js";
import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import usuariosRoutes from "./routes/usuarios.routes.js";
import viewsRoutes from "./routes/views.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

moment.locale("es");

const app = express();



//CONFIGURACIÓN MOTOR PLANTILLAS
const hbs = create({
	partialsDir: [
		path.join(__dirname, "/views/partials"),
	],
});


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//MIDDLEWARES GENERALES

//REGISTRO DE PETICIONES
app.use((req, res, next) => {
    try {
        let codigo = uuidV4().slice(0, 6);
        let fechaHora = moment().format("MMMM DD [del] YYYY, hh:mm:ss a");
        let metodo = req.method;
        let ruta = req.path;
        let mensaje = `${codigo} - [${fechaHora}], Método: ${metodo}, Ruta: ${ruta}`;

        registrarLog("log_request.txt", mensaje);

    } catch (error) {
        console.log(error);
    }finally{
        next();
    }
});

app.use(express.json()); //guarda json en body
app.use(express.urlencoded({ extended: true })); //guarda datos enviados desde form e  body
app.use(express.static(path.resolve(__dirname, "..", "public")));

//RUTAS DE VISTAS
app.use("/", viewsRoutes);

//RUTAS DE API
app.use("/api/usuarios", usuariosRoutes);

export default app;
