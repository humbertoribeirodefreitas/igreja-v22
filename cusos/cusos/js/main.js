// Alternar entre formulários
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const recoverForm = document.getElementById('recover-form');

document.getElementById('show-register').onclick = function(e) {
  e.preventDefault();
  loginForm.classList.add('d-none');
  registerForm.classList.remove('d-none');
  recoverForm.classList.add('d-none');
};
document.getElementById('show-login').onclick = function(e) {
  e.preventDefault();
  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
  recoverForm.classList.add('d-none');
};
document.getElementById('show-login-2').onclick = function(e) {
  e.preventDefault();
  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
  recoverForm.classList.add('d-none');
};
document.getElementById('show-recover').onclick = function(e) {
  e.preventDefault();
  loginForm.classList.add('d-none');
  registerForm.classList.add('d-none');
  recoverForm.classList.remove('d-none');
};

// Funções auxiliares para localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function saveSession(user) {
  localStorage.setItem('session', JSON.stringify(user));
}
function getSession() {
  return JSON.parse(localStorage.getItem('session'));
}
function clearSession() {
  localStorage.removeItem('session');
}

// Funções auxiliares para cursos e módulos
function getCourses() {
  return JSON.parse(localStorage.getItem('courses') || '[]');
}
function setCourses(courses) {
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Cadastro de usuário
registerForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim().toLowerCase();
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;
  const photoInput = document.getElementById('register-photo');

  let users = getUsers();
  if (users.find(u => u.email === email)) {
    alert('Email já cadastrado!');
    return;
  }

  // Salvar foto como base64
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const photo = evt.target.result;
      saveUserWithPhoto(name, email, password, role, photo);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveUserWithPhoto(name, email, password, role, '');
  }
};

function saveUserWithPhoto(name, email, password, role, photo) {
  let users = getUsers();
  const newUser = { name, email, password, role, photo };
  users.push(newUser);
  setUsers(users);
  alert('Cadastro realizado com sucesso! Faça login.');
  registerForm.reset();
  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
}

// Login de usuário
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert('Email ou senha inválidos!');
    return;
  }
  saveSession(user);
  showDashboard(user);
};

// Recuperação de senha (simulada)
recoverForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('recover-email').value.trim().toLowerCase();
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    alert('Email não encontrado!');
    return;
  }
  alert('Instruções de recuperação de senha enviadas para o email (simulado).');
  recoverForm.reset();
  loginForm.classList.remove('d-none');
  recoverForm.classList.add('d-none');
};

// Renderizar área de cursos
function renderCoursesArea(user) {
  const mainApp = document.getElementById('main-app');
  let courses = getCourses();
  let html = `<div class='mb-3 text-end'><button class='btn btn-outline-danger btn-sm' id='logout-btn'>Sair</button></div>`;
  html += `<h3>Bem-vindo, ${user.name} (${user.role === 'admin' ? 'Administrador' : 'Aluno'})</h3>`;
  if (user.role === 'admin') {
    html += `
      <div class='mt-4'>
        <h5>Cursos</h5>
        <button class='btn btn-primary btn-sm mb-3' id='add-course-btn'>Novo Curso</button>
        <div id='courses-list'>${renderCoursesTable(courses, true)}</div>
      </div>
      <div id='course-form-area'></div>
    `;
  } else {
    html += `
      <div class='mt-4'>
        <h5>Cursos Disponíveis</h5>
        <div id='courses-list'>${renderCoursesTable(courses, false)}</div>
      </div>
    `;
  }
  mainApp.innerHTML = html;
  document.getElementById('logout-btn').onclick = function() {
    clearSession();
    mainApp.classList.add('d-none');
    document.getElementById('auth-container').classList.remove('d-none');
    loginForm.reset();
  };
  if (user.role === 'admin') {
    document.getElementById('add-course-btn').onclick = function() {
      showCourseForm();
    };
    addAdminCourseEvents(courses);
  } else {
    addAlunoCourseEvents(courses);
  }
}

