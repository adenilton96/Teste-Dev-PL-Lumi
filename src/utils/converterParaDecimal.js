export function converterParaDecimal(valor) {
    const numeroFormatado = valor.replace(',', '.');
    const numeroDecimal = parseFloat(numeroFormatado);
    return numeroDecimal;
}