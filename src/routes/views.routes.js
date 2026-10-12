import express from 'express';
import * as viewsController from '../controllers/views.controllers.js';

const router = express.Router();

//OBTENER TODOS LOS USUARIOS
router.get("/", viewsController.viewHome);

//VISTA CREAR USUARIOS
router.get("/crear-usuarios", viewsController.viewCrearUsuarios);

//VISTA MOSTRAR TODOS LOS USUARIOS
router.get("/usuarios", viewsController.viewUsuarios);

//VISTA PERFIL USUARIO
router.get("/usuarios/perfil/:id", viewsController.viewPerfilUsuario);

export default router;
