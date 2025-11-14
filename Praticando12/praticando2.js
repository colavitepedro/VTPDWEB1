let corOriginal = 'white';

const $boxes = $('.box');
const $resetBtn = $('#resetBtn');
const $preview = $('#preview');
const $message = $('#message');
const $body = $('body');

function getColorName(element) {
  return $(element).attr('id');
}

function getBackgroundColor(element) {
  return $(element).css('background-color');
}

$(function() {
  const corSalva = localStorage.getItem('corFundo');
  if (corSalva) {
    $body.css('background-color', corSalva);
    corOriginal = corSalva;
  }
});   

$boxes.on('click', function() {
  const cor = getBackgroundColor(this);
  const nomeCor = getColorName(this);
  
  $body.css('background-color', cor);
  corOriginal = cor;
  
  localStorage.setItem('corFundo', cor);
  localStorage.setItem('nomeCor', nomeCor);
  
  $message.text(`A cor ${nomeCor} foi salva no Local Storage do navegador.`);
});

$boxes.on('mouseover', function() {
  const cor = getBackgroundColor(this);
  $body.css('background-color', cor);
  $preview.show();
});

$boxes.on('mouseout', function() {
  $body.css('background-color', corOriginal);
  $preview.hide();
});

$resetBtn.on('click', function() {
  $body.css('background-color', 'white');
  corOriginal = 'white';
  $preview.hide();
  $message.text('');
  localStorage.removeItem('corFundo');
  localStorage.removeItem('nomeCor');
});