function renderCoursesTable(courses, isAdmin) {
  if (courses.length === 0) return '<p>Nenhum curso cadastrado.</p>';
  if (!isAdmin) {
    // Layout cards para alunos
    let html = '<div class="row g-4">';
    courses.forEach((course, idx) => {
      html += `<div class='col-md-4'>
        <div class='card h-100 shadow-sm'>
          <div class='card-img-top' style='height:180px;background:#eee;display:flex;align-items:center;justify-content:center;'>
            ${course.image ? `<img src='${course.image}' alt='Imagem do Curso' style='max-height:100%;max-width:100%;object-fit:cover;width:100%;'>` : `<span class='text-muted'>Sem imagem</span>`}
          </div>
          <div class='card-body d-flex flex-column'>
            <h5 class='card-title'>${course.title}</h5>
            <p class='card-text'>${course.description}</p>
            <div class='mt-auto text-end'>
              <button class='btn btn-info btn-sm' data-view='${idx}'>Ver</button>
            </div>
          </div>
        </div>
      </div>`;
    });
    html += '</div>';
    return html;
  }
  // Layout lista para admin
  let html = '<ul class="list-group">';
  courses.forEach((course, idx) => {
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">
      <span><b>${course.title}</b> - ${course.description}</span>
      <span>
        <button class='btn btn-info btn-sm me-2' data-view='${idx}'>Ver</button>
        <button class='btn btn-warning btn-sm me-2' data-edit='${idx}'>Editar</button>
        <button class='btn btn-danger btn-sm' data-del='${idx}'>Excluir</button>
      </span>
    </li>`;
  });
  html += '</ul>';
  return html;
}

function showCourseForm(course = null, idx = null) {
  const area = document.getElementById('course-form-area');
  area.innerHTML = `
    <div class='card mt-3'>
      <div class='card-body'>
        <h5>${course ? 'Editar Curso' : 'Novo Curso'}</h5>
        <form id='course-form'>
          <div class='mb-2'>
            <label class='form-label'>Título</label>
            <input type='text' class='form-control' id='course-title' value='${course ? course.title : ''}' required>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Descrição</label>
            <input type='text' class='form-control' id='course-desc' value='${course ? course.description : ''}' required>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Imagem do Curso (opcional)</label>
            <input type='file' class='form-control' id='course-image' accept='image/*'>
            ${course && course.image ? `<img src='${course.image}' alt='Imagem do Curso' class='mt-2 rounded' style='width:100%;max-width:300px;object-fit:cover;'>` : ''}
          </div>
          <button type='submit' class='btn btn-success'>Salvar</button>
          <button type='button' class='btn btn-secondary ms-2' id='cancel-course'>Cancelar</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById('cancel-course').onclick = function() {
    area.innerHTML = '';
  };
  document.getElementById('course-form').onsubmit = function(e) {
    e.preventDefault();
    let courses = getCourses();
    const title = document.getElementById('course-title').value.trim();
    const description = document.getElementById('course-desc').value.trim();
    const imageInput = document.getElementById('course-image');
    // Impedir cursos repetidos
    if (!course && courses.some(c => c.title.toLowerCase() === title.toLowerCase())) {
      alert('Já existe um curso com esse título!');
      return;
    }
    if (course && courses.some((c, i) => c.title.toLowerCase() === title.toLowerCase() && i !== idx)) {
      alert('Já existe um curso com esse título!');
      return;
    }
    // Salvar imagem como base64
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const image = evt.target.result;
        saveCourseWithImage(title, description, image, course, idx);
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      saveCourseWithImage(title, description, course && course.image ? course.image : '', course, idx);
    }
  };
}

function saveCourseWithImage(title, description, image, course, idx) {
  let courses = getCourses();
  if (course) {
    courses[idx].title = title;
    courses[idx].description = description;
    courses[idx].image = image;
  } else {
    courses.push({ title, description, image, modules: [] });
  }
  setCourses(courses);
  document.getElementById('course-form-area').innerHTML = '';
  renderCoursesArea(getSession());
}

function addAdminCourseEvents(courses) {
  // Editar
  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-edit'));
      showCourseForm(courses[idx], idx);
    };
  });
  // Excluir
  document.querySelectorAll('[data-del]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-del'));
      if (confirm('Deseja excluir este curso?')) {
        courses.splice(idx, 1);
        setCourses(courses);
        renderCoursesArea(getSession());
      }
    };
  });
  // Ver módulos
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-view'));
      showModulesArea(courses, idx, true);
    };
  });
}

