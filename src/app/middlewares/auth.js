const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; // para enviar no header

    if (!authHeader) // ver se o token está no header
        return res.status(401).send({
            error: 'No token provided'
        });

    const parts = authHeader.split(' '); // separando o valor do header em duas partes

    if (!parts.length === 2) // verificar se o valor do header está em duas partes
        return res.status(401).send({
            error: 'Token error'
        })

    const [scheme, token] = parts; // separar o valor do header em partes

    if (!/^Bearer$/i.test(scheme)) // verificar se no scheme tem algo diferente do Bearer
        return res.status(401).send({
            error: 'Token malformatted'
        })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({
                error: 'Token Invalid'
            })

        req.userId = decoded.id;
        return next();
    })
}