const URL_LIST = 'https://epansani.com.br/2025/dwe1/ajax/list.php';
const URL_INS = 'https://epansani.com.br/2025/dwe1/ajax/ins.php';
const URL_REM = 'https://epansani.com.br/2025/dwe1/ajax/rem.php';

function showAlert(type, message, timeout = 4000) {
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

function isValidEmail(email) {
  const re = /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function validateFormEnable() {
  const nome = $('#nome').val().trim();
  const email = $('#email').val().trim();
  const ok = nome.length > 0 && email.length > 0 && isValidEmail(email);
  $('#btnSave').prop('disabled', !ok);
}

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

function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function loadList() {
  showLoading(true);
  
  $.getJSON(URL_LIST)
    .done(function(data) {
      localStorage.setItem('contatos', JSON.stringify(data));
      buildTable(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      showAlert('danger', 'Erro ao carregar lista: ' + (errorThrown || textStatus));
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

function insertRecord(nome, email) {
  const payload = { nome: nome, email: email };
  $('#btnSave').prop('disabled', true).text('Gravando...');
  
  setTimeout(function() {
    const stored = localStorage.getItem('contatos') || '[]';
    const data = JSON.parse(stored);
    
    const maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
    
    const newRecord = {
      id: maxId + 1,
      nome: nome,
      email: email
    };
    
    data.push(newRecord);
    
    localStorage.setItem('contatos', JSON.stringify(data));
    
    const ok = true;
    
    if (ok) {
      showAlert('success', 'Registro gravado com sucesso.');
      $('#nome').val('');
      $('#email').val('');
      validateFormEnable();
      buildTable(data);
    } else {
      showAlert('danger', 'Falha ao gravar registro (servidor retornou false).');
    }
    
    $('#btnSave').prop('disabled', false).text('Gravar');
  }, 500);
}

function removeRecord(id, $row) {
  $row.remove();
  
  setTimeout(function() {
    const stored = localStorage.getItem('contatos') || '[]';
    let data = JSON.parse(stored);
    
    data = data.filter(item => item.id !== Number(id));
    
    localStorage.setItem('contatos', JSON.stringify(data));
    
    const ok = true;
    
    if (!ok) {
      showAlert('danger', 'Falha ao remover no servidor. Atualizando tabela.');
      loadList();
    }
  }, 300);
}

$(document).ready(function() {
  loadList();

  $('#nome, #email').on('input', function() {
    validateFormEnable();
  });


  $('#btnClear').on('click', function() {
    $('#nome').val('');
    $('#email').val('');
    validateFormEnable();
  });


  $('#btnRefresh').on('click', function() {
    loadList();
  });


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

  $('#tableBody').on('click', '.btn-delete', function() {
    const $tr = $(this).closest('tr');
    const id = $tr.data('id');
    if (typeof id === 'undefined') return;
    removeRecord(id, $tr);
  });
});