function addAlunoCourseEvents(courses) {
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-view'));
      showModulesArea(courses, idx, false);
    };
  });
}

function showModulesArea(courses, courseIdx, isAdmin) {
  const mainApp = document.getElementById('main-app');
  const course = courses[courseIdx];
  let html = `<div class='mb-3'><button class='btn btn-secondary btn-sm' id='back-courses'>Voltar</button></div>`;
  html += `<h4>${course.title}</h4><p>${course.description}</p>`;
  html += `<h5 class='mt-4'>Módulos</h5>`;
  html += renderModulesTable(course.modules, isAdmin, courseIdx);
  if (isAdmin) {
    html += `<button class='btn btn-primary btn-sm mt-3' id='add-module-btn'>Novo Módulo</button>`;
  }
  mainApp.innerHTML = html;
  document.getElementById('back-courses').onclick = function() {
    renderCoursesArea(getSession());
  };
  if (isAdmin) {
    document.getElementById('add-module-btn').onclick = function() {
      showModuleForm(courses, courseIdx);
    };
    addAdminModuleEvents(courses, courseIdx);
    addAdminMaterialEvents(courses, courseIdx);
  } else {
    addAlunoMaterialEvents(courses, courseIdx);
  }
}

function renderModulesTable(modules, isAdmin, courseIdx) {
  if (!modules || modules.length === 0) return '<p>Nenhum módulo cadastrado.</p>';
  let html = '<ul class="list-group">';
  modules.forEach((mod, idx) => {
    // Garante que o campo visible é booleano
    if (typeof mod.visible !== 'boolean') mod.visible = false;
    if (!isAdmin && !mod.visible) return; // Aluno só vê módulos liberados
    html += `<li class="list-group-item">
      <div class="d-flex justify-content-between align-items-center">
        <span><b>${mod.title}</b> - ${mod.description}</span>
        <span>
          ${isAdmin ? `<button class='btn btn-warning btn-sm me-2' data-edit-mod='${idx}'>Editar</button>
          <button class='btn btn-danger btn-sm me-2' data-del-mod='${idx}'>Excluir</button>
          <button class='btn btn-success btn-sm me-2' data-add-video='${idx}'>Adicionar Vídeo</button>
          <button class='btn btn-outline-${mod.visible ? 'success' : 'secondary'} btn-sm me-2' data-toggle-visible='${idx}'>${mod.visible ? 'Liberado' : 'Oculto'}</button>` : ''}
          <button class='btn btn-info btn-sm' data-view-materials='${idx}'>Materiais</button>
        </span>
      </div>
    </li>`;
  });
  html += '</ul>';
  return html;
}

function showModuleForm(courses, courseIdx, module = null, modIdx = null) {
  const mainApp = document.getElementById('main-app');
  const area = document.createElement('div');
  area.innerHTML = `
    <div class='card mt-3'>
      <div class='card-body'>
        <h5>${module ? 'Editar Módulo' : 'Novo Módulo'}</h5>
        <form id='module-form'>
          <div class='mb-2'>
            <label class='form-label'>Título</label>
            <input type='text' class='form-control' id='module-title' value='${module ? module.title : ''}' required>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Descrição</label>
            <input type='text' class='form-control' id='module-desc' value='${module ? module.description : ''}' required>
          </div>
          <div class='form-check mb-2'>
            <input class='form-check-input' type='checkbox' id='module-visible' ${module && module.visible === true ? 'checked' : ''}>
            <label class='form-check-label' for='module-visible'>Liberar para alunos</label>
          </div>
          <button type='submit' class='btn btn-success'>Salvar</button>
          <button type='button' class='btn btn-secondary ms-2' id='cancel-module'>Cancelar</button>
        </form>
      </div>
    </div>
  `;
  mainApp.appendChild(area);
  document.getElementById('cancel-module').onclick = function() {
    area.remove();
  };
  document.getElementById('module-form').onsubmit = function(e) {
    e.preventDefault();
    let courses = getCourses();
    const title = document.getElementById('module-title').value.trim();
    const description = document.getElementById('module-desc').value.trim();
    const visible = document.getElementById('module-visible').checked === true;
    // Impedir módulos repetidos (mesmo título) no mesmo curso
    const modules = courses[courseIdx].modules;
    if (!module && modules.some(m => m.title.toLowerCase() === title.toLowerCase())) {
      alert('Já existe um módulo com esse título neste curso!');
      return;
    }
    if (module && modules.some((m, i) => m.title.toLowerCase() === title.toLowerCase() && i !== modIdx)) {
      alert('Já existe um módulo com esse título neste curso!');
      return;
    }
    if (module) {
      courses[courseIdx].modules[modIdx].title = title;
      courses[courseIdx].modules[modIdx].description = description;
      courses[courseIdx].modules[modIdx].visible = visible;
    } else {
      courses[courseIdx].modules.push({ title, description, visible: visible, videos: [], materials: [] });
    }
    setCourses(courses);
    area.remove();
    showModulesArea(courses, courseIdx, true);
  };
}

