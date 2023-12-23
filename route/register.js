const route = require( 'express' ).Router();
const controller = require( '../controllers/register-control' );

const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/register.html' );
} )


route.post( '/', controller.postOrganizador );


route.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM organizador WHERE email_organizador = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                

                return res.status(401).send({ mensagem: 'Falha na autenticação 1' })
            }

     
                bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                    if (err) {

                        return res.status(401).send({ mensagem: 'Falha na autenticação 2' })
                    }
                    if (result) {
                        let token = jwt.sign({


                        }, process.env.JWT_KEY,
                            {
                                expiresIn: "8h"
                            });
                        return res.status(200).send({
                            mensagem: 'Autenticado com sucesso',
                            usuario: results[0].id_organizador,
                            token: token
                        });
                    }
                    return res.status(401).send({ mensagem: 'Falha na autenticação 3' })
                });

            


        });
    });
})


module.exports = route;