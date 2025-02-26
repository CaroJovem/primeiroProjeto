import express from "express";
import autenticar from "./security/autenticar.js";
import session from "express-session";
import ProdutoDB from "./database/produtoDB.js";
import Produto from "./model/produto.js";

const porta = 3006;
const localhost = "0.0.0.0";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "qualquercoisa",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));

// Rota para cadastrar produtos
app.post("/api/produtos", async (req, res) => {
    try {
        const produto = new Produto(
            req.body.id,
            req.body.nome,
            req.body.valor,
            req.body.autor,
            req.body.sobre,
            req.body.dimensoes,
            req.body.img,
            req.body.edicao,
            req.body.idioma,
            req.body.paginas
        );

        const db = new ProdutoDB();
        await db.gravar(produto);
        res.status(201).json({ message: "Produto cadastrado com sucesso!" });
    } catch (erro) {
        console.error("Erro ao gravar produto:", erro);
        res.status(500).json({ message: "Erro ao cadastrar produto." });
    }
});

// Outras rotas existentes...
app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.post("/login", (requisicao, resposta) => {
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
});

app.use(express.static("./public"));
app.use(autenticar, express.static("./private"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

/*// Fahrenheit 451
async function inserirFahrenheit() {
    const produto = new Produto(
        "002",
        "Fahrenheit 451",
        "39.90",
        "Ray Bradbury",
        "Fahrenheit 451 é um clássico da ficção científica que retrata um futuro distópico onde os livros são proibidos...",
        "13.97 x 1.24 x 21.59 cm",
        "51tAD6LyZ-L._SL1360_.jpg",
        "Biblioteca Azul; 1ª edição (1 junho 2012)",
        "Português",
        "216"
    );

    try {
        const db = new ProdutoDB();
        await db.gravar(produto);
        console.log("Produto Fahrenheit 451 cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar o produto:", erro);
    }
}

// Senhor das Moscas
async function inserirSenhorDasMoscas() {
    const produto = new Produto(
        "003",
        "Senhor das Moscas",
        "45.90",
        "William Golding",
        "Senhor das Moscas é um dos romances essenciais da literatura mundial...",
        "23.2 x 15 x 1.2 cm",
        "A1bFiBBPWFS._SL1500_.jpg",
        "Alfaguara; 2ª edição (7 junho 2021)",
        "Português",
        "216"
    );

    try {
        const db = new ProdutoDB();
        await db.gravar(produto);
        console.log("Produto Senhor das Moscas cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar o produto:", erro);
    }
}

// Marvel Guerra Civil: Guerras Secretas
async function inserirMarvelGuerraCivil() {
    const produto = new Produto(
        "004",
        "Marvel Guerra Civil: Guerras Secretas",
        "99.90",
        "Alex Irvine, Stuart Moore",
        "Guerra Civil e Guerras Secretas são duas sagas icônicas da Marvel Comics...",
        "21.6 x 13.8 cm",
        "71qMpn5jDWL._SL1500_.jpg",
        "Novo Século; 1ª edição (1 janeiro 2016)",
        "Português",
        "618"
    );

    try {
        const db = new ProdutoDB();
        await db.gravar(produto);
        console.log("Produto Marvel Guerra Civil cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar o produto:", erro);
    }
}

// Alice Através do Espelho
async function inserirAliceAtravésDoEspelho() {
    const produto = new Produto(
        "005",
        "Alice Através do Espelho",
        "50.84",
        "Lewis Carroll",
        "É com a já conhecida ironia que permeia seus escritos que Carroll retorna à sua obra-prima...",
        "23.4 x 15.8 x 1.8 cm",
        "71aV8Gimo5L._SL1200_.jpg",
        "Darkside; 1ª edição (7 abril 2021)",
        "Português",
        "192"
    );

    try {
        const db = new ProdutoDB();
        await db.gravar(produto);
        console.log("Produto Alice Através do Espelho cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar o produto:", erro);
    }
}

// Função para inserir todos os produtos
async function inserirTodosProdutos() {
    try {
        await inserirFahrenheit();
        await inserirSenhorDasMoscas();
        await inserirMarvelGuerraCivil();
        await inserirAliceAtravésDoEspelho();
        console.log("Todos os produtos foram cadastrados com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar produtos:", erro);
    }
}
inserirTodosProdutos();*/

/*async function removerProduto() {
    const produto = new Produto("001");//ID

    try {
        const db = new ProdutoDB();
        await db.excluir(produto);
        console.log("Produto removido com sucesso!");
    } catch (erro) {
        console.error("Erro ao excluir o produto:", erro);
    }
}
removerProduto();*/

/*async function adicionarProduto() {
    const produto = new Produto(
        "001", 
        "O Senhor dos Anéis", 
        "99.90", 
        "J.R.R. Tolkien", 
        "Uma história épica da Terra Média.", 
        "23 x 16 x 4 cm", 
        "senhor_dos_aneis.jpg", 
        "HarperCollins; 1ª edição", 
        "Português", 
        "1200"
    );

    try {
        const db = new ProdutoDB();
        await db.gravar(produto);
        console.log("Produto cadastrado com sucesso!");
    } catch (erro) {
        console.error("Erro ao cadastrar o produto:", erro);
    }
}
adicionarProduto();*/

/*async function atualizarProduto() {
    const produto = new Produto(
        "001", 
        "O Senhor dos Anéis - Versão Estendida", 
        "109.90", 
        "J.R.R. Tolkien", 
        "Edição especial", 
        "23 x 16 x 4 cm", 
        "fsfsfsfsf.jpg", 
        "2ª edição", 
        "Português", 
        "1250"
    );

    try {
        const db = new ProdutoDB();
        await db.alterar(produto);
        console.log("Produto atualizado com sucesso!");
    } catch (erro) {
        console.error("Erro ao atualizar o produto:", erro);
    }
}
atualizarProduto();*/

/*async function listarProdutos() {
    try {
        const db = new ProdutoDB();
        const produtos = await db.consultar();
        
        console.log("Lista de Produtos:", produtos.map(p => p.toJSON()));
    } catch (erro) {
        console.error("Erro ao consultar os produtos:", erro);
    }
}

listarProdutos();*/