const mysql = require( '../mysql' );

exports.postMatch = async (req, res) => {
    try {
       
      

            const query = 'INSERT INTO rounds (player_1, player_2, round_status, id_semanal, id_rodada) VALUES (?, ?, ?, ?, ?)';
            const result = await mysql.execute(query,
                [
                    req.body.player_1,
                    req.body.player_2,
                    req.body.round_status,
                    req.body.id_semanal,
                    req.body.id_rodada
                    
                ])
            const response = {
                mensagem: 'rodada crida com sucesso ',

            }
    
    
            return res.status(201).send(response);
        



    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}


exports.getRound = async ( req, res ) => {
    try {
        const query = `SELECT * FROM player WHERE id_semestral = ?;`
        
        const result = await mysql.execute( query, [req.params.id_semestral] );

        const response = {
            tipos: result.map( tip => {
                return{
                    id_player: tip.id_player, 
                    player: tip.player,
                    deck: tip.deck,
                    cidade: tip.cidade
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}

exports.postRodada = async (req, res) => {
    try {
       
      

            const query = 'INSERT INTO rodada (id_semanal,inicio_partida ) VALUES (?,?)';
            const result = await mysql.execute(query,
                [
                
                    req.body.id_semanal,
                    req.body.inicio_partida
                
                    
                ])
            const response = {
                id_rodada: result.insertId,
                mensagem: 'rodada crida com sucesso ',

            }
    
    
            return res.status(201).send(response);
        



    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}

exports.getRodada = async ( req, res ) => {
    try {
        const query = `SELECT * FROM rounds WHERE id_rodada = ? and id_semanal ;`
        
        const result = await mysql.execute( query, [req.params.id_rodada, req.params.id_semanal] );

        const response = {
            tipos: result.map( tip => {
                return{
                    id_rounds: tip.id_rounds, 
                    player_1: tip.player_1,
                    player_2: tip.player_2,
                    round_status: tip.round_status
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}