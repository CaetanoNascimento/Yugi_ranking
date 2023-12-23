const mysql = require( '../mysql' );


exports.postSemestral = async (req, res) => {
    try {

        const query = 'INSERT INTO semestral (semestral, id_organizador, status) VALUES (?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.semestral,
                req.body.id_organizador,
                req.body.status
                
            ])
        const response = {
            mensagem: 'Semestral criado com sucesso',
            usuarioCriado: {
                id: result.insertId,
            }
        }


        return res.status(201).send(response);
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}

exports.getSemestral = async ( req, res ) => {
    try {
        const query = `SELECT * FROM semestral WHERE id_organizador = ?;`
        
        const result = await mysql.execute( query, [req.params.id_organizador ] );

        const response = {
            tipos: result.map( tip => {
                return{
                    semestral: tip.semestral,
                    id_semestral: tip.id_semestral,
                    status: tip.status
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}