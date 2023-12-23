const mysql = require( '../mysql' );
const bcrypt = require('bcrypt');

exports.postOrganizador = async (req, res) => {
    try {
        const queryEmail = 'SELECT * FROM organizador WHERE email_organizador = ?';
        const results = await mysql.execute(queryEmail, [req.body.email_organizador]);
        if (results.length > 0) {
            return res.status(409).send({ Mensagem: 'Usuario já cadastrado' })
        }
        const hash = await bcrypt.hash(req.body.senha, 10);

        const query = 'INSERT INTO organizador (nome_organizador, email_organizador, senha, status) VALUES (?, ?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.nome_organizador,
                req.body.email_organizador,
                hash,
                req.body.status
                
            ])
        const response = {
            mensagem: 'Organizador criado com sucesso',
            usuarioCriado: {
                id: result.insertId,
                nome: req.body.nome,
                email: req.body.email,
                hash: hash
            }
        }

        /*transporter.sendMail({
            from: 'rains.corporativo@gmail.com',
            to: `${req.body.email}`,
            subject: 'Validacao de email',
            html: `<p> Olá, Verifique seu email</p><br>
            <a href="https://aechefia.com.br/verificar/${result.insertId}"><button  style="height: 48px; text-align: center; font-weight: 700; border-radius: 100px; box-sizing: border-box; border: 1px; background-color: #ED1B2E; color: aliceblue; width: 360px;">Verificar conta</button></a>` 
        })*/

        return res.status(201).send(response);
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ Erro: error })
    }

}