const path = require("path");

const nodemailer = require("nodemailer");
const hbs = require("handlebars");

const { host, pass, port, user } = require("../config/mail.json");

const transport = nodemailer.createTransport({
	host: host,
	port: pass,
	auth: {
		user: port,
		pass: user,
	},
});

transport.use(
	"compile",
	hbs({
		viewEngine: "handlebars",
		viewPath: path.resolve("./src/resources/mail/"),
		extName: ".html",
	})
);

module.exports = transport;
