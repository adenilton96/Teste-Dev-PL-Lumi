 import express from "express";
 import DadosContaController from './controllers/dadosContaController.js'
 import GetDadospdfController from "./controllers/getDadospdfController.js";
 
 const app = express();
 app.use(express.json());

 app.get("/", (req, res) => {
    res.status(200).send("Cruso de Nopde.js");
 });

 app.get("/dados",async (req, res) => {
   const dados = await DadosContaController.getDados(req, res);
   res.json(dados);
});

app.post("/dados",async (req, res) => {

   const dados = await GetDadospdfController.extrairDadosPDF();
   // const dados = await DadosContaController.inserirdados(req.body, res);

   res.json(dados);
});

 export default app;