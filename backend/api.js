import express from "express";
import routes from "./Routes/apiRoutes.js";
import sequelize from "./Config/database.js";

const api = express()
const PORT = 5172

/*
try {
    await sequelize.authenticate(); //verifica a conexão com o banco de dados
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log("Modelos sincronizados com sucesso!");
} catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
}
*/

api.use(express.json())
api.use(routes)

api.get('/',async (req,res) => {
    res.send('hello world')
})

api.listen(PORT, () =>{
    console.log(`Servidor rodando na porta <http://localhost>:${PORT}`)
})