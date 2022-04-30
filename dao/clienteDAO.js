const express =  require('express');
const Cliente = require('../models/Cliente');
const app = express();

app.use(express.json());

app.get("/listarCliente", async (req, res) => {
    const clientes = await Cliente.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(clientes);
});

app.post("/cadastrarCliente", async (req, res) => {
    console.log(req.body);
    await Cliente.create(req.body)
    .then(() => {
        res.send("Cliente cadastrado com sucesso!");
    });
});

app.put("/atualizarCliente/:cpf", async (req, res) => {
    console.log("Atualizar ------------");
    await Cliente.update(req.body, {
        where : {
            cpf: req.params.cpf
        }
    })
    .then(() => {
        res.send("Cliente atualizado com sucesso!");
    });
});

app.delete("/deletarCliente/:cpf", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Cliente.update({ inativo: 0 }, {
        where : {
            cpf: req.params.cpf
        }
    })
    .then(() => {
        res.send("Cliente deletado com sucesso!");
    });
    
});

app.listen(8080, () => {
    console.log("Servidor rodando!");
});
