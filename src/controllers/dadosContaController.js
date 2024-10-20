import { DadosFaturaEnergia } from '../models/DadosFaturaEnergia.js';
import { converterParaDecimal } from '../utils/converterParaDecimal.js';

class DadosContaController {
    static async getDados(params, res) {
        try {
          
            const numero_cliente = params.numero_cliente; 
            const mes_referencia = params.mes_referencia;
            const whereClause = {};
            
            if (numero_cliente) {
                whereClause.numero_cliente = numero_cliente;
            }
            
            if (mes_referencia) {
                whereClause.mes_referencia = mes_referencia;
            }

            const result = await DadosFaturaEnergia.findAll({
                where: whereClause,
                order: [['id', 'ASC']]
            });

            return {
                dados: result
            };
        } catch (error) {
            console.error(`Erro ao retornar os dados: ${error.message}`);
            return {
                message: `${error.message} - Ocorreu um erro ao retornar os dados`
            };
        }
    }


    // Método para inserir dados
    static async inserirDados(dados, res) {
        try {
            const novoDado = await DadosFaturaEnergia.create({
                numero_cliente: dados.numeroCliente,
                mes_referencia: dados.mesReferencia,
                eng_eletrica_qtd: dados.energiaEletricaQtd,
                eng_eletrica_valor: converterParaDecimal(dados.energiaEletricaValor),
                eng_sceee_ims_qtd: dados.energiaSCEEEQtd,
                eng_sceee_ims_valor: converterParaDecimal(dados.energiaSCEEEValor),
                eng_compensada_qtd: dados.energiaCompensadaQtd,
                eng_compensada_valor: converterParaDecimal(dados.energiaCompensadaValor),
                contrib_ilum_publica_valor: converterParaDecimal(dados.iluminacaoPublica),
                pdf: dados.pdf_base64
            });

            return {
                message: 'Cadastrado com sucesso!',
                dado: novoDado
            };
        } catch (error) {
            console.error(`Erro ao cadastrar os dados: ${error.message}`);
            return {
                message: 'Ocorreu um erro ao cadastrar os dados'
            };
        }
    }
}

export default DadosContaController;
