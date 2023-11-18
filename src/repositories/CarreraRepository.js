const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    obtenerTCarreraEspecifica: async(idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras ORDER BY (idcarrera = ?) DESC, idcarrera',[idcarrera]);
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    // Insertar una carrera
    insertarCarrera: async(idcarrera,carrera) => {
        try{
          const result = await pool.query("insert into carreras(idcarrera, carrera) values(?,?);", [idcarrera,carrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    //actualizar Carrera
    actualizarCarrera: async (carrera,idcarrera) => {
        try {
          const result = await pool.query(
            "update carreras set carrera = ? where idcarrera = ?;",
            [carrera,idcarrera]
          );
          // La propiedad "insertId" no es relevante para actualizaciones, puedes devolver un mensaje de éxito u otra información necesaria aquí.
          return "Registro actualizado exitosamente";
        } catch (error) {
          console.error('Error al actualizar el registro', error);
          throw error; // Puedes propagar el error para manejarlo más arriba si es necesario.
        }
    },

    //Eliminar una carrera
    eliminarCarrera: async(idcarrera) => {
        try{
          const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    }
}

