const express = require("express");

const User = require("./../models/user"); // Model de user para fazer ações de login e cadastro

const router = express.Router(); // definir rotas apenas para usuarios

router.post("/register", async (req, res) => {
	const { email } = req.body;

	try {
		// verifica se o email ja existe
		if (await User.findOne({ email }))
			return res.status(400).send({ error: "User already exists" });
		const user = await User.create(req.body);
		user.password = undefined; // tira o email na hora do retorno para o usuário
		return res.send({
			user,
		});
	} catch (err) {
		return res.status(400).send({
			error: "Registration failed",
		});
	}
});

module.exports = (app) => app.use("/auth", router);
