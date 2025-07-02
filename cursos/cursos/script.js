// Usuários simulados (pode ser expandido depois)
if (!localStorage.getItem('usuarios')) {
  const usuarios = [
    { usuario: 'admin', senha: 'admin123', tipo: 'superadmin' },
    { usuario: 'prof1', senha: 'prof123', tipo: 'professor' },
    { usuario: 'aluno1', senha: 'aluno123', tipo: 'aluno' }
  ];
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Variável temporária para materiais antes de salvar aula
let materiaisTemp = [];
let capaTemp = null;

// Variáveis temporárias para personalização
let fundoTemp = null;
let bannerTemp = null;
let audioTemp = null;
let avisoTemp = '';

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;
      const tipoConta = document.getElementById('tipoConta').value;
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user = usuarios.find(u => u.usuario === usuario && u.senha === senha && u.tipo === tipoConta);
      if (user) {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        if (tipoConta === 'superadmin') {
          window.location.href = 'painel-superadmin.html';
        } else if (tipoConta === 'professor') {
          window.location.href = 'painel-professor.html';
        } else {
          window.location.href = 'painel-aluno.html';
        }
      } else {
        document.getElementById('loginErro').classList.remove('d-none');
      }
    });
  }

  // Painel Super Admin
  if (document.getElementById('tabelaProfessores')) {
    renderizarProfessores();
    const formNovoUsuario = document.getElementById('formNovoUsuario');
    formNovoUsuario.addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = document.getElementById('novoUsuario').value.trim();
      const senha = document.getElementById('novaSenha').value.trim();
      const tipo = document.getElementById('novoTipo').value;
      const msg = document.getElementById('msgUsuario');
      if (criarNovoUsuario(usuario, senha, tipo)) {
        msg.textContent = 'Usuário criado com sucesso!';
        msg.classList.remove('d-none', 'alert-danger');
        msg.classList.add('alert-success');
        formNovoUsuario.reset();
        renderizarProfessores();
      } else {
        msg.textContent = 'Usuário já existe!';
        msg.classList.remove('d-none', 'alert-success');
        msg.classList.add('alert-danger');
      }
      setTimeout(() => msg.classList.add('d-none'), 2500);
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'index.html';
    });
  }

  // Painel Professor
  if (document.getElementById('formNovaAula')) {
    renderizarAulas();
    renderizarAlunos();
    renderizarAvaliacoes();
    renderizarMateriaisTemp();
    materiaisTemp = [];
    // Preview do vídeo
    const linkVideo = document.getElementById('linkVideo');
    const previewVideo = document.getElementById('previewVideo');
    linkVideo.addEventListener('input', function() {
      const url = linkVideo.value.trim();
      if (url) {
        let embed = '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          let videoId = '';
          if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
          else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
          embed = `<iframe width="100%" height="250" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (url.endsWith('.mp4')) {
          embed = `<video width="100%" height="250" controls><source src="${url}" type="video/mp4"></video>`;
        }
        previewVideo.innerHTML = embed;
        previewVideo.style.display = 'block';
      } else {
        previewVideo.innerHTML = '';
        previewVideo.style.display = 'none';
      }
    });
    // Adicionar material
    document.getElementById('btnAddMaterial').addEventListener('click', function() {
      const materiaisInput = document.getElementById('materiaisAula');
      if (materiaisInput.files.length) {
        for (let i = 0; i < materiaisInput.files.length; i++) {
          const file = materiaisInput.files[i];
          materiaisTemp.push({ nome: file.name, url: URL.createObjectURL(file) });
        }
        materiaisInput.value = '';
        renderizarMateriaisTemp();
      }
    });
    document.getElementById('formNovaAula').addEventListener('submit', function(e) {
      e.preventDefault();
      const titulo = document.getElementById('tituloAula').value.trim();
      const link = document.getElementById('linkVideo').value.trim();
      salvarAula(titulo, link, materiaisTemp);
      materiaisTemp = [];
      document.getElementById('msgAula').textContent = 'Aula cadastrada!';
      document.getElementById('msgAula').classList.remove('d-none');
      setTimeout(() => document.getElementById('msgAula').classList.add('d-none'), 2000);
      document.getElementById('formNovaAula').reset();
      previewVideo.innerHTML = '';
      previewVideo.style.display = 'none';
      renderizarMateriaisTemp();
      renderizarAulas();
      capaTemp = null;
      if (previewCapa) {
        previewCapa.src = '#';
        previewCapa.style.display = 'none';
      }
    });
    document.getElementById('formAvaliacao').addEventListener('submit', function(e) {
      e.preventDefault();
      const aluno = document.getElementById('alunoAvaliacao').value;
      const atividade = document.getElementById('atividadeAvaliacao').value.trim();
      const nota = document.getElementById('notaAvaliacao').value;
      const comentario = document.getElementById('comentarioAvaliacao').value.trim();
      salvarAvaliacao(aluno, atividade, nota, comentario);
      document.getElementById('msgAvaliacao').textContent = 'Avaliação salva!';
      document.getElementById('msgAvaliacao').classList.remove('d-none');
      setTimeout(() => document.getElementById('msgAvaliacao').classList.add('d-none'), 2000);
      document.getElementById('formAvaliacao').reset();
      renderizarAvaliacoes();
    });
    // Preview e upload da capa do livro
    const capaInput = document.getElementById('capaAula');
    const previewCapa = document.getElementById('previewCapa');
    if (capaInput && previewCapa) {
      capaInput.addEventListener('change', function() {
        if (capaInput.files && capaInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewCapa.src = e.target.result;
            previewCapa.style.display = 'block';
            capaTemp = e.target.result;
          };
          reader.readAsDataURL(capaInput.files[0]);
        } else {
          previewCapa.src = '#';
          previewCapa.style.display = 'none';
          capaTemp = null;
        }
      });
    }
    // Personalização do painel do professor
    const fundoInput = document.getElementById('fundoPainel');
    const previewFundo = document.getElementById('previewFundo');
    if (fundoInput && previewFundo) {
      fundoInput.addEventListener('change', function() {
        if (fundoInput.files && fundoInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewFundo.src = e.target.result;
            previewFundo.style.display = 'block';
            fundoTemp = e.target.result;
          };
          reader.readAsDataURL(fundoInput.files[0]);
        } else {
          previewFundo.src = '#';
          previewFundo.style.display = 'none';
          fundoTemp = null;
        }
      });
    }
    const bannerInput = document.getElementById('bannerPainel');
    const previewBanner = document.getElementById('previewBanner');
    if (bannerInput && previewBanner) {
      bannerInput.addEventListener('change', function() {
        if (bannerInput.files && bannerInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewBanner.src = e.target.result;
            previewBanner.style.display = 'block';
            bannerTemp = e.target.result;
          };
          reader.readAsDataURL(bannerInput.files[0]);
        } else {
          previewBanner.src = '#';
          previewBanner.style.display = 'none';
          bannerTemp = null;
        }
      });
    }
    const audioInput = document.getElementById('audioPainel');
    const previewAudio = document.getElementById('previewAudio');
    if (audioInput && previewAudio) {
      audioInput.addEventListener('change', function() {
        if (audioInput.files && audioInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewAudio.src = e.target.result;
            previewAudio.style.display = 'block';
            audioTemp = e.target.result;
          };
          reader.readAsDataURL(audioInput.files[0]);
        } else {
          previewAudio.src = '';
          previewAudio.style.display = 'none';
          audioTemp = null;
        }
      });
    }
    const avisoInput = document.getElementById('avisoPainel');
    if (avisoInput) {
      avisoInput.addEventListener('input', function() {
        avisoTemp = avisoInput.value;
      });
    }
    const btnSalvarPersonalizacao = document.getElementById('btnSalvarPersonalizacao');
    const msgPersonalizacao = document.getElementById('msgPersonalizacao');
    if (btnSalvarPersonalizacao) {
      btnSalvarPersonalizacao.addEventListener('click', function() {
        const personalizacao = {
          fundo: fundoTemp || (previewFundo && previewFundo.src !== '#' ? previewFundo.src : null),
          banner: bannerTemp || (previewBanner && previewBanner.src !== '#' ? previewBanner.src : null),
          audio: audioTemp || (previewAudio && previewAudio.src ? previewAudio.src : null),
          aviso: avisoTemp || (avisoInput ? avisoInput.value : '')
        };
        localStorage.setItem('personalizacaoPainel', JSON.stringify(personalizacao));
        msgPersonalizacao.textContent = 'Personalização salva!';
        msgPersonalizacao.classList.remove('d-none', 'alert-danger');
        msgPersonalizacao.classList.add('alert-success');
        setTimeout(() => msgPersonalizacao.classList.add('d-none'), 2000);
        aplicarPersonalizacaoPainel('professor');
      });
    }
    aplicarPersonalizacaoPainel('professor');
    renderizarCalendarioPresenca();
  }

  // Painel Aluno
  if (document.getElementById('formAtividadeAluno')) {
    renderizarAulasAluno();
    renderizarNotasAluno();
    document.getElementById('formAtividadeAluno').addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
      const aula = document.getElementById('aulaAtividade').value;
      const descricao = document.getElementById('descAtividade').value.trim();
      const arquivoInput = document.getElementById('arquivoAtividade');
      let arquivo = null;
      if (arquivoInput.files.length) {
        const file = arquivoInput.files[0];
        arquivo = { nome: file.name, url: URL.createObjectURL(file) };
      }
      salvarAtividadeAluno(aula, descricao, arquivo, usuario.usuario);
      document.getElementById('msgAtividade').textContent = 'Atividade enviada!';
      document.getElementById('msgAtividade').classList.remove('d-none');
      setTimeout(() => document.getElementById('msgAtividade').classList.add('d-none'), 2000);
      document.getElementById('formAtividadeAluno').reset();
    });
  }

  // Cadastro de novo usuário no modal do login
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = document.getElementById('cadUsuario').value.trim();
      const senha = document.getElementById('cadSenha').value.trim();
      const tipo = document.getElementById('cadTipoConta').value;
      const msg = document.getElementById('cadastroMsg');
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      if (usuarios.some(u => u.usuario === usuario)) {
        msg.textContent = 'Usuário já existe!';
        msg.classList.remove('d-none', 'alert-success');
        msg.classList.add('alert-danger');
      } else {
        const novo = { usuario, senha, tipo };
        if (tipo === 'professor') {
          novo.ativo = false;
          novo.permissao = false;
        }
        usuarios.push(novo);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        msg.textContent = 'Usuário cadastrado com sucesso!';
        msg.classList.remove('d-none', 'alert-danger');
        msg.classList.add('alert-success');
        formCadastro.reset();
      }
      setTimeout(() => msg.classList.add('d-none'), 2500);
    });
  }

  // Visualizar senha login
  const senhaInput = document.getElementById('senha');
  const iconSenha = document.getElementById('iconSenha');
  if (senhaInput && iconSenha) {
    iconSenha.parentElement.addEventListener('click', function() {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        iconSenha.innerHTML = `<path d='M13.359 11.238l1.387 1.387a.75.75 0 0 1-1.06 1.06l-1.387-1.387A7.48 7.48 0 0 1 8 13.5c-5 0-8-5.5-8-5.5a15.634 15.634 0 0 1 2.54-3.44l-1.387-1.387a.75.75 0 1 1 1.06-1.06l1.387 1.387A7.48 7.48 0 0 1 8 2.5c5 0 8 5.5 8 5.5a15.634 15.634 0 0 1-2.54 3.44z'/>`;
      } else {
        senhaInput.type = 'password';
        iconSenha.innerHTML = `<path d=\"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z"/><path d=\"M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z\"/>`;
      }
    });
  }

  // Visualizar senha cadastro
  const cadSenhaInput = document.getElementById('cadSenha');
  const iconCadSenha = document.getElementById('iconCadSenha');
  if (cadSenhaInput && iconCadSenha) {
    iconCadSenha.parentElement.addEventListener('click', function() {
      if (cadSenhaInput.type === 'password') {
        cadSenhaInput.type = 'text';
        iconCadSenha.innerHTML = `<path d='M13.359 11.238l1.387 1.387a.75.75 0 0 1-1.06 1.06l-1.387-1.387A7.48 7.48 0 0 1 8 13.5c-5 0-8-5.5-8-5.5a15.634 15.634 0 0 1 2.54-3.44l-1.387-1.387a.75.75 0 1 1 1.06-1.06l1.387 1.387A7.48 7.48 0 0 1 8 2.5c5 0 8 5.5 8 5.5a15.634 15.634 0 0 1-2.54 3.44z'/>`;
      } else {
        cadSenhaInput.type = 'password';
        iconCadSenha.innerHTML = `<path d=\"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z"/><path d=\"M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z\"/>`;
      }
    });
  }

  // Resetar sistema
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja resetar todo o sistema? Todos os dados serão apagados!')) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // Exibir/ocultar formulário de nova aula
  const btnToggleFormAula = document.getElementById('btnToggleFormAula');
  const formAulaContainer = document.getElementById('formAulaContainer');
  if (btnToggleFormAula && formAulaContainer) {
    btnToggleFormAula.addEventListener('click', function() {
      if (formAulaContainer.style.display === 'none') {
        formAulaContainer.style.display = 'block';
        btnToggleFormAula.textContent = 'Ocultar Formulário';
      } else {
        formAulaContainer.style.display = 'none';
        btnToggleFormAula.textContent = 'Adicionar Nova Aula';
      }
    });
  }

  if (document.getElementById('atividadesAlunosContainer')) {
    renderizarAtividadesAlunos();
  }

  // Exibir personalização no painel do aluno
  if (window.location.pathname.includes('painel-aluno.html')) {
    document.addEventListener('DOMContentLoaded', function() {
      aplicarPersonalizacaoPainel('aluno');
      // Player de áudio abaixo do formulário de atividade
      const personalizacao = JSON.parse(localStorage.getItem('personalizacaoPainel')) || {};
      const audioAlunoContainer = document.getElementById('audioAlunoContainer');
      if (audioAlunoContainer && personalizacao.audio) {
        audioAlunoContainer.innerHTML = `<audio controls style='max-width:300px;width:100%;display:block;margin:0 auto;'><source src='${personalizacao.audio}' type='audio/mp3'></audio>`;
      }
    });
  }

  renderizarCalendarioPresencaAluno();

  const formJust = document.getElementById('formJustificativaAluno');
  if (formJust) {
    formJust.addEventListener('submit', function(e) {
      e.preventDefault();
      const ano = document.getElementById('justAno').value;
      const mes = document.getElementById('justMes').value;
      const dia = document.getElementById('justDia').value;
      const texto = document.getElementById('justTexto').value.trim();
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
      const key = `presenca_${ano}_${mes}_${dia}`;
      let presencas = JSON.parse(localStorage.getItem(key)) || {};
      presencas[usuario.usuario + '_just'] = texto;
      const now = new Date();
      presencas[usuario.usuario + '_just_data'] = now.toLocaleString('pt-BR');
      localStorage.setItem(key, JSON.stringify(presencas));
      document.getElementById('msgJustificativa').textContent = 'Justificativa salva!';
      document.getElementById('msgJustificativa').classList.remove('d-none');
      setTimeout(() => document.getElementById('msgJustificativa').classList.add('d-none'), 2000);
      setTimeout(() => bootstrap.Modal.getInstance(document.getElementById('modalJustificativaAluno')).hide(), 1200);
      renderizarCalendarioPresencaAluno();
    });
  }

  // Contador de caracteres justificativa
  const justTexto = document.getElementById('justTexto');
  const contadorJust = document.getElementById('contadorJust');
  if (justTexto && contadorJust) {
    justTexto.addEventListener('input', function() {
      contadorJust.textContent = justTexto.value.length;
    });
  }
});

