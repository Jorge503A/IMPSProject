const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos las carrera
router.get('/',isLoggedIn, async (request, response) => {
    const carreras = await carrerasQuery.obtenerTodosLasCarreras();
     response.render('carreras/listadoCarrera', {carreras}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nueva carrera
router.get('/agregar',isLoggedIn, async(request, response) => {
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo estudiante
router.get('/actualizar',isLoggedIn, async (request, response) => {
    // Recupera los parámetros de la URL utilizando request.query
    const idcarrera = request.query.idcarrera;
    const carrera = request.query.carrera;
    // Obtén la lista de carreras (supongo que esta parte está funcionando correctamente)
    // Renderiza el formulario con los datos recuperados
    response.render('carreras/actualizar', { idcarrera, carrera});
});


// Endpoint para agregar una carrera
router.post('/agregar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const idcarrera = request.body.idcarrera;
    const carrera = request.body.carrera;

    const resultado = await carrerasQuery.insertarCarrera(idcarrera,carrera);

    if(resultado){
        request.flash('success', 'Registro insertado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
     }

    response.redirect('/carreras');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const carrera = request.body.carrera;
    const idcarrera = request.body.idcarrera;
    const resultado = await carrerasQuery.actualizarCarrera(carrera,idcarrera);
    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }
    response.redirect('/carreras');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera',isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idcarrera = request.params.idcarrera;
    const resultado = await carrerasQuery.eliminarCarrera(idcarrera);
    
    if(resultado > 0){
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }

    response.redirect('/carreras');
});

module.exports = router;
