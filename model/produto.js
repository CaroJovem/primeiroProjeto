import ProdutoDB from "../database/produtoDB.js";

export default class Produto {
    // Atributos
    #id;
    #nome;
    #valor;
    #autor;
    #sobre;
    #dimensoes;
    #img;
    #edicao;
    #idioma;
    #paginas;

    constructor(id, nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas) {
        this.#id = id;
        this.#nome = nome;
        this.#valor = valor;
        this.#autor = autor;
        this.#sobre = sobre;
        this.#dimensoes = dimensoes;
        this.#img = img;
        this.#edicao = edicao;
        this.#idioma = idioma;
        this.#paginas = paginas;
    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get valor() {
        return this.#valor;
    }

    set valor(novoValor) {
        this.#valor = novoValor;
    }

    get autor() {
        return this.#autor;
    }

    set autor(novoAutor) {
        this.#autor = novoAutor;
    }

    get sobre() {
        return this.#sobre;
    }

    set sobre(novoSobre) {
        this.#sobre = novoSobre;
    }

    get dimensoes() {
        return this.#dimensoes;
    }

    set dimensoes(novoDimensoes) {
        this.#dimensoes = novoDimensoes;
    }

    get img() {
        return this.#img;
    }

    set img(novoImg) {
        this.#img = novoImg;
    }

    get edicao() {
        return this.#edicao;
    }

    set edicao(novaEdicao) {
        this.#edicao = novaEdicao;
    }

    get idioma() {
        return this.#idioma;
    }

    set idioma(novoIdioma) {
        this.#idioma = novoIdioma;
    }

    get paginas() {
        return this.#paginas;
    }

    set paginas(novaPaginas) {
        this.#paginas = novaPaginas;
    }

    // Formato JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            valor: this.#valor,
            autor: this.#autor,
            sobre: this.#sobre,
            dimensoes: this.#dimensoes,
            img: this.#img,
            edicao: this.#edicao,
            idioma: this.#idioma,
            paginas: this.#paginas
        };
    }

    async gravar() {
        const prodDB = new ProdutoDB();
        await prodDB.gravar(this);
    }

    async alterar() {
        const prodDB = new ProdutoDB();
        await prodDB.alterar(this);
    }

    async excluir() {
        const prodDB = new ProdutoDB();
        await prodDB.excluir(this);
    }

    async consultar() {
        const prodDB = new ProdutoDB();
        return await prodDB.consultar();
    }
}