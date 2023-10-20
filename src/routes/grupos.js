const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const ProfesoresQuery = require('../repositories/ProfesoresRepository');
const materiasQuery = require('../repositories/MateriasRepository');
const GruposQuery = require('../repositories/GruposRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const grupos = await GruposQuery.obtenerTodosLosGrupos();
     response.render('grupos/listado', {grupos}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstMaterias = await materiasQuery.obtenerTodasMaterias();
    const lstProfesores = await ProfesoresQuery.obtenerTodosLosProfesores();
    // Renderizamos el formulario
    response.render('grupos/agregar', {lstMaterias,lstProfesores});
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo profesor
router.get('/actualizar', async (request, response) => {
    // Recupera los parámetros de la URL utilizando request.query
    const lstMaterias = await materiasQuery.obtenerTodasMaterias();
    const lstProfesores = await ProfesoresQuery.obtenerTodosLosProfesores();
    const idgrupo = request.query.idgrupo;
    const num_grupo = request.query.num_grupo;
    const anio = request.query.anio;
    const ciclo = request.query.ciclo;
    const idmateria = request.query.idmateria;
    const idprofesor = request.query.idprofesor;
    // Renderiza el formulario con los datos recuperados
    response.render('grupos/actualizar', { lstMaterias, lstProfesores, idgrupo,num_grupo,anio,ciclo,idmateria, idprofesor});
});


// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const num_grupo = request.body.num_grupo;
    const anio = request.body.anio;
    const ciclo = request.body.ciclo;
    const idmateria = request.body.idmateria;
    const idprofesor = request.body.idprofesor;
    const resultado = await GruposQuery.insertarGrupo(num_grupo,anio,ciclo,idmateria,idprofesor);

    response.redirect('/grupos');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar', async(request, response) => {
    // Falta agregar logica
    const num_grupo = request.body.num_grupo;
    const anio = request.body.anio;
    const ciclo = request.body.ciclo;
    const idmateria = request.body.idmateria;
    const idprofesor = request.body.idprofesor;
    const idgrupo = request.body.idgrupo;
    const resultado = await GruposQuery.actualizarGrupo(num_grupo,anio,ciclo,idmateria,idprofesor,idgrupo);
    response.redirect('/grupos');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idgrupo', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idgrupo = request.params.idgrupo;
    const resultado = await GruposQuery.eliminarGrupo(idgrupo);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/grupos');
});

module.exports = router;