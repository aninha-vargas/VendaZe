const express =  require('express');
const NFVenda = require('../models/NFVenda');
const app = express();

app.use(express.json());

app.get("/listarNFVenda", async (req, res) => {
    const nfVendas = await NFVenda.findAll();
    return res.send(nfVendas);
});

app.post("/cadastrarNFVenda", async (req, res) => {
    console.log(req.body);
    await NFVenda.create(req.body)
    .then(() => {
        res.send("NF cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! NF NÂO cadastrada")
    });
});
/*
app.put("/atualizarNFVenda/:id", async (req, res) => {
    console.log("Atualizar ------------");
    await NFVenda.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("NFVenda atualizada com sucesso!");
    });
});

app.delete("/deletarNFVenda/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await NFVenda.update({ inativo: 0 }, {
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