// Funções do Painel Super Admin
function renderizarProfessores() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const professores = usuarios.filter(u => u.tipo === 'professor');
  const tbody = document.querySelector('#tabelaProfessores tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  professores.forEach((prof, idx) => {
    const status = prof.ativo === false ? 'Desativado' : 'Ativo';
    const permissao = prof.permissao === false ? 'Restrita' : 'Completa';
    tbody.innerHTML += `
      <tr>
        <td>${prof.usuario}</td>
        <td>${status}</td>
        <td>${permissao}</td>
        <td>
          <button class="btn btn-sm btn-${prof.ativo === false ? 'success' : 'warning'} me-1" onclick="toggleAtivoProfessor(${idx})">${prof.ativo === false ? 'Aprovar' : 'Desativar'}</button>
          <button class="btn btn-sm btn-${prof.permissao === false ? 'primary' : 'secondary'}" onclick="togglePermissaoProfessor(${idx})">${prof.permissao === false ? 'Conceder' : 'Remover'} Permissão</button>
        </td>
      </tr>
    `;
  });
}

window.toggleAtivoProfessor = function(idx) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const professores = usuarios.filter(u => u.tipo === 'professor');
  const prof = professores[idx];
  const indexGlobal = usuarios.findIndex(u => u.usuario === prof.usuario && u.tipo === 'professor');
  usuarios[indexGlobal].ativo = !(usuarios[indexGlobal].ativo !== false);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  renderizarProfessores();
};

