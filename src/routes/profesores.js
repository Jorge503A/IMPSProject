const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const ProfesoresQuery = require('../repositories/ProfesoresRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los estudiantes
router.get('/',isLoggedIn, async (request, response) => {
    const profesores = await ProfesoresQuery.obtenerTodosLosProfesores();
     response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar',isLoggedIn, async(request, response) => {
   
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint que permite mostrar el formulario para Actualizar un nuevo profesor
router.get('/actualizar',isLoggedIn, async (request, response) => {
    // Recupera los parámetros de la URL utilizando request.query
    const idprofesor = request.query.idprofesor;
    const nombre = request.query.nombre;
    const apellido = request.query.apellido;
    const fecha_nacimiento = request.query.fecha_nacimiento;
    const profesion = request.query.profesion;
    const genero = request.query.genero;
    const email = request.query.email;
    // Renderiza el formulario con los datos recuperados
    response.render('profesores/actualizar', { idprofesor, nombre, apellido,fecha_nacimiento,profesion,genero, email,});
});


// Endpoint para agregar un estudiante
router.post('/agregar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const fecha_nacimiento = request.body.fecha_nacimiento;
    const profesion = request.body.profesion;
    const genero = request.body.genero;
    const email = request.body.email;
    const resultado = await ProfesoresQuery.insertarProfesor(nombre,apellido,fecha_nacimiento,profesion,genero,email);
    if(resultado){
        request.flash('success', 'Registro insertado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
     }
    response.redirect('/profesores');
});

// Endpoint para actualizar un estudiante
router.post('/actualizar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    const idprofesor = request.body.idprofesor;
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const fecha_nacimiento = request.body.fecha_nacimiento;
    const profesion = request.body.profesion;
    const genero = request.body.genero;
    const email = request.body.email
    const resultado = await ProfesoresQuery.actualizarProfesores(nombre,apellido,fecha_nacimiento,profesion,genero,email,idprofesor);
    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }
    response.redirect('/profesores');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idprofesor',isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const idprofesor = request.params.idprofesor;
    const resultado = await ProfesoresQuery.eliminarProfesor(idprofesor);
    if(resultado > 0){
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/profesores');
});

module.exports = router;
