const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async(idestudiante) => {
        try{
          const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
     insertarEstudiante: async(nuevoEstudiante) => {
        try{
          const result = await pool.query("INSERT INTO estudiantes SET ? ", nuevoEstudiante);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    //actualizar Estudiante
    actualizarEstudiante: async (nombre, apellido, email, idcarrera, usuario, idestudiante) => {
      try {
        const result = await pool.query(
          "UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?;",
          [nombre, apellido, email, idcarrera, usuario, idestudiante]
        );
        // La propiedad "insertId" no es relevante para actualizaciones, puedes devolver un mensaje de éxito u otra información necesaria aquí.
        return "Registro actualizado exitosamente";
      } catch (error) {
        console.error('Error al actualizar el registro', error);
        throw error; // Puedes propagar el error para manejarlo más arriba si es necesario.
      }
    }
    
}

