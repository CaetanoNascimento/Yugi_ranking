const mysql = require( '../mysql' );

exports.postPlayer = async (req, res) => {
    try {
       
      
        const queryPlayer = `SELECT * FROM player WHERE player = ? and id_semestral = ?;`
        
        const resultPlayer = await mysql.execute( queryPlayer, [req.body.player, req.body.id_semestral ] );
        if (resultPlayer.length == 1) {
            console.log('tendi')
                console.log(resultPlayer.length)

            return res.status(401).send({ mensagem: 'Já existe um jogador com esse nome' })
        }else{
            const query = 'INSERT INTO player (player, id_semestral, deck, cidade) VALUES (?, ?, ?, ?)';
            const result = await mysql.execute(query,
                [
                    req.body.player,
                    req.body.id_semestral,
                    req.body.deck,
                    req.body.cidade
                    
                ])
            const response = {
                mensagem: 'player criado com sucesso',
                usuarioCriado: {
                    id: result.insertId,
                }
            }
    
    
            return res.status(201).send(response);
        }



    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}

exports.getPlayers = async ( req, res ) => {
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

exports.getPlayersdoRound = async ( req, res ) => {
    try {
        const query = `SELECT * FROM player where id_player = ?`
       
        
        const result = await mysql.execute( query, [req.params.player] );

        const response = {
            tipos: result.map( tip => {
                return{
                    tamanho: result.length,
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


exports.getPlayersRank = async ( req, res ) => {
    try {
        const query = `SELECT * FROM player where id_player  = ?`
       
        
        const result = await mysql.execute( query, [req.params.id_player] );

        const response = {
            tipos: result.map( tip => {
                return{
                    tamanho: result.length,
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


exports.patchPlayer = async (req, res) => {
    try {
        const query = 'UPDATE player SET deck = ?  WHERE player = ? and id_semestral = ?;'
        await mysql.execute(query,
            [
                req.params.deck,
                req.params.player,
                req.params.id_semestral
            ]);
        const response = {
            mensagem: 'Player atualizado com sucesso',

        }

        return res.status(201).send(response);
    }
    catch (error) {
        return res.status(500).send(error)
    }

}