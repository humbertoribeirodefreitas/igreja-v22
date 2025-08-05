// Sistema de Gerenciamento do Painel Administrativo - Igreja Admac

// Dados simulados (em produção, usar backend real)
let adminData = {
    videos: [
        { id: 1, title: "Culto Recente", url: "https://www.youtube.com/live/jt9ZbdhlA1k?si=Y2VZdrOGFDTIReDk", embedId: "jt9ZbdhlA1k", description: "Assista ao culto mais recente transmitido ao vivo.", active: true },
        { id: 2, title: "Último Culto de Libertação", url: "https://www.youtube.com/live/zVsHVmOZlBI?si=moupLT8oHlRqPbTS", embedId: "zVsHVmOZlBI", description: "Assista ao último culto de libertação transmitido ao vivo.", active: true }
    ],
    carousel: [
        { id: 1, image: "./assets/img/bem vindo.jpg", title: "Mensagens Inspiradoras", description: "Ouça as mensagens que transformam vidas", order: 1, active: true },
        { id: 2, image: "./assets/img/estudo biblico.jpg", title: "Estudos Bíblicos", description: "Aprofunde seu conhecimento na palavra de Deus", order: 2, active: true }
    ],
    revista: {
        link: "https://drive.google.com/file/d/1ISlkhSaVjWEwmEexybSQNZBt-ZQghGa5/view?pli=1",
        title: "Revista Admac",
        description: "A revista Admac traz mensagens inspiradoras, testemunhos, programações e muito mais para edificar sua vida espiritual."
    },
    avisos: [
        { id: 1, title: "AVISO IMPORTANTE", message: "(AJUDE O MAIS VELHO NAS FERRAMENTA DA IGREJA)", image: "./assets/img/aviso1.jpg", active: true }
    ],
    redesSociais: {
        instagram: "https://www.instagram.com/admac.sede/?igsh=azEwaWdqZmVxeWJ0#",
        youtube: "https://www.youtube.com/live/R3IjLXJTjgI?si=jegsIdEOh3vjbRLx",
        facebook: "https://www.facebook.com/roberto.silva.228792/",
        whatsapp: "https://wa.me/5561993241084?text=Olá! Gostaria de fazer um pedido de oração.",
        spotify: "https://open.spotify.com/show/2lzm9pXbj4PCoWcxsFzDtf"
    },
    // Novos dados para páginas de ministérios
    ministerios: {
        intercessao: {
            titulo: "Ministério de Intercessão",
            subtitulo: "Unidos em oração, transformando vidas através da intercessão",
            descricao: "O Ministério de Intercessão é dedicado à oração e intercessão pela igreja, pela cidade e por todas as necessidades. Nossa missão é buscar a presença de Deus e interceder por todos.",
            horarios: [
                { dia: "Segunda", horario: "19h às 21h", descricao: "Oração pela igreja" },
                { dia: "Quarta", horario: "19h30 às 21h", descricao: "Intercessão pela cidade" },
                { dia: "Sexta", horario: "19h às 21h", descricao: "Oração pelos enfermos" }
            ],
            atividades: [
                { titulo: "Oração", descricao: "Momentos dedicados à oração e intercessão", icone: "fas fa-pray" },
                { titulo: "Vigílias", descricao: "Vigílias de oração mensais", icone: "fas fa-moon" },
                { titulo: "Intercessão", descricao: "Intercessão por necessidades específicas", icone: "fas fa-hands" }
            ]
        },
        homens: {
            titulo: "Ministério de Homens",
            subtitulo: "Homens de fé, líderes em suas casas e na sociedade",
            descricao: "O Ministério de Homens busca formar líderes cristãos, fortalecer os laços familiares e desenvolver o caráter masculino baseado nos princípios bíblicos.",
            horarios: [
                { dia: "Sábado", horario: "17h às 19h", descricao: "Encontro dos homens" }
            ],
            atividades: [
                { titulo: "Estudos Bíblicos", descricao: "Estudos específicos para homens", icone: "fas fa-book" },
                { titulo: "Confra", descricao: "Momentos de confraternização", icone: "fas fa-users" },
                { titulo: "Liderança", descricao: "Desenvolvimento de liderança", icone: "fas fa-crown" }
            ]
        },
        mulheres: {
            titulo: "Ministério de Mulheres",
            subtitulo: "Mulheres virtuosas, transformando vidas com amor",
            descricao: "O Ministério de Mulheres visa fortalecer e empoderar as mulheres através da palavra de Deus, criando laços de amizade e apoio mútuo.",
            horarios: [
                { dia: "Sábado", horario: "14h às 16h", descricao: "Encontro das mulheres" }
            ],
            atividades: [
                { titulo: "Oração", descricao: "Círculo de oração feminino", icone: "fas fa-pray" },
                { titulo: "Estudos", descricao: "Estudos bíblicos para mulheres", icone: "fas fa-book-open" },
                { titulo: "Confra", descricao: "Momentos de confraternização", icone: "fas fa-heart" }
            ]
        },
        jovens: {
            titulo: "Ministério de Jovens",
            subtitulo: "Juventude apaixonada por Deus",
            descricao: "O Ministério de Jovens busca despertar a juventude para uma vida de propósito, através de eventos dinâmicos e relevantes para a nova geração.",
            horarios: [
                { dia: "Sábado", horario: "19h às 21h", descricao: "Encontro da juventude" }
            ],
            atividades: [
                { titulo: "Louvor", descricao: "Momentos de adoração jovem", icone: "fas fa-music" },
                { titulo: "Palestras", descricao: "Palestras motivacionais", icone: "fas fa-microphone" },
                { titulo: "Eventos", descricao: "Eventos especiais para jovens", icone: "fas fa-calendar" }
            ]
        },
        kids: {
            titulo: "Ministério Kids",
            subtitulo: "Crianças felizes, aprendendo sobre o amor de Deus",
            descricao: "O Ministério Kids é dedicado ao ensino bíblico de forma lúdica e divertida, desenvolvendo o caráter cristão desde a infância.",
            horarios: [
                { dia: "Domingo", horario: "09h às 11h", descricao: "Escola Bíblica Infantil" },
                { dia: "Sábado", horario: "14h às 16h", descricao: "Atividades Kids" }
            ],
            atividades: [
                { titulo: "Histórias Bíblicas", descricao: "Contação de histórias bíblicas", icone: "fas fa-book" },
                { titulo: "Brincadeiras", descricao: "Atividades lúdicas e educativas", icone: "fas fa-gamepad" },
                { titulo: "Artes", descricao: "Atividades artísticas e manuais", icone: "fas fa-palette" }
            ]
        },
        louvor: {
            titulo: "Ministério de Louvor",
            subtitulo: "Adorando a Deus com excelência e dedicação",
            descricao: "O Ministério de Louvor é responsável por conduzir a igreja em adoração, criando um ambiente de entrega e comunhão com Deus através da música.",
            horarios: [
                { dia: "Quarta", horario: "19h30 às 21h", descricao: "Ensaio geral" },
                { dia: "Sábado", horario: "17h às 19h", descricao: "Ensaio específico" },
                { dia: "Domingo", horario: "18h às 20h", descricao: "Ministração" }
            ],
            atividades: [
                { titulo: "Ensaios", descricao: "Encontros semanais para ensaio", icone: "fas fa-music" },
                { titulo: "Comunhão", descricao: "Momentos de integração", icone: "fas fa-users" },
                { titulo: "Ministrações", descricao: "Participação em cultos e eventos", icone: "fas fa-microphone" }
            ]
        },
        social: {
            titulo: "Área Social",
            subtitulo: "Servindo ao próximo com amor e compaixão",
            descricao: "A Área Social da Igreja Admac é responsável por desenvolver e coordenar ações sociais que visam ajudar pessoas em situação de vulnerabilidade.",
            objetivos: [
                "Ajuda humanitária",
                "Inclusão social", 
                "Desenvolvimento comunitário",
                "Transformação social"
            ],
            projetos: [
                { titulo: "Cesta Básica", descricao: "Distribuição mensal de alimentos", frequencia: "Todo último sábado do mês" },
                { titulo: "Apoio Escolar", descricao: "Material escolar e uniformes", frequencia: "Início do ano letivo" },
                { titulo: "Campanha do Agasalho", descricao: "Arrecadação de roupas de inverno", frequencia: "Durante o inverno" }
            ],
            acoes: [
                { titulo: "Voluntariado", descricao: "Envolvimento da comunidade em ações sociais", icone: "fas fa-hands-helping" },
                { titulo: "Doações", descricao: "Arrecadação e distribuição de donativos", icone: "fas fa-heart" },
                { titulo: "Apoio", descricao: "Acompanhamento e suporte às famílias", icone: "fas fa-hands" }
            ]
        },
        lares: {
            titulo: "Ministério de Lares",
            subtitulo: "Famílias unidas em Cristo",
            descricao: "O Ministério de Lares promove a união familiar através de encontros em casas, fortalecendo os laços e a fé das famílias.",
            horarios: [
                { dia: "Domingo", horario: "19h às 21h", descricao: "Culto nos lares" }
            ],
            atividades: [
                { titulo: "Cultos", descricao: "Cultos realizados em casas", icone: "fas fa-home" },
                { titulo: "Comunhão", descricao: "Momentos de comunhão familiar", icone: "fas fa-users" },
                { titulo: "Oração", descricao: "Oração pelas famílias", icone: "fas fa-pray" }
            ]
        },
        retiro: {
            titulo: "Ministério de Retiro",
            subtitulo: "Momentos especiais de renovação espiritual",
            descricao: "O Ministério de Retiro organiza retiros espirituais para renovação, comunhão e fortalecimento da fé.",
            proximoRetiro: {
                titulo: "Retiro de Renovação 2024",
                data: "15-17 de Março",
                local: "Chácara Recanto da Paz",
                descricao: "Um fim de semana especial para renovação espiritual"
            },
            atividades: [
                { titulo: "Palestras", descricao: "Palestras edificantes", icone: "fas fa-microphone" },
                { titulo: "Louvor", descricao: "Momentos de adoração", icone: "fas fa-music" },
                { titulo: "Comunhão", descricao: "Tempo de comunhão e amizade", icone: "fas fa-users" }
            ]
        },
        edb: {
            titulo: "Escola Dominical Bíblica",
            subtitulo: "Aprendendo a palavra de Deus",
            descricao: "A EDB oferece estudos bíblicos sistemáticos para todas as idades, promovendo o conhecimento da palavra de Deus.",
            horarios: [
                { dia: "Domingo", horario: "09h às 11h", descricao: "Escola Dominical" }
            ],
            classes: [
                { nome: "Berçário", faixaEtaria: "0-3 anos", professor: "Maria Silva" },
                { nome: "Primários", faixaEtaria: "4-7 anos", professor: "João Santos" },
                { nome: "Juniors", faixaEtaria: "8-11 anos", professor: "Ana Costa" },
                { nome: "Adolescentes", faixaEtaria: "12-17 anos", professor: "Pedro Lima" },
                { nome: "Adultos", faixaEtaria: "18+ anos", professor: "Pastor Roberto" }
            ]
        }
    },
    // Dados para galerias
    galerias: {
        intercessao: [
            { id: 1, titulo: "Momento de Oração", descricao: "Momento de oração e intercessão", imagem: "../assets/img/hoje.jpg", categoria: "intercessao" },
            { id: 2, titulo: "Vigília de Oração", descricao: "Vigília mensal de oração", imagem: "../assets/img/hoje (2).jpg", categoria: "intercessao" }
        ],
        homens: [
            { id: 3, titulo: "Encontro dos Homens", descricao: "Encontro dos homens da igreja", imagem: "../assets/img/hoje (3).jpg", categoria: "homens" }
        ],
        mulheres: [
            { id: 4, titulo: "Encontro das Mulheres", descricao: "Encontro das mulheres da igreja", imagem: "../assets/img/hoje (4).jpg", categoria: "mulheres" }
        ],
        jovens: [
            { id: 5, titulo: "Encontro da Juventude", descricao: "Encontro da juventude", imagem: "../assets/img/hoje (5).jpg", categoria: "jovens" }
        ],
        kids: [
            { id: 6, titulo: "Atividades Kids", descricao: "Atividades do ministério kids", imagem: "../assets/img/hoje (6).jpg", categoria: "kids" }
        ],
        social: [
            { id: 7, titulo: "Ação Social", descricao: "Evento de apoio à comunidade", imagem: "../assets/img/aviso1.jpg", categoria: "social" },
            { id: 8, titulo: "Visita Social", descricao: "Visitas a famílias", imagem: "../assets/img/hoje (4).jpg", categoria: "social" },
            { id: 9, titulo: "Campanha Solidária", descricao: "Campanhas de arrecadação", imagem: "../assets/img/bem vindo.jpg", categoria: "social" }
        ]
    }
};

