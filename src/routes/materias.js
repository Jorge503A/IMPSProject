const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const materiasQuery = require('../repositories/MateriasRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos las materias
router.get('/',isLoggedIn, async (request, response) => {
    const materias = await materiasQuery.obtenerTodasMaterias();
    response.render('materias/listado', {materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar un nueva materia
router.get('/agregar',isLoggedIn, async(request, response) => {
    // Renderizamos el formulario
    response.render('materias/agregar');
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo estudiante
router.get('/actualizar',isLoggedIn, async (request, response) => {
    const idmateria = request.query.idmateria;
    const materia = request.query.materia;
    response.render('materias/actualizar', { idmateria, materia});
});


// Endpoint para agregar una carrera
router.post('/agregar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const materia = request.body.materia;

    const resultado = await materiasQuery.insertarMateria(materia);
    if(resultado){
        request.flash('success', 'Registro insertado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
     }

    response.redirect('/materias');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const idmateria = request.body.idmateria;
    const materia = request.body.materia;
    const resultado = await materiasQuery.actualizarMateria(materia,idmateria)
    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria',isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idmateria = request.params.idmateria;
    const resultado = await materiasQuery.eliminarMateria(idmateria);
    
    if(resultado > 0){
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/materias');
});

module.exports = router;
