const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const materiasQuery = require('../repositories/MateriasRepository');

// Endpoint para mostrar todos las materias
router.get('/', async (request, response) => {
    const materias = await materiasQuery.obtenerTodasMaterias();
    response.render('materias/listado', {materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar un nueva materia
router.get('/agregar', async(request, response) => {
    // Renderizamos el formulario
    response.render('materias/agregar');
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo estudiante
router.get('/actualizar', async (request, response) => {
    const idmateria = request.query.idmateria;
    const materia = request.query.materia;
    response.render('materias/actualizar', { idmateria, materia});
});


// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const materia = request.body.materia;

    const resultado = await materiasQuery.insertarMateria(materia);

    response.redirect('/materias');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar', async(request, response) => {
    // Falta agregar logica
    const idmateria = request.body.idmateria;
    const materia = request.body.materia;
    const resultado = await materiasQuery.actualizarMateria(materia,idmateria)
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idmateria = request.params.idmateria;
    const resultado = await materiasQuery.eliminarMateria(idmateria);

    if(resultado){
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/materias');
});

module.exports = router;
