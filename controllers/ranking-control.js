const mysql = require( '../mysql' );

exports.postRanking = async (req, res) => {
    try {

        const query = 'INSERT INTO ranking (pontos, id_player, id_rank) VALUES (?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.pontos,
                req.body.id_player,
                req.body.id_rank
                
            ])
        const response = {
            mensagem: 'Ranking adicionado com sucesso',

        }


        return res.status(201).send(response);
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}

exports.getRankSemestral = async ( req, res ) => {
    try {
        const query = `SELECT * FROM ranking WHERE id_rank = ? order by pontos DESC;`
        
        const result = await mysql.execute( query, [req.params.id_rank ] );

        const response = {
            tipos: result.map( tip => {
                return{
                    id_player: tip.id_player,
                   pontos: tip.pontos,
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}

exports.patchRank = async ( req, res ) => {
    try {
        const query = `UPDATE ranking SET pontos = ? WHERE id_player = ?`
        
        const result = await mysql.execute( query, [req.params.pontos, req.params.id_player ] );
        const response = {
            mensagem: 'atualizado com sucesso'
            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}