window.togglePermissaoProfessor = function(idx) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const professores = usuarios.filter(u => u.tipo === 'professor');
  const prof = professores[idx];
  const indexGlobal = usuarios.findIndex(u => u.usuario === prof.usuario && u.tipo === 'professor');
  usuarios[indexGlobal].permissao = !(usuarios[indexGlobal].permissao !== false);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  renderizarProfessores();
};

function criarNovoUsuario(usuario, senha, tipo) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.usuario === usuario)) {
    return false;
  }
  const novo = { usuario, senha, tipo };
  if (tipo === 'professor') {
    novo.ativo = false; // Professores novos precisam ser aprovados
    novo.permissao = false;
  }
  usuarios.push(novo);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

// Funções do Painel Professor
function renderizarAulas() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  aulas = aulas.filter(a => a.professor === usuario.usuario);
  const lista = document.getElementById('listaAulas');
  if (!lista) return;
  lista.innerHTML = '';
  aulas.forEach((aula, idx) => {
    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>
          ${aula.capa ? `<img src="${aula.capa}" alt="Capa" style="max-width:60px;max-height:80px;margin-right:8px;vertical-align:middle;">` : ''}
          <strong>${aula.titulo}</strong> <br>
          <a href="${aula.link}" target="_blank">Ver vídeo</a>
          ${aula.materiais && aula.materiais.length ? '<br>Materiais: ' + aula.materiais.map((m, i) => `<a href="${m.url}" download>${m.nome}</a>`).join(', ') : ''}
          <br><span class="badge bg-${aula.liberada ? 'success' : 'secondary'}">${aula.liberada ? 'Liberada' : 'Não liberada'}</span>
        </span>
        <span>
          <button class="btn btn-sm btn-warning me-1" onclick="editarAula(${idx})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirAula(${idx})">Excluir</button>
          <button class="btn btn-sm btn-info ms-1" onclick="gerarPaginaAula(${idx})">Gerar Página</button>
          <button class="btn btn-sm btn-${aula.liberada ? 'secondary' : 'success'} ms-1" onclick="toggleLiberarAula(${idx})">${aula.liberada ? 'Bloquear' : 'Liberar'}</button>
        </span>
      </li>
    `;
  });
}

window.editarAula = function(idx) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  aulas = aulas.filter(a => a.professor === usuario.usuario);
  const aula = aulas[idx];
  document.getElementById('tituloAula').value = aula.titulo;
  document.getElementById('linkVideo').value = aula.link;
  // Não edita materiais por simplicidade
  excluirAula(idx, false);
};

window.excluirAula = function(idx, render = true) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  const todasAulas = JSON.parse(localStorage.getItem('aulas')) || [];
  const minhasAulas = aulas.filter(a => a.professor === usuario.usuario);
  const aulaRemover = minhasAulas[idx];
  if (confirm('Tem certeza que deseja remover esta aula?')) {
    const indexGlobal = todasAulas.findIndex(a => a.professor === usuario.usuario && a.titulo === aulaRemover.titulo && a.link === aulaRemover.link);
    if (indexGlobal > -1) {
      todasAulas.splice(indexGlobal, 1);
      localStorage.setItem('aulas', JSON.stringify(todasAulas));
      if (render) renderizarAulas();
      const msg = document.getElementById('msgAula');
      if (msg) {
        msg.textContent = 'Aula removida com sucesso!';
        msg.classList.remove('d-none', 'alert-danger');
        msg.classList.add('alert-success');
        setTimeout(() => msg.classList.add('d-none'), 2000);
      }
    }
  }
};

window.gerarPaginaAula = function(idx) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  aulas = aulas.filter(a => a.professor === usuario.usuario);
  const aula = aulas[idx];
  const nomeArquivo = `aula_${usuario.usuario}_${aula.titulo.replace(/\s+/g, '_')}.html`;
  const conteudo = `<!DOCTYPE html><html lang='pt-br'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${aula.titulo}</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'></head><body class='container py-5'><h2>${aula.titulo}</h2><div><iframe width='100%' height='315' src='${aula.link.replace('watch?v=', 'embed/')}' frameborder='0' allowfullscreen></iframe></div>${aula.materiais && aula.materiais.length ? '<h4 class="mt-3">Materiais:</h4><ul>' + aula.materiais.map(m => `<li><a href='${m.url}' download>${m.nome}</a></li>`).join('') + '</ul>' : ''}</body></html>`;
  const blob = new Blob([conteudo], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

window.toggleLiberarAula = function(idx) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  const minhasAulas = aulas.filter(a => a.professor === usuario.usuario);
  const aula = minhasAulas[idx];
  const indexGlobal = aulas.findIndex(a => a.professor === usuario.usuario && a.titulo === aula.titulo && a.link === aula.link);
  aulas[indexGlobal].liberada = !aulas[indexGlobal].liberada;
  localStorage.setItem('aulas', JSON.stringify(aulas));
  renderizarAulas();
};

function renderizarMateriaisTemp() {
  const lista = document.getElementById('listaMateriaisTemp');
  if (!lista) return;
  lista.innerHTML = '';
  materiaisTemp.forEach((mat, idx) => {
    lista.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${mat.nome}<button class="btn btn-sm btn-danger" onclick="removerMaterialTemp(${idx})">Remover</button></li>`;
  });
}

window.removerMaterialTemp = function(idx) {
  materiaisTemp.splice(idx, 1);
  renderizarMateriaisTemp();
};

function salvarAula(titulo, link, materiais) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  aulas.push({ titulo, link, materiais, professor: usuario.usuario, liberada: false, capa: capaTemp });
  localStorage.setItem('aulas', JSON.stringify(aulas));
}

function renderizarAlunos() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const alunos = usuarios.filter(u => u.tipo === 'aluno');
  const lista = document.getElementById('listaAlunos');
  const select = document.getElementById('alunoAvaliacao');
  if (!lista || !select) return;
  lista.innerHTML = '';
  select.innerHTML = '';
  alunos.forEach(aluno => {
    lista.innerHTML += `<li class="list-group-item">${aluno.usuario}</li>`;
    select.innerHTML += `<option value="${aluno.usuario}">${aluno.usuario}</option>`;
  });
}

function salvarAvaliacao(aluno, atividade, nota, comentario) {
  let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  avaliacoes.push({ aluno, atividade, nota, comentario });
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
}

function renderizarAvaliacoes() {
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const tbody = document.querySelector('#tabelaAvaliacoes tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  avaliacoes.forEach(av => {
    tbody.innerHTML += `<tr><td>${av.aluno}</td><td>${av.atividade}</td><td>${av.nota}</td><td>${av.comentario}</td></tr>`;
  });
}

// Funções do Painel Aluno
function renderizarAulasAluno() {
  const aulas = (JSON.parse(localStorage.getItem('aulas')) || []).filter(a => a.liberada);
  const lista = document.getElementById('listaAulasAluno');
  const select = document.getElementById('aulaAtividade');
  if (!lista || !select) return;
  lista.innerHTML = '';
  select.innerHTML = '';
  aulas.forEach((aula, idx) => {
    let videoEmbed = '';
    if (aula.link) {
      if (aula.link.includes('youtube.com') || aula.link.includes('youtu.be')) {
        let videoId = '';
        if (aula.link.includes('watch?v=')) videoId = aula.link.split('watch?v=')[1].split('&')[0];
        else if (aula.link.includes('youtu.be/')) videoId = aula.link.split('youtu.be/')[1].split('?')[0];
        videoEmbed = `<iframe width='100%' height='250' src='https://www.youtube.com/embed/${videoId}' frameborder='0' allowfullscreen></iframe>`;
      } else if (aula.link.endsWith('.mp4')) {
        videoEmbed = `<video width='100%' height='250' controls><source src='${aula.link}' type='video/mp4'></video>`;
      }
    }
    let materiaisHtml = '';
    if (aula.materiais && aula.materiais.length) {
      materiaisHtml = '<div class="mt-2">';
      aula.materiais.forEach(m => {
        materiaisHtml += `<a href="${m.url}" download class="btn btn-outline-primary btn-sm me-2 mb-1"><i class='bi bi-download'></i> Baixar ${m.nome}</a>`;
      });
      materiaisHtml += '</div>';
    }
    lista.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          ${aula.capa ? `<img src="${aula.capa}" alt="Capa" style="max-width:80px;max-height:100px;float:right;margin-left:10px;">` : ''}
          <h5 class="card-title">${aula.titulo}</h5>
          <div class="mb-2">${videoEmbed}</div>
          ${materiaisHtml}
        </div>
      </div>
    `;
    select.innerHTML += `<option value="${aula.titulo}">${aula.titulo}</option>`;
  });
}

function salvarAtividadeAluno(aula, descricao, arquivo, aluno) {
  let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
  atividades.push({ aula, descricao, arquivo, aluno });
  localStorage.setItem('atividades', JSON.stringify(atividades));
}

function renderizarNotasAluno() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const tbody = document.querySelector('#tabelaNotasAluno tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  avaliacoes.filter(av => av.aluno === usuario.usuario).forEach(av => {
    tbody.innerHTML += `<tr><td>${av.atividade}</td><td>${av.atividade}</td><td>${av.nota}</td><td>${av.comentario}</td></tr>`;
  });
}

