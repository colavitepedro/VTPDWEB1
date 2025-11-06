let nome = prompt("Qual é o seu nome?");

if (nome) {
  alert("Olá, " + nome + "! Seja bem-vindo(a)!");
  let sabeProgramar = confirm("Você sabe programar em JavaScript?");
    if (sabeProgramar) {
      alert("Que ótimo " + nome + ", espero que você aprenda ainda mais!");
    } else {
      alert("Não tem problema " + nome + ", você irá aprender agora!");
    }
} else {
  alert("Você cancelou o prompt");
}