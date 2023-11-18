const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLosGruposEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT ge.idestudiante, concat(e.nombre," ",e.apellido)Alumno FROM grupo_estudiantes ge, estudiantes e where ge.idestudiante = e.idestudiante;');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    // Insertar una materia
    insertarGrupoEstudiante: async(idgrupo,idestudiante) => {
        try{
          const result = await pool.query("insert into grupo_estudiantes(idgrupo,idestudiante) values(?,?);"
          , [idgrupo,idestudiante]);
          return result.insertId;

        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
    },

    //Eliminar una materia
    eliminarGrupo: async(idgrupo) => {
        try{
          const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    actualizarGrupo: async (num_grupo,anio,ciclo,idmateria,idprofesor,idgrupo) => {
        try {
          const result = await pool.query(
            "update grupos set num_grupo= ?, anio= ?, ciclo= ?, idmateria= ?,idprofesor =?  where idgrupo=?;",
            [num_grupo,anio,ciclo,idmateria,idprofesor,idgrupo]
          );
          // La propiedad "insertId" no es relevante para actualizaciones, puedes devolver un mensaje de éxito u otra información necesaria aquí.
          return "Registro actualizado exitosamente";
        } catch (error) {
          console.error('Error al actualizar el registro', error);
          throw error; // Puedes propagar el error para manejarlo más arriba si es necesario.
        }
    },

    // Asignar grupo
    asignarGrupo: async(asignacion) => {
      try {
        const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ",
        asignacion);
        console.log('resultado: ', result)
        return result;
      } catch (error) {
        console.log('Ocurrio un problema al asignar el grupo', error);
      }
    },
}

