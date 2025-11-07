let corOriginal = 'white';

const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const preview = document.getElementById('preview');
const message = document.getElementById('message');

function getColorName(element) {
  return element.id;
}

function getBackgroundColor(element) {
  return window.getComputedStyle(element).backgroundColor;
}

window.addEventListener('load', function() {
  const corSalva = localStorage.getItem('corFundo');
  if (corSalva) {
    document.body.style.backgroundColor = corSalva;
    corOriginal = corSalva;
  }
});   

boxes.forEach(box => {
  box.addEventListener('click', function() {
    const cor = getBackgroundColor(this);
    const nomeCor = getColorName(this);
    
    document.body.style.backgroundColor = cor;
    corOriginal = cor;
    
    localStorage.setItem('corFundo', cor);
    localStorage.setItem('nomeCor', nomeCor);
    
    message.textContent = `A cor ${nomeCor} foi salva no Local Storage do navegador.`;
  });

  box.addEventListener('mouseover', function() {
    const cor = getBackgroundColor(this);
    document.body.style.backgroundColor = cor;
    preview.style.display = 'block';
  });

  box.addEventListener('mouseout', function() {
    document.body.style.backgroundColor = corOriginal;
    preview.style.display = 'none';
  });
});

resetBtn.addEventListener('click', function() {
  document.body.style.backgroundColor = 'white';
  corOriginal = 'white';
  preview.style.display = 'none';
  message.textContent = '';
  localStorage.removeItem('corFundo');
  localStorage.removeItem('nomeCor');
});
