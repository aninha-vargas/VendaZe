const Sequelize = require('sequelize');

const sequelize = new Sequelize("estoque", "root", "", {
    host : 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log("Conn realizada com sucesso!!")
}).catch(() => {
    console.log(" Erro!! ao conectar com o bd");
})

module.exports = sequelize;