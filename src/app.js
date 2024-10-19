import express from "express";
import DadosContaController from './controllers/dadosContaController.js';
import GetDadospdfController from "./controllers/getDadospdfController.js";

const app = express();
app.use(express.json());

// Rota para obter os dados da fatura de energia do numero_cliente
app.get("/dados/:numero_cliente", async (req, res) => {
   try {
      const { numero_cliente } = req.params; 
       const dados = await DadosContaController.getDados(numero_cliente, res); 
       return res.status(200).json(dados); 
   } catch (error) {
       console.error('Erro ao obter dados:', error); 
       return res.status(500).json({ message: 'Erro ao obter dados', error: error.message });
   }
});


// Rota para obter os dados de todas as fatura de energia
app.get("/dados", async (req, res) => {
    try {
        const dados = await DadosContaController.getDados(false, res);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter dados', error: error.message });
    }
});

// Rota para extrair dados de um único PDF
app.post("/extraiDadosPdfUnico", async (req, res) => {
    try {
        const dados = await GetDadospdfController.extrairDadosPDF(req.body.caminho, res);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao extrair dados do PDF', error: error.message });
    }
});

// Rota para extrair dados de um lote de PDFs
app.post("/extraiDadosPdfLote", async (req, res) => {
    try {
        const dados = await GetDadospdfController.extrairDadosPDFLote(req.body, res);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao extrair dados de lote de PDFs', error: error.message });
    }
});

// Rota para inserir os dados da fatura em formato JSON
app.post("/dadosJson", async (req, res) => {
    try {
        const resultado = await DadosContaController.inserirDados(req.body, res);
        return res.status(201).json({ message: resultado });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao inserir dados', error: error.message });
    }
});

export default app;
