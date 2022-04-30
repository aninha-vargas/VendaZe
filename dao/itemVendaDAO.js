const express =  require('express');
const ItemVenda = require('../models/ItemVenda');
const Estoque = require('../models/Estoque');
const app = express();

app.use(express.json());

app.get("/listarItemVenda", async (req, res) => {
    const itemvenda = await ItemVenda.findAll();
    return res.send(itemvenda);
});

app.post("/cadastrarItemVenda", async (req, res) => {
    console.log(req.body);
    await ItemVenda.create(req.body)
    .then(() => {
        res.send("Item Venda cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! item venda NÂO cadastrada")
    });

    const itemvenda = await ItemVenda.findAll({
        attributes: [
            'idItemVenda',
        ],
        order: [
            ['idItemVenda', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });
    const idItemVenda = itemvenda[0].idItemVenda;
    const tipoMovimentacao = "S";

    await Estoque.create({idItemVenda, tipoMovimentacao})
    .then(() => {
        console.log("Estoque cadastrado");
    }).catch(() => {
        res.send("ERRO! Estoque");
    });
});
/*
app.put("/atualizarItemVenda/:id", async (req, res) => {
    console.log("Atualizar ------------");
    await ItemVenda.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("ItemVenda atualizada com sucesso!");
    });
});

app.delete("/deletarItemVenda/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await ItemVenda.update({ inativo: 0 }, {
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