function renderizarAtividadesAlunos() {
  const atividades = JSON.parse(localStorage.getItem('atividades')) || [];
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const aulas = (JSON.parse(localStorage.getItem('aulas')) || []).filter(a => a.professor === usuario.usuario);
  const atividadesProf = atividades.filter(atv => aulas.some(a => a.titulo === atv.aula));
  let html = `<h4 class='mt-4'>Atividades Enviadas pelos Alunos</h4><table class='table table-bordered'><thead><tr><th>Aluno</th><th>Aula</th><th>Descrição</th><th>Comentário</th><th>Arquivo</th></tr></thead><tbody>`;
  atividadesProf.forEach(atv => {
    html += `<tr><td>${atv.aluno}</td><td>${atv.aula}</td><td>${atv.descricao}</td><td>${atv.comentario ? atv.comentario : ''}</td><td>${atv.arquivo ? `<a href='${atv.arquivo.url}' download class='btn btn-outline-primary btn-sm'>Baixar</a>` : ''}</td></tr>`;
  });
  html += '</tbody></table>';
  const container = document.getElementById('atividadesAlunosContainer');
  if (container) container.innerHTML = html;
}

function aplicarPersonalizacaoPainel(tipo) {
  const personalizacao = JSON.parse(localStorage.getItem('personalizacaoPainel')) || {};
  if (personalizacao.fundo) {
    document.body.style.backgroundImage = `url('${personalizacao.fundo}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    // Ajustar cor da letra conforme brilho do fundo
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      let r, g, b, avg, colorSum = 0;
      for (let x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];
        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }
      const brightness = Math.floor(colorSum / (img.width * img.height));
      if (brightness < 128) {
        document.body.style.color = '#fff';
      } else {
        document.body.style.color = '#222';
      }
    };
    img.src = personalizacao.fundo;
  }
  if (personalizacao.banner) {
    let banner = document.getElementById('bannerTopo');
    if (!banner) {
      banner = document.createElement('img');
      banner.id = 'bannerTopo';
      banner.style.display = 'block';
      banner.style.margin = '24px auto 24px auto';
      banner.style.width = '100%';
      banner.style.maxWidth = '900px';
      banner.style.maxHeight = '200px';
      banner.style.objectFit = 'cover';
      banner.style.borderRadius = '16px';
      // Inserir logo após a navbar
      const nav = document.querySelector('.navbar');
      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(banner, nav.nextSibling);
      } else {
        document.body.insertBefore(banner, document.body.firstChild.nextSibling);
      }
    }
    banner.src = personalizacao.banner;
    banner.style.display = 'block';
  }
  if (personalizacao.audio) {
    let audio = document.getElementById('audioTopo');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'audioTopo';
      audio.controls = true;
      audio.style.display = 'block';
      audio.style.margin = '16px auto';
      audio.style.maxWidth = '300px';
      document.body.insertBefore(audio, document.body.firstChild.nextSibling);
    }
    audio.src = personalizacao.audio;
    audio.style.display = 'block';
  }
  if (personalizacao.aviso) {
    let aviso = document.getElementById('avisoTopo');
    if (!aviso) {
      aviso = document.createElement('div');
      aviso.id = 'avisoTopo';
      aviso.className = 'alert alert-warning text-center';
      aviso.style.fontWeight = 'bold';
      aviso.style.fontSize = '1.1rem';
      aviso.style.margin = '16px auto';
      aviso.style.maxWidth = '600px';
      document.body.insertBefore(aviso, document.body.firstChild.nextSibling);
    }
    aviso.textContent = personalizacao.aviso;
    aviso.style.display = 'block';
  }
}

function renderizarCalendarioPresenca() {
  const container = document.getElementById('calendarioPresencaContainer');
  if (!container) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  let html = `<table class='table table-bordered text-center'><thead><tr><th colspan='7'>${hoje.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</th></tr><tr><th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sáb</th></tr></thead><tbody><tr>`;
  let dia = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < primeiroDiaSemana) || dia > diasNoMes) {
        html += '<td></td>';
      } else {
        html += `<td><button class='btn btn-light btn-sm w-100' onclick='abrirPresencaDia(${ano},${mes},${dia})'>${dia}</button></td>`;
        dia++;
      }
    }
    html += '</tr>';
    if (dia > diasNoMes) break;
    if (i < 5) html += '<tr>';
  }
  html += '</tbody></table>';
  container.innerHTML = html;
}

window.abrirPresencaDia = function(ano, mes, dia) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const alunos = usuarios.filter(u => u.tipo === 'aluno');
  const key = `presenca_${ano}_${mes}_${dia}`;
  let presencas = JSON.parse(localStorage.getItem(key)) || {};
  let html = `<h6>Presença do dia ${dia}/${mes+1}/${ano}</h6><ul class='list-group mb-2'>`;
  alunos.forEach(aluno => {
    const status = presencas[aluno.usuario] || '';
    const justificativa = presencas[aluno.usuario + '_just'] || '';
    const justData = presencas[aluno.usuario + '_just_data'] || '';
    html += `<li class='list-group-item d-flex justify-content-between align-items-center'>
      <div>
        <div>${aluno.usuario}</div>
        ${justificativa ? `<div class='small text-primary mt-1'><b>Justificativa:</b> ${justificativa}${justData ? `<br><span class='text-muted'>(${justData})</span>` : ''}</div>` : ''}
      </div>
      <span>
        <button class='btn btn-sm btn-success me-1' onclick="marcarPresenca('${key}','${aluno.usuario}','Presente')" ${status==='Presente'?'disabled':''}>Presente</button>
        <button class='btn btn-sm btn-danger' onclick="marcarPresenca('${key}','${aluno.usuario}','Falta')" ${status==='Falta'?'disabled':''}>Falta</button>
        <button class='btn btn-sm btn-secondary ms-1' onclick="removerPresenca('${key}','${aluno.usuario}')">Limpar</button>
      </span>
      <span class='ms-2 badge bg-${status==='Presente'?'success':status==='Falta'?'danger':'secondary'}'>${status||'---'}</span>
    </li>`;
  });
  html += '</ul><button class="btn btn-outline-secondary btn-sm" onclick="fecharPresencaDia()">Fechar</button>';
  let modal = document.getElementById('modalPresenca');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalPresenca';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.4)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div style='background:#fff;padding:24px;border-radius:12px;min-width:320px;max-width:90vw;'>${html}</div>`;
  modal.style.display = 'flex';
}

window.fecharPresencaDia = function() {
  const modal = document.getElementById('modalPresenca');
  if (modal) modal.style.display = 'none';
}

window.marcarPresenca = function(key, usuario, status) {
  let presencas = JSON.parse(localStorage.getItem(key)) || {};
  presencas[usuario] = status;
  localStorage.setItem(key, JSON.stringify(presencas));
  window.abrirPresencaDia(...key.split('_').slice(1));
}

window.removerPresenca = function(key, usuario) {
  let presencas = JSON.parse(localStorage.getItem(key)) || {};
  delete presencas[usuario];
  localStorage.setItem(key, JSON.stringify(presencas));
  window.abrirPresencaDia(...key.split('_').slice(1));
}

function renderizarCalendarioPresencaAluno() {
  const container = document.getElementById('calendarioPresencaAluno');
  if (!container) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  let html = `<table class='table table-bordered text-center'><thead><tr><th colspan='7'>${hoje.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</th></tr><tr><th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sáb</th></tr></thead><tbody><tr>`;
  let dia = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < primeiroDiaSemana) || dia > diasNoMes) {
        html += '<td></td>';
      } else {
        const key = `presenca_${ano}_${mes}_${dia}`;
        const presencas = JSON.parse(localStorage.getItem(key)) || {};
        const status = presencas[usuario.usuario] || '';
        const justificativa = presencas[usuario.usuario + '_just'] || '';
        let cor = 'secondary', texto = '---', extra = '';
        if (status === 'Presente') { cor = 'success'; texto = 'P'; }
        else if (status === 'Falta') { cor = 'danger'; texto = 'F'; }
        if (justificativa) { cor = 'primary'; extra = ` title='Justificativa: ${justificativa.replace(/'/g, '\'')}'`; }
        html += `<td><div>${dia}</div><span class='badge bg-${cor}' style='cursor:pointer;' onclick='abrirJustificativaAluno(${ano},${mes},${dia})'${extra}>${texto}</span></td>`;
        dia++;
      }
    }
    html += '</tr>';
    if (dia > diasNoMes) break;
    if (i < 5) html += '<tr>';
  }
  html += '</tbody></table>';
  container.innerHTML = html;
}

window.abrirJustificativaAluno = function(ano, mes, dia) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const key = `presenca_${ano}_${mes}_${dia}`;
  const presencas = JSON.parse(localStorage.getItem(key)) || {};
  const justificativa = presencas[usuario.usuario + '_just'] || '';
  document.getElementById('justAno').value = ano;
  document.getElementById('justMes').value = mes;
  document.getElementById('justDia').value = dia;
  document.getElementById('justTexto').value = justificativa;
  const modal = new bootstrap.Modal(document.getElementById('modalJustificativaAluno'));
  modal.show();
} 