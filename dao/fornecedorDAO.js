const express =  require('express');
const Fornecedor = require('../models/Fornecedor');
const app = express();

app.use(express.json());

app.get("/listarFornecedores", async (req, res) => {
    const fornecedores = await Fornecedor.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(fornecedores);
});

app.post("/cadastrarFornecedor", async (req, res) => {
    console.log(req.body);
    await Fornecedor.create(req.body)
    .then(() => {
        res.send("Fornecedor cadastrado com sucesso!");
    });
});

app.put("/atualizarFornecedor/:cnpj", async (req, res) => {
    console.log("Atualizar ------------");
    await Fornecedor.update(req.body, {
        where : {
            cnpj: req.params.cnpj
        }
    })
    .then(() => {
        res.send("Fornecedor atualizado com sucesso!");
    });
});

app.delete("/deletarFornecedor/:cnpj", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Fornecedor.update({ inativo: 0 }, {
        where : {
            cnpj: req.params.cnpj
        }
    })
    .then(() => {
        res.send("Fornecedor deletado com sucesso!");
    });
    
});

app.listen(8080, () => {
    console.log("Servidor rodando!");
});