function addAdminModuleEvents(courses, courseIdx) {
  // Editar módulo
  document.querySelectorAll('[data-edit-mod]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-edit-mod'));
      showModuleForm(courses, courseIdx, courses[courseIdx].modules[idx], idx);
    };
  });
  // Excluir módulo
  document.querySelectorAll('[data-del-mod]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-del-mod'));
      if (confirm('Deseja excluir este módulo?')) {
        courses[courseIdx].modules.splice(idx, 1);
        setCourses(courses);
        showModulesArea(courses, courseIdx, true);
      }
    };
  });
  // Adicionar vídeo direto
  document.querySelectorAll('[data-add-video]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-add-video'));
      showVideoForm(courses, courseIdx, idx);
    };
  });
  // Alternar visibilidade
  document.querySelectorAll('[data-toggle-visible]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-toggle-visible'));
      courses[courseIdx].modules[idx].visible = !courses[courseIdx].modules[idx].visible;
      setCourses(courses);
      showModulesArea(courses, courseIdx, true);
    };
  });
}

function addAdminMaterialEvents(courses, courseIdx) {
  document.querySelectorAll('[data-view-materials]').forEach(btn => {
    btn.onclick = function() {
      const modIdx = parseInt(btn.getAttribute('data-view-materials'));
      showMaterialsArea(courses, courseIdx, modIdx, true);
    };
  });
}

function addAlunoMaterialEvents(courses, courseIdx) {
  document.querySelectorAll('[data-view-materials]').forEach(btn => {
    btn.onclick = function() {
      const modIdx = parseInt(btn.getAttribute('data-view-materials'));
      showMaterialsArea(courses, courseIdx, modIdx, false);
    };
  });
}

function showMaterialsArea(courses, courseIdx, modIdx, isAdmin) {
  // Sempre buscar dados atualizados do localStorage
  courses = getCourses();
  const mainApp = document.getElementById('main-app');
  const module = courses[courseIdx].modules[modIdx];
  let html = `<div class='mb-3'><button class='btn btn-secondary btn-sm' id='back-modules'>Voltar</button></div>`;
  html += `<h4>${module.title}</h4><p>${module.description}</p>`;
  // Seção de vídeos
  html += `<div class='mt-4'><h5>Vídeos do Módulo</h5>`;
  html += renderVideosTable(module.videos, isAdmin);
  if (isAdmin) {
    html += `<button class='btn btn-primary btn-sm mt-2' id='add-video-btn'>Adicionar Vídeo</button>`;
  }
  html += `</div>`;
  // Seção de materiais
  html += `<div class='mt-4'><h5>Materiais para Download</h5>`;
  html += renderMaterialsTable(module.materials, isAdmin);
  if (isAdmin) {
    html += `<button class='btn btn-success btn-sm mt-2' id='add-material-btn'>Adicionar Material</button>`;
  }
  html += `</div>`;
  mainApp.innerHTML = html;
  document.getElementById('back-modules').onclick = function() {
    showModulesArea(courses, courseIdx, isAdmin);
  };
  if (isAdmin) {
    document.getElementById('add-video-btn').onclick = function() {
      showVideoForm(courses, courseIdx, modIdx);
    };
    document.getElementById('add-material-btn').onclick = function() {
      showMaterialForm(courses, courseIdx, modIdx);
    };
    addAdminVideoMaterialEvents(courses, courseIdx, modIdx);
  }
}

