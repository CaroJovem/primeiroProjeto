import express from "express";
import autenticar from "./security/autenticar.js";

const porta = 3006;
const localhost = "0.0.0.0";

const app = express();

app.use(express.static("./public"));

//Disponibilizar o que esta na pasta privada
app.use(autenticar, express.static("./private"))

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em ${localhost}: ${porta}`)
});
