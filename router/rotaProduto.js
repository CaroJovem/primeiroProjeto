import {Router} from "express"
import ProdutoCtrl from "../control/produtoCtrl.js"

const rotaProduto = Router()
const prodCtrl = new ProdutoCtrl()
rotaProduto.post('/', prodCtrl.gravar)
.put('/', prodCtrl.atualizar)
.delete('/', prodCtrl.excluir)
.get('/', prodCtrl.consultar)
.get('/:id', prodCtrl.consultarPorId)

export default rotaProduto