function renderVideosTable(videos, isAdmin) {
  if (!videos || videos.length === 0) return '<p>Nenhum vídeo cadastrado.</p>';
  let html = '<ul class="list-group">';
  videos.forEach((vid, idx) => {
    html += `<li class="list-group-item">
      <div class="d-flex justify-content-between align-items-center">
        <span><a href='${vid.link}' target='_blank'>${vid.title}</a></span>
        ${isAdmin ? `<span><button class='btn btn-danger btn-sm' data-del-video='${idx}'>Excluir</button></span>` : ''}
      </div>
      <div class='mt-2'>${getVideoEmbed(vid.link)}</div>
    </li>`;
  });
  html += '</ul>';
  return html;
}

// Função para gerar embed de vídeo YouTube/Vimeo
function getVideoEmbed(link) {
  // YouTube
  const ytMatch = link.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (ytMatch) {
    return `<div class='ratio ratio-16x9'><iframe src='https://www.youtube.com/embed/${ytMatch[1]}' allowfullscreen></iframe></div>`;
  }
  // Vimeo
  const vimeoMatch = link.match(/vimeo.com\/(\d+)/);
  if (vimeoMatch) {
    return `<div class='ratio ratio-16x9'><iframe src='https://player.vimeo.com/video/${vimeoMatch[1]}' allowfullscreen></iframe></div>`;
  }
  // Outros links: apenas link clicável
  return '';
}

function renderMaterialsTable(materials, isAdmin) {
  if (!materials || materials.length === 0) return '<p>Nenhum material cadastrado.</p>';
  let html = '<ul class="list-group">';
  materials.forEach((mat, idx) => {
    html += `<li class="list-group-item">
      <div class="d-flex justify-content-between align-items-center">
        <span>${mat.title} (${mat.type})</span>
        ${isAdmin ? `<span><button class='btn btn-danger btn-sm' data-del-material='${idx}'>Excluir</button></span>` : ''}
      </div>
      <div class='mt-1 text-muted' style='font-size:0.95em;'>${mat.desc ? `<b>Descrição:</b> ${mat.desc}<br>` : ''}${mat.prof ? `<b>Professor:</b> ${mat.prof}` : ''}</div>
      <div class='mt-2'>
        ${mat.links && mat.links.length > 0 ? mat.links.map(l => `<a href='${l.url}' target='_blank' class='btn btn-outline-primary btn-sm me-2 mb-1'>${l.platform}</a>`).join('') : ''}
      </div>
    </li>`;
  });
  html += '</ul>';
  return html;
}

function showVideoForm(courses, courseIdx, modIdx) {
  const mainApp = document.getElementById('main-app');
  const area = document.createElement('div');
  area.innerHTML = `
    <div class='card mt-3'>
      <div class='card-body'>
        <h5>Novo Vídeo</h5>
        <form id='video-form'>
          <div class='mb-2'>
            <label class='form-label'>Título</label>
            <input type='text' class='form-control' id='video-title' required>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Link do Vídeo (YouTube, Vimeo, etc)</label>
            <input type='url' class='form-control' id='video-link' required>
          </div>
          <button type='submit' class='btn btn-success'>Salvar</button>
          <button type='button' class='btn btn-secondary ms-2' id='cancel-video'>Cancelar</button>
        </form>
      </div>
    </div>
  `;
  mainApp.appendChild(area);
  document.getElementById('cancel-video').onclick = function() {
    area.remove();
  };
  document.getElementById('video-form').onsubmit = function(e) {
    e.preventDefault();
    let courses = getCourses();
    const title = document.getElementById('video-title').value.trim();
    const link = document.getElementById('video-link').value.trim();
    const videos = courses[courseIdx].modules[modIdx].videos;
    if (videos.some(v => v.title.toLowerCase() === title.toLowerCase())) {
      alert('Já existe um vídeo com esse título neste módulo!');
      return;
    }
    videos.push({ title, link });
    setCourses(courses);
    area.remove();
    showMaterialsArea(courses, courseIdx, modIdx, true);
  };
}

