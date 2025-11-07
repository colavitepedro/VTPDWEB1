function calcular(operacao) {
    const numero1 = parseFloat(document.getElementById('numero1').value);
    const numero2 = parseFloat(document.getElementById('numero2').value);
    const resultadoInput = document.getElementById('resultado');
    
    if (isNaN(numero1) || isNaN(numero2)) {
        resultadoInput.value = 'Erro: Digite números válidos';
        return;
    }

    let resultado;
    switch(operacao) {
        case 'soma':
            resultado = numero1 + numero2;
            break;
        case 'subtracao':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacao':
            resultado = numero1 * numero2;
            break;
        case 'divisao':
            if (numero2 === 0) {
                resultadoInput.value = 'Erro: Divisão por zero';
                return;
            }
            resultado = numero1 / numero2;
            break;
        default:
            resultadoInput.value = 'Erro: Operação inválida';
            return;
    }
    resultadoInput.value = resultado % 1 === 0 ? resultado : resultado.toFixed(2);
}
