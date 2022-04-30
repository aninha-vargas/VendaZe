const express =  require('express');
const NFCompra = require('../models/NFCompra');
const app = express();

app.use(express.json());

app.get("/listarNFCompra", async (req, res) => {
    const nfCompra = await NFCompra.findAll();
    return res.send(nfCompra);
});

app.post("/cadastrarNFCompra", async (req, res) => {
    console.log(req.body);
    await NFCompra.create(req.body)
    .then(() => {
        res.send("NF cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! NF NÂO cadastrada")
    });
});
/*
app.put("/atualizarNFCompra/:id", async (req, res) => {
    console.log("Atualizar ------------");
    await NFCompra.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("NFCompra atualizada com sucesso!");
    });
});

app.delete("/deletarNFCompra/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await NFCompra.update({ inativo: 0 }, {
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
