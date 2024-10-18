import dbConnect from '../config/dbConnect.js';
class DadosContaController {

     static async getDados(req , res ) {
        try {
            const db = await dbConnect.connect();
            const res = await db.query("SELECT * FROM public.dados_fatura_energia ORDER BY id ASC ");
            console.log('recuperou dados do db');
            return {
                status: 200,
                dados: res.rows
            };  
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Ocorreu um erro ao retornar os dados` });
        }
        
    }
    
    static async inserirdados(dados, res) {
        try {
            const db = await dbConnect.connect();
            const sql = `INSERT INTO public.dados_fatura_energia(
                            numero_cliente,
                            mes_referencia,
                            eng_eletrica_qtd ,
                            eng_eletrica_valor,
                            eng_sceee_ims_qtd,
                            eng_sceee_ims_valor,
                            eng_compensada_qtd,
                            eng_compensada_valor,
                            contrib_ilum_publica_valor,
                            pdf_base64) 
                        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
           
            const values = [
                dados.numero_cliente,
                dados.mes_referencia,
                dados.eng_eletrica_qtd,
                dados.eng_eletrica_valor,
                dados.eng_sceee_ims_qtd,
                dados.eng_sceee_ims_valor,
                dados.eng_compensada_qtd,
                dados.eng_compensada_valor,
                dados.contrib_ilum_publica_valor,
                dados.pdf_base64];
                console.log(values);
            const res = await db.query(sql, values);
           
            console.log('inseril dados do db');
            return { 
                status: 201,
                message: `Cadastrado com sucesso!`
            };
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Ocorreu um erro ao Cadastrar` });
        }
        
    }
}
 export default DadosContaController;
