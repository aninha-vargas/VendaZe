const express =  require('express');
const app = express();
const Produto = require('../models/Produto');

app.use(express.json());

app.get("/listarProdutos", async (req, res) => {
    const produtos = await Produto.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(produtos);
});

app.post("/cadastrarProduto", async (req, res) => {
    console.log(req.body);
    await Produto.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto cadastrado com sucesso!"
        });
    });
});

app.put("/atualizar/:id", async (req, res) => {
    await Produto.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Produto atualizado com sucesso!");
    });
});

app.delete("/deletar/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Produto.update({ inativo: 0 }, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Produto deletado com sucesso!");
    });
    
});

app.listen(8080, () => {
    console.log("Servidor rodando!");
});
