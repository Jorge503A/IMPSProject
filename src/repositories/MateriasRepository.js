const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodasMaterias: async() => {
        try {
            const result = await pool.query('SELECT * FROM materias');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    // Insertar una materia
    insertarMateria: async(idmateria,materia) => {
        try{
          const result = await pool.query("insert into materias(idmateria, materia) values(?,?);", [idmateria,materia]);
          return result.insertId;

        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
    },

    //Eliminar una materia
    eliminarMateria: async(idmateria) => {
        try{
          const result = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    actualizarMateria: async (materia,idmateria) => {
        try {
          const result = await pool.query(
            "update materias set materia = ? where idmateria = ?;",
            [materia,idmateria]
          );
          // La propiedad "insertId" no es relevante para actualizaciones, puedes devolver un mensaje de éxito u otra información necesaria aquí.
          return "Registro actualizado exitosamente";
        } catch (error) {
          console.error('Error al actualizar el registro', error);
          throw error; // Puedes propagar el error para manejarlo más arriba si es necesario.
        }
    },
}

