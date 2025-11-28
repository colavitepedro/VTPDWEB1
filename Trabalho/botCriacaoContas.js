const axios = require('axios');
const URL_CRIAR_CONTA = 'https://epansani.com.br/2025/dwe1/ajax/ins.php'; 
async function criarConta(nome, email) {
  try {
    const params = new URLSearchParams();
    params.append('nome', nome);
    params.append('email', email);
    const response = await axios.post(URL_CRIAR_CONTA, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    console.log('Conta criada:', response.data);
  } catch (error) {
    console.error('Erro ao criar conta:', error.response ? error.response.data : error.message);
  }
}

let contador = 1;
(async () => {
  while (true) {
  const nome = `BerardoCorinthiano`;
  const email = `beraamassa@corinthians.com`;
    await criarConta(nome, email);
    contador++;
    await new Promise(resolve => setTimeout(resolve, 100)); 
  }
})();
