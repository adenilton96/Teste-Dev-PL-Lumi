export function converterMesAnoParaData(mesAnoStr) {
   
    const meses = {
        'JAN': 0, 'FEV': 1, 'MAR': 2, 'ABR': 3,
        'MAI': 4, 'JUN': 5, 'JUL': 6, 'AGO': 7,
        'SET': 8, 'OUT': 9, 'NOV': 10, 'DEZ': 11
    };

    const [mesAbreviado, ano] = mesAnoStr.split('/');
    const mes = meses[mesAbreviado.toUpperCase()];
    const data = new Date(ano, mes, 1);
    const dataFormatada = data.toISOString().substring(0, 10);
console.log(dataFormatada,'111')
    return dataFormatada;
}