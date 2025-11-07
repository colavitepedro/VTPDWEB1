let nome = prompt("Por favor, digite seu nome:");

if (nome) {
  let mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Seja bem vindo, " + nome + "!";
} else {
  alert("Não informou o nome");
}

function adicionarTexto() {
  let conteudo = document.getElementById("conteudo");
  let novoParagrafo = document.createElement("p");
  novoParagrafo.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  conteudo.appendChild(novoParagrafo);
}

function removerTexto() {
  let conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = "";
}