function showMaterialForm(courses, courseIdx, modIdx, material = null, matIdx = null) {
  const mainApp = document.getElementById('main-app');
  const area = document.createElement('div');
  let links = material && material.links ? material.links : [{ platform: '', url: '' }];
  area.innerHTML = `
    <div class='card mt-3'>
      <div class='card-body'>
        <h5>${material ? 'Editar Material' : 'Novo Material'}</h5>
        <form id='material-form'>
          <div class='mb-2'>
            <label class='form-label'>Título</label>
            <input type='text' class='form-control' id='material-title' value='${material ? material.title : ''}' required>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Descrição do material</label>
            <textarea class='form-control' id='material-desc' rows='2'>${material ? (material.desc || '') : ''}</textarea>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Nome do professor</label>
            <input type='text' class='form-control' id='material-prof' value='${material ? (material.prof || '') : ''}'>
          </div>
          <div class='mb-2'>
            <label class='form-label'>Tipo</label>
            <select class='form-select' id='material-type' required>
              <option value='PDF' ${material && material.type === 'PDF' ? 'selected' : ''}>PDF</option>
              <option value='Word' ${material && material.type === 'Word' ? 'selected' : ''}>Word</option>
              <option value='PowerPoint' ${material && material.type === 'PowerPoint' ? 'selected' : ''}>PowerPoint</option>
            </select>
          </div>
          <div id='links-area'></div>
          <button type='button' class='btn btn-outline-info btn-sm mb-2' id='add-link-btn'>Adicionar Link</button>
          <button type='submit' class='btn btn-success'>Salvar</button>
          <button type='button' class='btn btn-secondary ms-2' id='cancel-material'>Cancelar</button>
        </form>
      </div>
    </div>
  `;
  mainApp.appendChild(area);
  function renderLinksFields() {
    const linksArea = area.querySelector('#links-area');
    linksArea.innerHTML = '';
    links.forEach((l, i) => {
      linksArea.innerHTML += `
        <div class='row mb-2'>
          <div class='col-4'>
            <input type='text' class='form-control' placeholder='Plataforma (ex: Google Drive)' value='${l.platform}' data-platform-idx='${i}'>
          </div>
          <div class='col-7'>
            <input type='url' class='form-control' placeholder='Link do material' value='${l.url}' data-url-idx='${i}'>
          </div>
          <div class='col-1'>
            <button type='button' class='btn btn-danger btn-sm' data-remove-link='${i}'>&times;</button>
          </div>
        </div>
      `;
    });
    area.querySelectorAll('[data-remove-link]').forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(btn.getAttribute('data-remove-link'));
        links.splice(idx, 1);
        renderLinksFields();
      };
    });
    area.querySelectorAll('[data-platform-idx]').forEach(input => {
      input.oninput = function() {
        links[parseInt(input.getAttribute('data-platform-idx'))].platform = input.value;
      };
    });
    area.querySelectorAll('[data-url-idx]').forEach(input => {
      input.oninput = function() {
        links[parseInt(input.getAttribute('data-url-idx'))].url = input.value;
      };
    });
  }
  renderLinksFields();
  document.getElementById('add-link-btn').onclick = function() {
    links.push({ platform: '', url: '' });
    renderLinksFields();
  };
  document.getElementById('cancel-material').onclick = function() {
    area.remove();
  };
  document.getElementById('material-form').onsubmit = function(e) {
    e.preventDefault();
    let courses = getCourses();
    const title = document.getElementById('material-title').value.trim();
    const desc = document.getElementById('material-desc').value.trim();
    const prof = document.getElementById('material-prof').value.trim();
    const type = document.getElementById('material-type').value;
    const validLinks = links.filter(l => l.platform && l.url);
    if (validLinks.length === 0) {
      alert('Adicione pelo menos um link de material!');
      return;
    }
    const materials = courses[courseIdx].modules[modIdx].materials;
    if (!material && materials.some(m => m.title.toLowerCase() === title.toLowerCase())) {
      alert('Já existe um material com esse título neste módulo!');
      return;
    }
    if (material && materials.some((m, i) => m.title.toLowerCase() === title.toLowerCase() && i !== matIdx)) {
      alert('Já existe um material com esse título neste módulo!');
      return;
    }
    if (material) {
      courses[courseIdx].modules[modIdx].materials[matIdx] = { title, desc, prof, type, links: validLinks };
    } else {
      courses[courseIdx].modules[modIdx].materials.push({ title, desc, prof, type, links: validLinks });
    }
    setCourses(courses);
    area.remove();
    showMaterialsArea(courses, courseIdx, modIdx, true);
  };
}

