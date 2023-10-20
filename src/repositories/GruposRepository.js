const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLosGrupos: async() => {
        try {
            const result = await pool.query('Select g.idgrupo,g.num_grupo,g.anio,g.ciclo,g.idmateria,m.materia,g.idprofesor,concat(p.nombre," ",p.apellido)Profesor From grupos g, materias m, profesores p where g.idmateria = m.idmateria and g.idprofesor = p.idprofesor;');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    // Insertar una materia
    insertarGrupo: async(num_grupo,anio,ciclo,idmateria,idprofesor) => {
        try{
          const result = await pool.query("insert into grupos(num_grupo,anio,ciclo,idmateria,idprofesor) values(?,?,?,?,?);"
          , [num_grupo,anio,ciclo,idmateria,idprofesor]);
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
}

