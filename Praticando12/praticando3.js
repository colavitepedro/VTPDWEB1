$(document).ready(function() {
  $('#lampada').mouseenter(function() {
    $(this).attr('src', 'acesa.png');
    $('#status').text('Lâmpada acesa');
    $('body').css({
      'background-color': 'white',
      'color': 'black'
    });
  });
  
  $('#lampada').mouseleave(function() {
    $(this).attr('src', 'apagada.png');
    $('#status').text('Lâmpada apagada');
    $('body').css({
      'background-color': '#1a1a1a',
      'color': 'white'
    });
  });
});
