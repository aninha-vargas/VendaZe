const express =  require('express');
const ItemCompra = require('../models/ItemCompra');
const Estoque = require('../models/Estoque');
const app = express();

app.use(express.json());

app.get("/listarItemCompra", async (req, res) => {
    const itemcompra = await ItemCompra.findAll({
        order: [
            ['idItemCompra', 'DESC']
        ],
        // limit: 1, //não entendi pq do listar 1???
    });
    // console.log(itemcompra);
    // const teste = JSON.stringify(itemcompra.value) + 1;
    // return res.send(teste);
    return res.send(itemcompra);
});
app.post("/cadastrarItemCompra", async (req, res) => {

    await ItemCompra.create(req.body)
    .then(() => {
        res.send("Item Compra cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! item Compra NÂO cadastrada");
    });

    const itemcompra = await ItemCompra.findAll({
        attributes: [
            'idItemCompra',
        ],
        order: [
            ['idItemCompra', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });
    const idItemCompra = itemcompra[0].idItemCompra;
    const tipoMovimentacao = "E";

    await Estoque.create({idItemCompra, tipoMovimentacao})
    .then(() => {
        console.log("Estoque cadastrado");
    }).catch(() => {
        res.send("ERRO! Estoque");
    });
});

/*
app.put("/atualizarItemCompra/:id", async (req, res) => {
    console.log("Atualizar ------------");
    await ItemCompra.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("ItemCompra atualizada com sucesso!");
    });
});

app.delete("/deletarItemCompra/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await ItemCompra.update({ inativo: 0 }, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("NF deletada com sucesso!");
    });
    
});
*/
app.listen(8080, () => {
    console.log("Servidor rodando!");
});
