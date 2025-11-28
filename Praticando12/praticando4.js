$(document).ready(function() {
  let quadradoAtivo = null;
  const velocidade = 10; 

  $('.quadrado').click(function() {
    if (quadradoAtivo && !$(this).hasClass('ativo')) {
      alert('Clique novamente no quadrado ativo para desativá-lo antes de selecionar outro.');
      return;
    }
    if ($(this).hasClass('ativo')) {
      const originalLeft = $(this).data('original-left');
      const originalTop = $(this).data('original-top');
      $(this).css({
        left: originalLeft + 'px',
        top: originalTop + 'px'
      });
      $(this).removeClass('ativo');
      quadradoAtivo = null;
    } else {
      $('.quadrado').removeClass('ativo');
      $(this).addClass('ativo');
      quadradoAtivo = $(this);
    }
  });

  $(document).keydown(function(e) {
    if (quadradoAtivo) {
      const currentLeft = parseInt(quadradoAtivo.css('left'));
      const currentTop = parseInt(quadradoAtivo.css('top'));
      
      switch(e.key.toLowerCase()) {
        case 'w':
          quadradoAtivo.css('top', (currentTop - velocidade) + 'px');
          break;
        case 'a': 
          quadradoAtivo.css('left', (currentLeft - velocidade) + 'px');
          break;
        case 's': 
          quadradoAtivo.css('top', (currentTop + velocidade) + 'px');
          break;
        case 'd':
          quadradoAtivo.css('left', (currentLeft + velocidade) + 'px');
          break;
      }
      
      if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    }
  });
});
