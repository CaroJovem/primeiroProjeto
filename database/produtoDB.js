import conectar from "./conexao.js";
import Produto from "../model/produto.js";

export default class ProdutoDB {
    constructor() {
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS produto (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                nome VARCHAR(100) NOT NULL, 
                valor VARCHAR(30) NOT NULL, 
                autor VARCHAR(100) NOT NULL, 
                sobre TEXT NOT NULL, 
                dimensoes VARCHAR(100) NOT NULL, 
                img VARCHAR(100) NOT NULL, 
                edicao VARCHAR(100) NOT NULL, 
                idioma VARCHAR(50) NOT NULL, 
                paginas VARCHAR(10) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch(erro) {
            console.log(`Erro ao iniciar a tabela produto: ${erro}`);
        }
    }
    

    async gravar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
                const sql = `insert into produto(nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas)
                    values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const parametros = [
                    produto.nome,
                    produto.valor,
                    produto.autor,
                    produto.sobre,
                    produto.dimensoes,
                    produto.img,
                    produto.edicao,
                    produto.idioma,
                    produto.paginas
                ];
                const resultado = await conexao.query (sql, parametros);
                return await resultado[0].insertId;
        }
    }

    async atualizar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `update produto set
                nome = ?, 
                valor = ?, 
                autor = ?, 
                sobre = ?, 
                dimensoes = ?, 
                img = ?, 
                edicao = ?, 
                idioma = ?, 
                paginas = ?
                where id = ?`;
            const parametros = [
                produto.nome,
                produto.valor,
                produto.autor,
                produto.sobre,
                produto.dimensoes,
                produto.img,
                produto.edicao,
                produto.idioma,
                produto.paginas,
                produto.id // Adicionado o ID no final do array
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão após a execução
        }
    }

    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `delete from produto where id = ?`;
            const parametros = [produto.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `select * from produto order by nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaProdutos = [];
        for (const registro of registros) {
            const produto = new Produto(
                registro.id,
                registro.nome,
                registro.valor,
                registro.autor,
                registro.sobre,
                registro.dimensoes,
                registro.img,
                registro.edicao,
                registro.idioma,
                registro.paginas
            );
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }
    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = `select * from produto where id = ?`;
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        await conexao.release();
        if (registros.length > 0) {
            const registro = registros[0];
            return new Produto(
                registro.id,
                registro.nome,
                registro.valor,
                registro.autor,
                registro.sobre,
                registro.dimensoes,
                registro.img,
                registro.edicao,
                registro.idioma,
                registro.paginas
            );
        } else {
            return null;
        }
    }
}