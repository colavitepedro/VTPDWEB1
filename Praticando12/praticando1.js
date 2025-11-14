let nome = prompt("Por favor, digite seu nome:");

if (nome) {
  $("#mensagem").text("Seja bem vindo, " + nome + "!");
} else {
  alert("Não informou o nome");
}

function adicionarTexto() {
  let novoParagrafo = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
  $("#conteudo").append(novoParagrafo);
}

function removerTexto() {
  $("#conteudo").empty();
}
