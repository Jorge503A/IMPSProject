const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos las carrera
router.get('/', async (request, response) => {
    const carreras = await carrerasQuery.obtenerTodosLasCarreras();
     response.render('carreras/listadoCarrera', {carreras}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nueva carrera
router.get('/agregar', async(request, response) => {
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo estudiante
router.get('/actualizar', async (request, response) => {
    // Recupera los parámetros de la URL utilizando request.query
    const idcarrera = request.query.idcarrera;
    const carrera = request.query.carrera;
    // Obtén la lista de carreras (supongo que esta parte está funcionando correctamente)
    // Renderiza el formulario con los datos recuperados
    response.render('carreras/actualizar', { idcarrera, carrera});
});


// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const idcarrera = request.body.idcarrera;
    const carrera = request.body.carrera;

    const resultado = await carrerasQuery.insertarCarrera(idcarrera,carrera);

    response.redirect('/carreras');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar', async(request, response) => {
    // Falta agregar logica
    const carrera = request.body.carrera;
    const idcarrera = request.body.idcarrera;
    const resultado = await carrerasQuery.actualizarCarrera(carrera,idcarrera);
    response.redirect('/carreras');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idcarrera = request.params.idcarrera;
    const resultado = await carrerasQuery.eliminarCarrera(idcarrera);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

module.exports = router;