function addAdminVideoMaterialEvents(courses, courseIdx, modIdx) {
  // Excluir vídeo
  document.querySelectorAll('[data-del-video]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-del-video'));
      if (confirm('Deseja excluir este vídeo?')) {
        courses[courseIdx].modules[modIdx].videos.splice(idx, 1);
        setCourses(courses);
        showMaterialsArea(courses, courseIdx, modIdx, true);
      }
    };
  });
  // Excluir material
  document.querySelectorAll('[data-del-material]').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-del-material'));
      if (confirm('Deseja excluir este material?')) {
        courses[courseIdx].modules[modIdx].materials.splice(idx, 1);
        setCourses(courses);
        showMaterialsArea(courses, courseIdx, modIdx, true);
      }
    };
  });
}

// Substituir showDashboard para chamar renderCoursesArea
function showDashboard(user, forceRole = null) {
  document.getElementById('auth-container').classList.add('d-none');
  const mainApp = document.getElementById('main-app');
  mainApp.classList.remove('d-none');
  // Se for admin e quiser ver como aluno
  let userView = { ...user };
  if (forceRole) userView.role = forceRole;
  renderCoursesAreaWithProfile(userView, user);
}

// Função para obter logo (do localStorage ou padrão)
function getLogoSrc() {
  return localStorage.getItem('platform_logo') || 'assets/admac.png';
}

// Botão para admin trocar logo
function renderCoursesAreaWithProfile(user, realUser) {
  const mainApp = document.getElementById('main-app');
  let courses = getCourses();
  // Remover logo do topo
  let html = '';
  html += `<div class='mb-3 d-flex justify-content-between align-items-center'>`;
  html += `<div>`;
  html += `<button class='btn btn-outline-danger btn-sm' id='logout-btn'>Sair</button>`;
  if (realUser.role === 'admin') {
    html += `<button class='btn btn-outline-info btn-sm ms-2' id='switch-view-btn'>${user.role === 'admin' ? 'Visualizar como Aluno' : 'Voltar para Admin'}</button>`;
    html += `<button class='btn btn-outline-primary btn-sm ms-2' id='change-bg-btn'>Alterar imagem de fundo</button>`;
    html += `<button class='btn btn-outline-success btn-sm ms-2' id='change-logo-btn'>Alterar logo</button>`;
    html += `<button class='btn btn-outline-danger btn-sm ms-2' id='remove-logo-btn'>Remover logo</button>`;
  }
  html += `</div>`;
  html += `<div>`;
  if (user.photo) {
    html += `<img src='${user.photo}' alt='Foto de Perfil' class='rounded-circle' style='width:48px;height:48px;object-fit:cover;border:2px solid #ccc;'>`;
  }
  html += `</div>`;
  html += `</div>`;
  html += `<h3>Bem-vindo, ${user.name} (${user.role === 'admin' ? 'Administrador' : 'Aluno'})</h3>`;
  if (user.role === 'admin') {
    html += `
      <div class='mt-4'>
        <h5>Cursos</h5>
        <button class='btn btn-primary btn-sm mb-3' id='add-course-btn'>Novo Curso</button>
        <div id='courses-list'>${renderCoursesTable(courses, true)}</div>
      </div>
      <div id='course-form-area'></div>
    `;
  } else {
    html += `
      <div class='mt-4'>
        <h5>Cursos Disponíveis</h5>
        <div id='courses-list'>${renderCoursesTable(courses, false)}</div>
      </div>
    `;
  }
  mainApp.innerHTML = html;
  document.getElementById('logout-btn').onclick = function() {
    clearSession();
    mainApp.classList.add('d-none');
    document.getElementById('auth-container').classList.remove('d-none');
    loginForm.reset();
  };
  if (realUser.role === 'admin') {
    document.getElementById('switch-view-btn').onclick = function() {
      if (user.role === 'admin') {
        showDashboard(realUser, 'aluno');
      } else {
        showDashboard(realUser, 'admin');
      }
    };
    document.getElementById('change-bg-btn').onclick = function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            localStorage.setItem('platform_bg', evt.target.result);
            applyBackgroundImage();
            alert('Imagem de fundo alterada com sucesso!');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    };
    document.getElementById('change-logo-btn').onclick = function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            localStorage.setItem('platform_logo', evt.target.result);
            // Atualiza logo imediatamente
            document.getElementById('main-logo').src = evt.target.result;
            alert('Logo alterada com sucesso!');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    };
    document.getElementById('remove-logo-btn').onclick = function() {
      if (confirm('Deseja remover a logo personalizada e voltar para a padrão?')) {
        localStorage.removeItem('platform_logo');
        document.getElementById('main-logo').src = getLogoSrc();
        updateLoginLogo();
        alert('Logo removida!');
      }
    };
  }
  if (user.role === 'admin') {
    document.getElementById('add-course-btn').onclick = function() {
      showCourseForm();
    };
    addAdminCourseEvents(courses);
  } else {
    addAlunoCourseEvents(courses);
  }
  applyBackgroundImage();
}

