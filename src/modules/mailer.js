const path = require("path");

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const {
    host,
    pass,
    port,
    user
} = require("../config/mail.json");

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

console.log(path.resolve());

module.exports = transport;