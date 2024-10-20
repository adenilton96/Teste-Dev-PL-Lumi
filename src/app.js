import express from "express";
import fs from 'fs';
import path from 'path';
import cors from "cors"
import DadosContaController from './controllers/dadosContaController.js';
import GetDadospdfController from "./controllers/getDadospdfController.js";

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}))

app.get("/", async (req, res) => {
   const readmePath = path.join('', 'README.md');
   fs.readFile(readmePath, 'utf8', (err, data) => {
      if (err) {
         return res.status(500).send('Erro ao carregar o README.md');
      }
      res.setHeader('Content-Type', 'text/plain');
      res.send(data);
   });
});

app.get("/dados/:numero_cliente/:mes_referencia", async (req, res) => {
   try {
      const { numero_cliente, mes_referencia } = req.params; 
      const dados = await DadosContaController.getDados(req.params, res); 
      return res.status(200).json(dados); 
      
   } catch (error) {
       console.error('Erro ao obter dados:', error); 
       return res.status(500).json({ message: 'Erro ao obter dados', error: error.message });
   }
});

// Rota para obter os dados da fatura de energia do numero_cliente
app.get("/dados/:numero_cliente", async (req, res) => {
   try {
      const { numero_cliente } = req.params; 
       const dados = await DadosContaController.getDados(req.params, res); 
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


// Rota para extrair dados de um único PDF passando o local do arquivo
app.post("/extraiDadosPdfUnico", async (req, res) => {
    try {
        const dados = await GetDadospdfController.extrairDadosPDF(req.body.caminho, res);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao extrair dados do PDF', error: error.message });
    }
});

// Rota para extrair dados de um lote de PDFs passando o local da pasta com tdos ps PDFs
app.post("/extraiDadosPdfLote", async (req, res) => {
    try {
        const dados = await GetDadospdfController.extrairDadosPDFLote(req.body, res);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao extrair dados de lote de PDFs', error: error.message });
    }
});

export default app;