// Adicionar usuário administrador padrão se não existir
function addDefaultAdmin() {
  let users = getUsers();
  const adminEmail = 'admacdf@gmail.com';
  if (!users.find(u => u.email === adminEmail)) {
    users.push({
      name: 'Administrador Padrão',
      email: adminEmail,
      password: 'admac2024',
      role: 'admin'
    });
    setUsers(users);
  }
}

// Adicionar seleção rápida de login
function addQuickLoginOptions() {
  const loginFormDiv = loginForm.parentElement;
  const quickDiv = document.createElement('div');
  quickDiv.className = 'mb-3';
  quickDiv.innerHTML = `
    <div class="d-flex justify-content-center gap-2">
      <button type="button" class="btn btn-outline-primary btn-sm" id="quick-admin">Entrar como Administrador</button>
      <button type="button" class="btn btn-outline-secondary btn-sm" id="quick-aluno">Entrar como Aluno</button>
    </div>
  `;
  loginFormDiv.insertBefore(quickDiv, loginFormDiv.firstChild);
  document.getElementById('quick-admin').onclick = function() {
    document.getElementById('login-email').value = 'admacdf@gmail.com';
    document.getElementById('login-password').value = 'admac2024';
    loginForm.requestSubmit();
  };
  document.getElementById('quick-aluno').onclick = function() {
    const users = getUsers();
    const aluno = users.find(u => u.role === 'aluno');
    if (aluno) {
      document.getElementById('login-email').value = aluno.email;
      document.getElementById('login-password').value = aluno.password;
      loginForm.requestSubmit();
    } else {
      alert('Nenhum aluno cadastrado ainda!');
    }
  };
}

// Função para aplicar imagem de fundo
function applyBackgroundImage() {
  const bg = localStorage.getItem('platform_bg');
  if (bg) {
    document.body.style.backgroundImage = `url('${bg}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  } else {
    document.body.style.backgroundImage = '';
  }
}

// Atualizar logo na tela de login/cadastro
function updateLoginLogo() {
  const logo = document.querySelector('#auth-container img[alt="Logo ADMAC"]');
  if (logo) logo.src = getLogoSrc();
}

// Chamar updateLoginLogo ao carregar a página
window.onload = function() {
  addDefaultAdmin();
  addQuickLoginOptions();
  applyBackgroundImage();
  updateLoginLogo();
  const session = getSession();
  if (session) {
    showDashboard(session);
  }
}; 