import fs from 'fs';
import { getDocument } from 'pdfjs-dist';
import DadosContaController from './dadosContaController.js';
import { converterMesAnoParaData } from '../utils/fomataData.js';
import path from 'path';

class GetDadospdfController {
    static async extrairDadosPDF(pdfPath, res) {
        try {
            // Verifica se o arquivo existe
            if (!fs.existsSync(pdfPath)) {
                return { error: 'Arquivo não encontrado!' };
            }

            const fdfData = fs.readFileSync(pdfPath);
            const base64Data = fdfData.toString('base64');
            const data = new Uint8Array(fdfData);
            const loadingTask = getDocument(data);

            const pdf = await loadingTask.promise;
            const numPages = pdf.numPages;
            let textContent = '';

            // Processa cada página do PDF
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContentPage = await page.getTextContent();
                const pageText = textContentPage.items.map(item => item.str).join(' ');
                textContent += pageText + '\n';
            }

            // Extrai e processa os dados
            const dadosExtraidos = this.processarDados(textContent, base64Data);

            // Insere os dados no banco
            const resultado = await DadosContaController.inserirDados(dadosExtraidos, res);

            // Retorna o resultado da inserção
            return { message: 'Dados extraídos e cadastrados com sucesso!', resultado };
        } catch (error) {
            console.error('Erro ao extrair os dados do PDF:', error);
            return { message: 'Ocorreu um erro ao extrair os dados do PDF', error: error.message };
        }
    }

    static processarDados(dados, base64Data) {
        const texto = dados.replace(/\./g, '');

        // Regex para extrair os dados
        const numeroClienteRegex = /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)/;
        const mesReferenciaRegex = /Referente a\s+Vencimento\s+Valor a pagar \(R\$\)\s+([\s\S]*?)(?=\s+\d{2}\/\d{2}\/\d{4}\s+\d+,\d+)/;
        const energiaEletricaRegex = /Energia Elétrica   kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/;
        const energiaSCEEERegex = /Energia SCEE s\/ ICMS   kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/;
        const energiaCompensadaRegex = /Energia compensada GD I\s+kWh\s+(\d+)\s+([\d,.]+)\s+([-]?[\d,.]+)\s+([\d,.]+)/;
        const iluminacaoPublicaRegex = /Contrib Ilum Publica Municipal\s+([\d,.]+)/;

        // Extração dos valores
        const numeroCliente = texto.match(numeroClienteRegex)?.[1] || 'N/A';
        const mesReferencia = texto.match(mesReferenciaRegex)?.[1] || 'N/A';
        const energiaEletrica = texto.match(energiaEletricaRegex) || ['N/A', 'N/A'];
        const energiaSCEEE = texto.match(energiaSCEEERegex) || ['N/A', 'N/A'];
        const energiaCompensada = texto.match(energiaCompensadaRegex) || ['N/A', 'N/A'];
        const iluminacaoPublica = texto.match(iluminacaoPublicaRegex)?.[1] || 'N/A';
        const pdf_base64 = base64Data;

        // Retorna os dados processados
        return {
            numeroCliente,
            mesReferencia: converterMesAnoParaData(mesReferencia),
            energiaEletricaQtd: energiaEletrica[1],
            energiaEletricaValor: energiaEletrica[2],
            energiaSCEEEQtd: energiaSCEEE[1],
            energiaSCEEEValor: energiaSCEEE[2],
            energiaCompensadaQtd: energiaCompensada[1],
            energiaCompensadaValor: energiaCompensada[3],
            iluminacaoPublica,
            pdf_base64
        };
    }

    static async extrairDadosPDFLote(body, res) {
        try {
            const pastaPath = body.caminhoPasta;

            // Verifica se o diretório existe
            if (!fs.existsSync(pastaPath)) {
                return { error: 'Pasta não encontrada!' };
            }

            // Lê todos os arquivos da pasta
            const arquivos = fs.readdirSync(pastaPath).filter(file => file.endsWith('.pdf'));

            if (arquivos.length === 0) {
                return { message: 'Nenhum arquivo PDF encontrado na pasta.' };
            }

            const resultados = [];

            // Processa cada arquivo PDF
            for (const arquivo of arquivos) {
                const pdfPath = path.join(pastaPath, arquivo);
                const resultado = await this.extrairDadosPDF(pdfPath, res);
                resultados.push({ arquivo, resultado });
            }

            // Retorna os resultados após o processamento de todos os PDFs
            return { message: 'Processamento concluído!', resultados };
        } catch (error) {
            console.error('Erro ao processar os PDFs em lote:', error);
            return { message: 'Ocorreu um erro ao processar os PDFs em lote', error: error.message };
        }
    }
}

export default GetDadospdfController;