// Funções para gerenciar vídeos
function loadVideos() {
    const videosList = document.getElementById('videosList');
    if (!videosList) return;

    videosList.innerHTML = adminData.videos.map(video => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/${video.embedId}" 
                            title="${video.title}" allowfullscreen></iframe>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <p class="card-text">${video.description}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="editVideo(${video.id})">
                            <i class="fas fa-edit me-1"></i>Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteVideo(${video.id})">
                            <i class="fas fa-trash me-1"></i>Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function addVideo() {
    const modal = createModal('Adicionar Vídeo', `
        <form id="videoForm">
            <div class="mb-3">
                <label class="form-label">Título do Vídeo</label>
                <input type="text" class="form-control" id="videoTitle" required>
            </div>
            <div class="mb-3">
                <label class="form-label">URL do YouTube</label>
                <input type="url" class="form-control" id="videoUrl" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Descrição</label>
                <textarea class="form-control" id="videoDescription" rows="3"></textarea>
            </div>
        </form>
    `, () => {
        const title = document.getElementById('videoTitle').value;
        const url = document.getElementById('videoUrl').value;
        const description = document.getElementById('videoDescription').value;
        
        // Extrair ID do embed da URL do YouTube
        const embedId = extractYouTubeId(url);
        
        if (embedId) {
            const newVideo = {
                id: Date.now(),
                title: title,
                url: url,
                embedId: embedId,
                description: description,
                active: true
            };
            
            adminData.videos.push(newVideo);
            loadVideos();
            showAlert('Vídeo adicionado com sucesso!', 'success');
        } else {
            showAlert('URL do YouTube inválida!', 'danger');
        }
    });
    
    document.body.appendChild(modal);
}

function editVideo(id) {
    const video = adminData.videos.find(v => v.id === id);
    if (!video) return;
    
    const modal = createModal('Editar Vídeo', `
        <form id="videoForm">
            <div class="mb-3">
                <label class="form-label">Título do Vídeo</label>
                <input type="text" class="form-control" id="videoTitle" value="${video.title}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">URL do YouTube</label>
                <input type="url" class="form-control" id="videoUrl" value="${video.url}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Descrição</label>
                <textarea class="form-control" id="videoDescription" rows="3">${video.description}</textarea>
            </div>
        </form>
    `, () => {
        const title = document.getElementById('videoTitle').value;
        const url = document.getElementById('videoUrl').value;
        const description = document.getElementById('videoDescription').value;
        
        const embedId = extractYouTubeId(url);
        
        if (embedId) {
            video.title = title;
            video.url = url;
            video.embedId = embedId;
            video.description = description;
            
            loadVideos();
            showAlert('Vídeo atualizado com sucesso!', 'success');
        } else {
            showAlert('URL do YouTube inválida!', 'danger');
        }
    });
    
    document.body.appendChild(modal);
}

function deleteVideo(id) {
    if (confirm('Tem certeza que deseja excluir este vídeo?')) {
        adminData.videos = adminData.videos.filter(v => v.id !== id);
        loadVideos();
        showAlert('Vídeo excluído com sucesso!', 'success');
    }
}

// Funções para gerenciar carrossel
function loadCarouselItems() {
    const carouselItems = document.getElementById('carouselItems');
    if (!carouselItems) return;

    carouselItems.innerHTML = adminData.carousel.map(item => `
        <tr>
            <td>
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            </td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.order}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-primary" onclick="editCarouselItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteCarouselItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addCarouselItem() {
    const modal = createModal('Adicionar Item do Carrossel', `
        <form id="carouselForm">
            <div class="mb-3">
                <label class="form-label">Imagem</label>
                <input type="file" class="form-control" id="carouselImage" accept="image/*" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Título</label>
                <input type="text" class="form-control" id="carouselTitle" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Descrição</label>
                <textarea class="form-control" id="carouselDescription" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Ordem</label>
                <input type="number" class="form-control" id="carouselOrder" value="${adminData.carousel.length + 1}">
            </div>
        </form>
    `, () => {
        const title = document.getElementById('carouselTitle').value;
        const description = document.getElementById('carouselDescription').value;
        const order = parseInt(document.getElementById('carouselOrder').value);
        const imageFile = document.getElementById('carouselImage').files[0];
        
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            
            const newItem = {
                id: Date.now(),
                image: imageUrl,
                title: title,
                description: description,
                order: order,
                active: true
            };
            
            adminData.carousel.push(newItem);
            loadCarouselItems();
            showAlert('Item do carrossel adicionado com sucesso!', 'success');
        }
    });
    
    document.body.appendChild(modal);
}

// Funções para gerenciar revista
function saveRevista() {
    const link = document.getElementById('revistaLink').value;
    const title = document.getElementById('revistaTitulo').value;
    const description = document.getElementById('revistaDescricao').value;
    
    adminData.revista = {
        link: link,
        title: title,
        description: description
    };
    
    showAlert('Revista atualizada com sucesso!', 'success');
}

// Funções para gerenciar avisos
function loadAvisoSection() {
    document.getElementById('content-sections').innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Gerenciar Avisos</h5>
                <button class="btn btn-primary btn-sm" onclick="addAviso()">
                    <i class="fas fa-plus me-2"></i>Adicionar Aviso
                </button>
            </div>
            <div class="card-body">
                <div class="row" id="avisosList">
                    <!-- Avisos serão carregados aqui -->
                </div>
            </div>
        </div>
    `;
    loadAvisos();
}

function loadAvisos() {
    const avisosList = document.getElementById('avisosList');
    if (!avisosList) return;

    avisosList.innerHTML = adminData.avisos.map(aviso => `
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    <img src="${aviso.image}" alt="Aviso" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" class="mb-3">
                    <h5 class="card-title">${aviso.title}</h5>
                    <p class="card-text">${aviso.message}</p>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-primary btn-sm" onclick="editAviso(${aviso.id})">
                            <i class="fas fa-edit me-1"></i>Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAviso(${aviso.id})">
                            <i class="fas fa-trash me-1"></i>Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Funções para gerenciar redes sociais
function loadRedesSociaisSection() {
    document.getElementById('content-sections').innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Gerenciar Redes Sociais</h5>
            </div>
            <div class="card-body">
                <form id="redesSociaisForm">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fab fa-instagram me-2"></i>Instagram
                                </label>
                                <input type="url" class="form-control" id="instagramUrl" 
                                       value="${adminData.redesSociais.instagram}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fab fa-youtube me-2"></i>YouTube
                                </label>
                                <input type="url" class="form-control" id="youtubeUrl" 
                                       value="${adminData.redesSociais.youtube}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fab fa-facebook me-2"></i>Facebook
                                </label>
                                <input type="url" class="form-control" id="facebookUrl" 
                                       value="${adminData.redesSociais.facebook}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fab fa-whatsapp me-2"></i>WhatsApp
                                </label>
                                <input type="url" class="form-control" id="whatsappUrl" 
                                       value="${adminData.redesSociais.whatsapp}">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">
                            <i class="fab fa-spotify me-2"></i>Spotify
                        </label>
                        <input type="url" class="form-control" id="spotifyUrl" 
                               value="${adminData.redesSociais.spotify}">
                    </div>
                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </form>
            </div>
        </div>
    `;
    
    // Adicionar evento de submit
    document.getElementById('redesSociaisForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveRedesSociais();
    });
}

function saveRedesSociais() {
    adminData.redesSociais = {
        instagram: document.getElementById('instagramUrl').value,
        youtube: document.getElementById('youtubeUrl').value,
        facebook: document.getElementById('facebookUrl').value,
        whatsapp: document.getElementById('whatsappUrl').value,
        spotify: document.getElementById('spotifyUrl').value
    };
    
    showAlert('Redes sociais atualizadas com sucesso!', 'success');
}

// Funções utilitárias
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function createModal(title, content, onSave) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="saveModalData()">Salvar</button>
                </div>
            </div>
        </div>
    `;
    
    // Armazenar função de callback
    window.saveModalData = onSave;
    
    // Mostrar modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Remover modal após fechar
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
    
    return modal;
}

function showAlert(message, type) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertContainer.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Remover alerta após 3 segundos
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.parentNode.removeChild(alertContainer);
        }
    }, 3000);
}

// Funções para carregar seções específicas (completar as que faltam)
function loadMinisteriosSection() {
    const ministerios = adminData.ministerios;
    let html = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Gerenciar Ministérios</h5>
                <button class="btn btn-primary btn-sm" onclick="showMinisterioModal()">
                    <i class="fas fa-plus me-2"></i>Adicionar Ministério
                </button>
            </div>
            <div class="card-body">
                <div class="row">
    `;
    
    Object.keys(ministerios).forEach(key => {
        const ministerio = ministerios[key];
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-title">${ministerio.titulo}</h6>
                        <p class="card-text small text-muted">${ministerio.subtitulo}</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="editMinisterio('${key}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-info btn-sm" onclick="viewMinisterio('${key}')">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('content-sections').innerHTML = html;
}

function showMinisterioModal(ministerioKey = null) {
    const ministerio = ministerioKey ? adminData.ministerios[ministerioKey] : null;
    const isEdit = !!ministerioKey;
    
    const modalHtml = `
        <div class="modal fade" id="ministerioModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-church me-2"></i>
                            ${isEdit ? 'Editar Ministério' : 'Adicionar Ministério'}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="ministerioForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Título do Ministério</label>
                                        <input type="text" class="form-control" id="ministerioTitulo" 
                                               value="${ministerio ? ministerio.titulo : ''}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Subtítulo</label>
                                        <input type="text" class="form-control" id="ministerioSubtitulo" 
                                               value="${ministerio ? ministerio.subtitulo : ''}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descrição</label>
                                <textarea class="form-control" id="ministerioDescricao" rows="3" required>${ministerio ? ministerio.descricao : ''}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Horários</label>
                                <div id="horariosContainer">
                                    ${ministerio ? ministerio.horarios.map((h, i) => `
                                        <div class="row mb-2 horario-item">
                                            <div class="col-md-3">
                                                <input type="text" class="form-control" placeholder="Dia" value="${h.dia}">
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" class="form-control" placeholder="Horário" value="${h.horario}">
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" class="form-control" placeholder="Descrição" value="${h.descricao}">
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeHorario(this)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('') : ''}
                                </div>
                                <button type="button" class="btn btn-outline-primary btn-sm" onclick="addHorario()">
                                    <i class="fas fa-plus me-2"></i>Adicionar Horário
                                </button>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Atividades</label>
                                <div id="atividadesContainer">
                                    ${ministerio ? ministerio.atividades.map((a, i) => `
                                        <div class="row mb-2 atividade-item">
                                            <div class="col-md-3">
                                                <input type="text" class="form-control" placeholder="Título" value="${a.titulo}">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" placeholder="Descrição" value="${a.descricao}">
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" placeholder="Ícone" value="${a.icone}">
                                            </div>
                                            <div class="col-md-1">
                                                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeAtividade(this)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('') : ''}
                                </div>
                                <button type="button" class="btn btn-outline-primary btn-sm" onclick="addAtividade()">
                                    <i class="fas fa-plus me-2"></i>Adicionar Atividade
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveMinisterio('${ministerioKey}')">
                            <i class="fas fa-save me-2"></i>Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('ministerioModal'));
    modal.show();
    
    document.getElementById('ministerioModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

function addHorario() {
    const container = document.getElementById('horariosContainer');
    const horarioHtml = `
        <div class="row mb-2 horario-item">
            <div class="col-md-3">
                <input type="text" class="form-control" placeholder="Dia">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control" placeholder="Horário">
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" placeholder="Descrição">
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeHorario(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', horarioHtml);
}

function removeHorario(button) {
    button.closest('.horario-item').remove();
}

function addAtividade() {
    const container = document.getElementById('atividadesContainer');
    const atividadeHtml = `
        <div class="row mb-2 atividade-item">
            <div class="col-md-3">
                <input type="text" class="form-control" placeholder="Título">
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Descrição">
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="Ícone">
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeAtividade(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', atividadeHtml);
}

function removeAtividade(button) {
    button.closest('.atividade-item').remove();
}

function saveMinisterio(ministerioKey = null) {
    const titulo = document.getElementById('ministerioTitulo').value;
    const subtitulo = document.getElementById('ministerioSubtitulo').value;
    const descricao = document.getElementById('ministerioDescricao').value;
    
    // Coletar horários
    const horarios = [];
    document.querySelectorAll('.horario-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            horarios.push({
                dia: inputs[0].value,
                horario: inputs[1].value,
                descricao: inputs[2].value
            });
        }
    });
    
    // Coletar atividades
    const atividades = [];
    document.querySelectorAll('.atividade-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            atividades.push({
                titulo: inputs[0].value,
                descricao: inputs[1].value,
                icone: inputs[2].value
            });
        }
    });
    
    const key = ministerioKey || titulo.toLowerCase().replace(/\s+/g, '_');
    
    adminData.ministerios[key] = {
        titulo,
        subtitulo,
        descricao,
        horarios,
        atividades
    };
    
    bootstrap.Modal.getInstance(document.getElementById('ministerioModal')).hide();
    showAlert('Ministério salvo com sucesso!', 'success');
    loadMinisteriosSection();
}

function editMinisterio(ministerioKey) {
    showMinisterioModal(ministerioKey);
}

function viewMinisterio(ministerioKey) {
    const ministerio = adminData.ministerios[ministerioKey];
    
    const modalHtml = `
        <div class="modal fade" id="viewMinisterioModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-church me-2"></i>${ministerio.titulo}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>${ministerio.subtitulo}</h6>
                        <p class="text-muted">${ministerio.descricao}</p>
                        
                        <h6 class="mt-4">Horários:</h6>
                        <ul class="list-unstyled">
                            ${ministerio.horarios.map(h => `
                                <li><i class="fas fa-clock me-2"></i><strong>${h.dia}:</strong> ${h.horario} - ${h.descricao}</li>
                            `).join('')}
                        </ul>
                        
                        <h6 class="mt-4">Atividades:</h6>
                        <div class="row">
                            ${ministerio.atividades.map(a => `
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <i class="${a.icone} fa-2x text-primary mb-2"></i>
                                            <h6>${a.titulo}</h6>
                                            <p class="small text-muted">${a.descricao}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" onclick="editMinisterio('${ministerioKey}')">
                            <i class="fas fa-edit me-2"></i>Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('viewMinisterioModal'));
    modal.show();
    
    document.getElementById('viewMinisterioModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Funções para gerenciar galerias
function loadGaleriasSection() {
    const galerias = adminData.galerias;
    let html = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Gerenciar Galerias</h5>
                <button class="btn btn-primary btn-sm" onclick="showGaleriaModal()">
                    <i class="fas fa-plus me-2"></i>Adicionar Foto
                </button>
            </div>
            <div class="card-body">
                <div class="row">
    `;
    
    Object.keys(galerias).forEach(categoria => {
        const fotos = galerias[categoria];
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0">${categoria.charAt(0).toUpperCase() + categoria.slice(1)} (${fotos.length} fotos)</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
        `;
        
        fotos.slice(0, 3).forEach(foto => {
            html += `
                <div class="col-4 mb-2">
                    <div class="position-relative">
                        <img src="${foto.imagem}" class="img-fluid rounded" style="height: 60px; object-fit: cover;" alt="${foto.titulo}">
                        <button class="btn btn-sm btn-outline-danger position-absolute top-0 end-0" 
                                onclick="deleteFoto('${categoria}', ${foto.id})" style="font-size: 0.5rem;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="viewGaleria('${categoria}')">
                            Ver todas (${fotos.length})
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('content-sections').innerHTML = html;
}

function showGaleriaModal() {
    const modalHtml = `
        <div class="modal fade" id="galeriaModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-image me-2"></i>Adicionar Foto
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="galeriaForm">
                            <div class="mb-3">
                                <label class="form-label">Categoria</label>
                                <select class="form-select" id="fotoCategoria" required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="intercessao">Intercessão</option>
                                    <option value="homens">Homens</option>
                                    <option value="mulheres">Mulheres</option>
                                    <option value="jovens">Jovens</option>
                                    <option value="kids">Kids</option>
                                    <option value="social">Social</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Título</label>
                                <input type="text" class="form-control" id="fotoTitulo" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descrição</label>
                                <textarea class="form-control" id="fotoDescricao" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">URL da Imagem</label>
                                <input type="url" class="form-control" id="fotoImagem" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveFoto()">
                            <i class="fas fa-save me-2"></i>Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('galeriaModal'));
    modal.show();
    
    document.getElementById('galeriaModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

function saveFoto() {
    const categoria = document.getElementById('fotoCategoria').value;
    const titulo = document.getElementById('fotoTitulo').value;
    const descricao = document.getElementById('fotoDescricao').value;
    const imagem = document.getElementById('fotoImagem').value;
    
    if (!categoria || !titulo || !imagem) {
        showAlert('Preencha todos os campos obrigatórios!', 'danger');
        return;
    }
    
    const novaFoto = {
        id: Date.now(),
        titulo,
        descricao,
        imagem,
        categoria
    };
    
    if (!adminData.galerias[categoria]) {
        adminData.galerias[categoria] = [];
    }
    
    adminData.galerias[categoria].push(novaFoto);
    
    bootstrap.Modal.getInstance(document.getElementById('galeriaModal')).hide();
    showAlert('Foto adicionada com sucesso!', 'success');
    loadGaleriasSection();
}

function deleteFoto(categoria, fotoId) {
    if (confirm('Tem certeza que deseja excluir esta foto?')) {
        adminData.galerias[categoria] = adminData.galerias[categoria].filter(f => f.id !== fotoId);
        showAlert('Foto excluída com sucesso!', 'success');
        loadGaleriasSection();
    }
}

function viewGaleria(categoria) {
    const fotos = adminData.galerias[categoria] || [];
    
    const modalHtml = `
        <div class="modal fade" id="viewGaleriaModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-images me-2"></i>Galeria - ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            ${fotos.map(foto => `
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img src="${foto.imagem}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${foto.titulo}">
                                        <div class="card-body">
                                            <h6 class="card-title">${foto.titulo}</h6>
                                            <p class="card-text small">${foto.descricao}</p>
                                            <button class="btn btn-outline-danger btn-sm" onclick="deleteFoto('${categoria}', ${foto.id})">
                                                <i class="fas fa-trash me-2"></i>Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('viewGaleriaModal'));
    modal.show();
    
    document.getElementById('viewGaleriaModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Funções para gerenciar configurações
function loadConfiguracoesSection() {
    document.getElementById('content-sections').innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Configurações Gerais</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nome da Igreja</label>
                            <input type="text" class="form-control" value="Igreja Admac">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Endereço</label>
                            <input type="text" class="form-control" value="QN 516 - Samambaia, Brasília - DF">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Telefone</label>
                            <input type="text" class="form-control" value="(061) 993241084">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" value="admacdf@gmail.com">
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary">Salvar Configurações</button>
            </div>
        </div>
    `;
}

// Exportar funções para uso global
window.adminFunctions = {
    loadVideos,
    addVideo,
    editVideo,
    deleteVideo,
    loadCarouselItems,
    addCarouselItem,
    saveRevista,
    loadAvisoSection,
    loadAvisos,
    loadRedesSociaisSection,
    saveRedesSociais,
    loadMinisteriosSection,
    loadConfiguracoesSection,
    loadGaleriasSection,
    showGaleriaModal,
    saveFoto,
    deleteFoto,
    viewGaleria,
    showMinisterioModal,
    saveMinisterio,
    editMinisterio,
    viewMinisterio,
    addHorario,
    removeHorario,
    addAtividade,
    removeAtividade
}; 