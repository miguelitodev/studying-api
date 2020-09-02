const mongoose = require("../database/index");
const bcripty = require("bcryptjs");

// Schema é o que vamos ter dentro da tabela user no banco de dados
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// funcao que vai executar antes de salvar o usuário
UserSchema.pre("save", async function (next) {
	const hash = await bcripty.hash(this.password, 10); // numero de round da encriptação
	this.password = hash;
	next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
