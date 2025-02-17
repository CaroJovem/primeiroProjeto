import express from "express";
import autenticar from "./security/autenticar.js";
import session from "express-session";

const porta = 3006;
const localhost = "0.0.0.0";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "qualquercoisa",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 15
    }
}));

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login",(requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect('/paginainicial.html');
    } else {
        resposta.redirect('/login.html');
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html');
})

app.use(express.static("./public"));

//Disponibilizar o que esta na pasta privada
app.use(autenticar, express.static("./private"))

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
});