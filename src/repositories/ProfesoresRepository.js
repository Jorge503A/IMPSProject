const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los profesores
    obtenerTodosLosProfesores: async() => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de profesores: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarProfesor: async(idprofesor) => {
        try{
          const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
     insertarProfesor: async(idprofesor,nombre,apellido,email,telefono,usuario) => {
        try{
          const result = await pool.query("insert into profesores(idprofesor,nombre,apellido,email,telefono,usuario) values(?,?,?,?,?,?);", 
          [idprofesor,nombre,apellido,email,telefono,usuario]);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    //actualizar Estudiante
    actualizarProfesores: async (nombre, apellido, email, telefono, usuario,idprofesor) => {
      try {
        const result = await pool.query(
          "UPDATE profesores SET nombre = ?, apellido = ?, email = ?, telefono = ?, usuario = ? WHERE idprofesor = ?;",
          [nombre, apellido, email, telefono, usuario, idprofesor]
        );
        // La propiedad "insertId" no es relevante para actualizaciones, puedes devolver un mensaje de éxito u otra información necesaria aquí.
        return "Registro actualizado exitosamente";
      } catch (error) {
        console.error('Error al actualizar el registro', error);
        throw error; // Puedes propagar el error para manejarlo más arriba si es necesario.
      }
    }
    
}

