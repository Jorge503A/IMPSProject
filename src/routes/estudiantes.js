const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo estudiante
router.get('/actualizar', async (request, response) => {
    // Recupera los parámetros de la URL utilizando request.query
    const idestudiante = request.query.idestudiante;
    const nombre = request.query.nombre;
    const apellido = request.query.apellido;
    const email = request.query.email;
    const usuario = request.query.usuario;
    const idcarrera = request.query.idcarrera;
    // Obtén la lista de carreras (supongo que esta parte está funcionando correctamente)
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    const lstCarreraPrincipal = await carrerasQuery.obtenerTCarreraEspecifica(idcarrera);
    // Renderiza el formulario con los datos recuperados
    response.render('estudiantes/actualizar', { lstCarreras, idestudiante, nombre, apellido, email, usuario, lstCarreraPrincipal,idcarrera });
});


// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar', async(request, response) => {
    // Falta agregar logica
    const idestudiante = request.body.idestudiante
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const email = request.body.email
    const usuario = request.body.usuario;
    const idcarrera = request.body.idcarrera;
    const resultado = await queries.actualizarEstudiante(nombre,apellido,email,idcarrera,usuario,idestudiante);
    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;
