const mysql = require( '../mysql' );


exports.postSemanal = async (req, res) => {
    try {

        const query = 'INSERT INTO semanal (semanal_data, id_semestral, status_semanal) VALUES (?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.semanal_data,
                req.body.id_semestral,
                req.body.status_semanal
                
            ])
        const response = {
            mensagem: 'Semanal criado com sucesso',
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

exports.postRanking = async (req, res) => {
    try {

        const query = 'INSERT INTO ranking_semanal (pontos, id_player, id_semanal) VALUES (?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.pontos,
                req.body.id_player,
                req.body.id_semanal
                
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

exports.getSemanal = async ( req, res ) => {
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

exports.getRankSemanal = async ( req, res ) => {
    try {
        const query = `SELECT * FROM ranking_semanal WHERE id_semanal = ? order by pontos DESC;`
        
        const result = await mysql.execute( query, [req.params.id_semanal ] );

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

exports.getRankplayer = async ( req, res ) => {
    try {
        const query = `SELECT * FROM ranking_semanal WHERE id_player = ?;`
        
        const result = await mysql.execute( query, [req.params.id_player ] );

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
        const query = `UPDATE ranking_semanal SET pontos = ? WHERE id_player = ? and id_semanal = ?`
        
        const result = await mysql.execute( query, [req.params.pontos, req.params.id_player, req.params.id_semanal ] );
        const response = {
            mensagem: 'atualizado com sucesso'
            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        console.log(error)
        return res.status( 500 ).send( { Erro: error } )
    }

}