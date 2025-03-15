import Produto from "../model/produto.js";

export default class ProdutoCtrl{
    //Métodos
    // para gravar dados do clinte vindas de um usuario por meio do protocolo http
    gravar(requisicao, resposta){
        resposta.type("application/json")
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const valor = dados.valor;
            const autor = dados.autor;
            const sobre = dados.sobre;
            const dimensoes = dados.dimensoes;
            const img = dados.img;
            const edicao = dados.edicao;
            const idioma = dados.idioma;
            const paginas = dados.paginas;
            if(nome && valor && autor && sobre && dimensoes && img && edicao && idioma && paginas){
                //grava normalmente
                const produto = new Produto(0, nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas)
                produto.gravar().then(() =>{
                    resposta.status(200).json({
                        status: true,
                        id: produto.id,
                        mensagem: "produto gravado com sucesso!"
                    })
                })
                .catch((erro) =>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro
                    })
                })
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamnte todos os dados do produto!"
                })
            }
        }
        else{
            // erro da parte do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou produto no formato JSON não fornecido!"
        });
    }
    }
    atualizar(requisicao, resposta) {
        resposta.type("application/json");
    
        // Verifica o método e o tipo de conteúdo
        console.log("Método da requisição:", requisicao.method);
        console.log("Tipo de conteúdo:", requisicao.get('Content-Type'));
    
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            console.log("Corpo da requisição:", dados); // Log do corpo da requisição
    
            const id = dados.id;
            const nome = dados.nome;
            const valor = dados.valor;
            const autor = dados.autor;
            const sobre = dados.sobre;
            const dimensoes = dados.dimensoes;
            const img = dados.img;
            const edicao = dados.edicao;
            const idioma = dados.idioma;
            const paginas = dados.paginas;
    
            // Verifica os dados recebidos
            console.log("Dados recebidos:", { id, nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas });
    
            if (id && nome && valor && autor && sobre && dimensoes && img && edicao && idioma && paginas) {
                // Cria uma instância de Produto
                const produto = new Produto(id, nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas);
                console.log("Produto criado:", produto); // Log do produto criado
    
                // Chama o método atualizar
                produto.atualizar()
                    .then(() => {
                        console.log("Produto atualizado com sucesso!"); // Log de sucesso
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Produto atualizado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        console.error("Erro ao atualizar produto:", erro); // Log de erro
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message || "Erro interno no servidor."
                        });
                    });
            } else {
                console.error("Dados incompletos:", { id, nome, valor, autor, sobre, dimensoes, img, edicao, idioma, paginas }); // Log de dados incompletos
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados do produto!"
                });
            }
        } else {
            console.error("Método ou formato inválido"); // Log de método ou formato inválido
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou produto no formato JSON não fornecido!"
            });
        }
    }     
    excluir(requisicao, resposta){
        resposta.type("application/json")
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body
            const id = dados.id
            if(id){
                //excluir por ID
                const produto = new Produto(id)
                produto.excluir().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "produto excluido com sucesso!"
                    })
                })
                .catch((erro) =>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro
                    })
                })
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamnte ID do produto!"
                })
            }
        }
        else{
            // erro da parte do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou produto no formato JSON não fornecido!"
            });
        }
    }
    consultar(requisicao, resposta){
        resposta.type("application/json")
        if(requisicao.method === "GET"){
            //consulta normalmente
            const produto = new Produto()
            produto.consultar('').then((produtos) =>{
                resposta.status(200).json(produtos)
            })
            .catch((erro) =>{
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            })
        }
        else{
            // erro da parte do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou produto no formato JSON não fornecido!"
            });
        }
    }
    consultarPorId(requisicao, resposta) {
        resposta.type("application/json");
        const id = requisicao.params['id'];
        if (requisicao.method === "GET") {
            const produto = new Produto();
            produto.consultarPorId(id).then((produto) => {
                resposta.status(200).json(produto);
            })
            .catch((erro)=> {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }
}
