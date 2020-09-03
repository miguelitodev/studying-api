const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require('../config/auth.json'); // chamando o hash para add a senha

const User = require("./../models/user"); // Model de user para fazer ações de login e cadastro

const router = express.Router(); // definir rotas apenas para usuarios

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, { // add o hash ao token
		expiresIn: 86400, // quando vai expirar o token
	});
}

router.post("/register", async (req, res) => {
	const {
		email
	} = req.body;

	try {
		// verifica se o email ja existe
		if (
			await User.findOne({
				email,
			})
		)
			return res.status(400).send({
				error: "User already exists",
			});
		const user = await User.create(req.body);
		user.password = undefined; // tira o email na hora do retorno para o usuário
		return res.send({
			user,
			token: generateToken({
				id: user.id
			})
		});
	} catch (err) {
		return res.status(400).send({
			error: "Registration failed",
		});
	}
});

router.post("/authenticate", async (req, res) => {
	const {
		email,
		password
	} = req.body;

	// vai procurar um usuario pelo email e senha,
	// e como a senha não pode ser mostrada quando
	// chamar para ver o usuario, tem que colocar .select('+password')
	const user = await User.findOne({
		email,
	}).select("+password");

	if (!user)
		return res.status(400).send({
			error: "User not found",
		});
	// comparar a senha que veio com a salva no banco
	if (!(await bcrypt.compare(password, user.password)))
		return res.status(400).send({
			error: "Invalid Password",
		});
	user.password = undefined; // tira o email na hora do retorno para o usuário


	res.send({
		user,
		token: generateToken({
			id: user.id
		})
	});
});

module.exports = (app) => app.use("/auth", router);