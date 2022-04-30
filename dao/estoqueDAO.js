const express =  require('express');
const sequelize = require('../models/db');
const Estoque = require('../models/Estoque');
const itemCompra = require('../models/itemCompra');
const app = express();

app.use(express.json());


app.get("/listarEstoqueSaida", async (req, res) => {
    const estoque = await Estoque.findAll({
        attributes: [
            'idEstoque','idItemVenda','tipoMovimentacao','createdAt'
        ],
        where: {
            tipoMovimentacao: "S"
        }
    });
    return res.send(estoque);
});

app.get("/listarEstoqueEntrada", async (req, res) => {
    const estoque = await Estoque.findAll({
       include: [{
           model: sequelize.model(itemCompra),
           required: true,
           attributes: ['descricaoProduto'],
       }],
    });
    return res.send(estoque);
});

app.listen(8080, () => {
    console.log("Servidor rodando!");
});
