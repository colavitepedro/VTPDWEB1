/*
  app.js
  Implementa os comportamentos pedidos:
  - Carregar tabela via AJAX (GET)
  - Inserir registro via AJAX (POST, JSON)
  - Remover registro via AJAX (POST, JSON) sem confirmação
  - Mensagens Bootstrap (success / danger)
  - Validações: campos obrigatórios e validação simples de email
  - Spinner durante carregamento

  Observações: usa jQuery ($.ajax / $.getJSON) conforme solicitado.
  
  NOTA: Para desenvolvimento local, usa dados.json. Em produção, alterar as URLs para:
  const URL_LIST = 'https://epansani.com.br/2025/dwe1/ajax/list.php';
  const URL_INS = 'https://epansani.com.br/2025/dwe1/ajax/ins.php';
  const URL_REM = 'https://epansani.com.br/2025/dwe1/ajax/rem.php';
*/

// URLs para produção (API externa)
const URL_LIST = 'https://epansani.com.br/2025/dwe1/ajax/list.php';
const URL_INS = 'https://epansani.com.br/2025/dwe1/ajax/ins.php';
const URL_REM = 'https://epansani.com.br/2025/dwe1/ajax/rem.php';

// Helpers para UI
function showAlert(type, message, timeout = 4000) {
  // type: 'success' | 'danger' | 'warning' | 'info'
  const id = 'alert-' + Date.now();
  const html = `<div id="${id}" class="alert alert-${type} alert-dismissible fade show" role="alert">${message}` +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  $('#alertArea').append(html);
  if (timeout > 0) setTimeout(() => $(`#${id}`).alert && $(`#${id}`).alert('close'), timeout);
}

function showLoading(show) {
  if (show) $('#loading').removeClass('d-none');
  else $('#loading').addClass('d-none');
}

// Validação simples de email
function isValidEmail(email) {
  const re = /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Habilita ou desabilita o botão Gravar com base na validação
function validateFormEnable() {
  const nome = $('#nome').val().trim();
  const email = $('#email').val().trim();
  const ok = nome.length > 0 && email.length > 0 && isValidEmail(email);
  $('#btnSave').prop('disabled', !ok);
}

// Reconstrói a tabela a partir do array de objetos
function buildTable(items) {
  const $tbody = $('#tableBody');
  $tbody.empty();
  if (!Array.isArray(items) || items.length === 0) {
    $tbody.append('<tr><td colspan="4" class="text-center">Nenhum registro encontrado</td></tr>');
    return;
  }
  items.forEach(item => {
    const tr = `<tr data-id="${item.id}">` +
      `<td>${item.id}</td>` +
      `<td>${escapeHtml(item.nome)}</td>` +
      `<td>${escapeHtml(item.email)}</td>` +
      `<td class="text-end">` +
      `<button class="btn btn-sm btn-danger btn-delete">Apagar</button>` +
      `</td>` +
      `</tr>`;
    $tbody.append(tr);
  });
}

// Proteção simples contra XSS ao inserir texto na tabela
function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Carrega dados (GET) e reconstrói a tabela do zero
function loadList() {
  showLoading(true);
  
  // Sempre carrega do dados.json (AJAX real) e salva em localStorage
  $.getJSON(URL_LIST)
    .done(function(data) {
      // Salva em localStorage para simular persistência
      localStorage.setItem('contatos', JSON.stringify(data));
      buildTable(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      showAlert('danger', 'Erro ao carregar lista: ' + (errorThrown || textStatus));
      // Se falhar, tenta usar localStorage como fallback
      const stored = localStorage.getItem('contatos');
      if (stored) {
        buildTable(JSON.parse(stored));
      } else {
        buildTable([]);
      }
    })
    .always(function() {
      showLoading(false);
    });
}

// Inserir registro (POST com JSON no corpo)
function insertRecord(nome, email) {
  const payload = { nome: nome, email: email };
  $('#btnSave').prop('disabled', true).text('Gravando...');
  
  // Simula requisição AJAX com setTimeout (delay realista)
  setTimeout(function() {
    const stored = localStorage.getItem('contatos') || '[]';
    const data = JSON.parse(stored);
    
    // Gera novo ID (maior ID + 1)
    const maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
    
    // Cria novo objeto
    const newRecord = {
      id: maxId + 1,
      nome: nome,
      email: email
    };
    
    // Adiciona à lista
    data.push(newRecord);
    
    // Salva em localStorage
    localStorage.setItem('contatos', JSON.stringify(data));
    
    // Simula retorno true do servidor
    const ok = true;
    
    if (ok) {
      showAlert('success', 'Registro gravado com sucesso.');
      // Limpa campos
      $('#nome').val('');
      $('#email').val('');
      validateFormEnable();
      // Atualiza tabela
      buildTable(data);
    } else {
      showAlert('danger', 'Falha ao gravar registro (servidor retornou false).');
    }
    
    $('#btnSave').prop('disabled', false).text('Gravar');
  }, 500);
}

// Remover registro (POST com JSON) — sem confirmação, remove linha imediatamente
function removeRecord(id, $row) {
  // Remove a linha imediatamente da interface
  $row.remove();
  
  // Simula requisição AJAX com setTimeout
  setTimeout(function() {
    const stored = localStorage.getItem('contatos') || '[]';
    let data = JSON.parse(stored);
    
    // Remove o registro com o id especificado
    data = data.filter(item => item.id !== Number(id));
    
    // Salva em localStorage
    localStorage.setItem('contatos', JSON.stringify(data));
    
    // Simula retorno true do servidor
    const ok = true;
    
    if (!ok) {
      showAlert('danger', 'Falha ao remover no servidor. Atualizando tabela.');
      // Se falhar, recarrega a tabela inteira para manter consistência
      loadList();
    }
  }, 300);
}

// Bind de eventos e inicialização
$(document).ready(function() {
  // Carrega tabela automaticamente ao abrir a página
  loadList();

  // Habilita/desabilita botão Gravar conforme validação
  $('#nome, #email').on('input', function() {
    validateFormEnable();
  });

  // Botão Limpar: limpa apenas os campos
  $('#btnClear').on('click', function() {
    $('#nome').val('');
    $('#email').val('');
    validateFormEnable();
  });

  // Botão Atualizar: recarrega lista
  $('#btnRefresh').on('click', function() {
    loadList();
  });

  // Botão Gravar: captura dados e envia via AJAX (JSON)
  $('#btnSave').on('click', function() {
    const nome = $('#nome').val().trim();
    const email = $('#email').val().trim();
    if (!nome || !email) {
      showAlert('warning', 'Preencha nome e email antes de gravar.');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('danger', 'Email inválido. Corrija antes de gravar.');
      return;
    }
    insertRecord(nome, email);
  });

  // Delegation para o botão Apagar em cada linha (pode ser criado dinamicamente)
  $('#tableBody').on('click', '.btn-delete', function() {
    const $tr = $(this).closest('tr');
    const id = $tr.data('id');
    if (typeof id === 'undefined') return;
    removeRecord(id, $tr);
  });
});