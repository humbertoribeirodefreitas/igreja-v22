# Painel Administrativo - Igreja Admac

## 📋 Visão Geral

Este é o painel administrativo completo para gerenciar todos os conteúdos do site da Igreja Admac. O sistema permite que administradores cadastrados atualizem facilmente vídeos, carrossel, revista, avisos e outras informações do site.

## 🔐 Acesso ao Sistema

### Credenciais de Login
- **Usuário:** `admin`
- **Senha:** `admac2024`

### URL de Acesso
```
/admin/login.html
```

## 🚀 Funcionalidades

### 1. Dashboard Principal
- Visão geral das estatísticas do site
- Atividades recentes
- Ações rápidas para gerenciamento

### 2. Gerenciamento de Vídeos
- ✅ Adicionar novos vídeos do YouTube
- ✅ Editar vídeos existentes
- ✅ Excluir vídeos
- ✅ Visualização em tempo real
- ✅ Extração automática do ID do embed

### 3. Gerenciamento do Carrossel
- ✅ Adicionar novas imagens
- ✅ Editar títulos e descrições
- ✅ Reordenar itens
- ✅ Upload de imagens
- ✅ Visualização prévia

### 4. Revista Admac
- ✅ Atualizar link do Google Drive
- ✅ Editar título e descrição
- ✅ Salvar alterações automaticamente

### 5. Gerenciamento de Ministérios
- ✅ Gerenciar conteúdo de todos os ministérios (Intercessão, Homens, Mulheres, Jovens, Kids, Louvor, Social, Lares, Retiro, EDB)
- ✅ Editar títulos, subtítulos e descrições
- ✅ Gerenciar horários e atividades de cada ministério
- ✅ Controle completo do conteúdo das páginas de ministérios

### 6. Gerenciamento de Galerias
- ✅ Gerenciar fotos de todas as galerias (Intercessão, Homens, Mulheres, Jovens, Kids, Social)
- ✅ Adicionar, editar e excluir fotos
- ✅ Organizar por categorias
- ✅ Visualização em grid responsivo

### 7. Gerenciamento de Avisos
- ✅ Adicionar novos avisos
- ✅ Editar avisos existentes
- ✅ Upload de imagens para avisos
- ✅ Ativar/desativar avisos

### 8. Redes Sociais
- ✅ Gerenciar links do Instagram
- ✅ Gerenciar links do YouTube
- ✅ Gerenciar links do Facebook
- ✅ Gerenciar links do WhatsApp
- ✅ Gerenciar links do Spotify

### 9. Configurações Gerais
- ✅ Informações da igreja
- ✅ Endereço e contato
- ✅ Configurações do site

## 🛠️ Estrutura de Arquivos

```
admin/
├── login.html          # Página de login
├── dashboard.html      # Painel principal
├── js/
│   └── admin.js       # Funcionalidades JavaScript
└── README.md          # Esta documentação
```

## 📱 Interface Responsiva

O painel administrativo é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilização (Bootstrap 5)
- **JavaScript** - Funcionalidades
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Ícones

## 🎨 Design

- Interface moderna e intuitiva
- Sidebar de navegação
- Cards informativos
- Modais para edição
- Alertas de feedback
- Gradientes e sombras elegantes

## 🔒 Segurança

### Autenticação
- Sistema de login com credenciais
- Sessão persistente com localStorage
- Verificação de autenticação em todas as páginas

### Dados
- Dados armazenados em memória (simulação)
- Em produção, integrar com backend seguro
- Validação de entrada de dados

## 📊 Funcionalidades por Seção

### Dashboard
- Estatísticas em tempo real
- Cards informativos
- Atividades recentes
- Ações rápidas

### Vídeos
- Lista de vídeos ativos
- Preview em iframe
- Formulários de edição
- Validação de URLs do YouTube

### Carrossel
- Tabela de itens
- Upload de imagens
- Reordenação
- Preview de imagens

### Revista
- Formulário de edição
- Link do Google Drive
- Descrição personalizada
- Salvamento automático

### Ministérios
- Gerenciamento de todos os ministérios
- Edição de títulos, descrições e horários
- Controle de atividades por ministério
- Interface intuitiva para cada seção

### Galerias
- Gerenciamento de fotos por categoria
- Upload e organização de imagens
- Visualização em grid responsivo
- Controle de exclusão e edição

### Avisos
- Cards de avisos
- Upload de imagens
- Edição inline
- Status ativo/inativo

### Redes Sociais
- Formulários organizados
- Ícones das redes
- Validação de URLs
- Salvamento em lote

## 🚀 Como Usar

1. **Acesse** `/admin/login.html`
2. **Faça login** com as credenciais
3. **Navegue** pelas seções no sidebar
4. **Gerencie** os conteúdos conforme necessário
5. **Salve** as alterações
6. **Visualize** as mudanças no site principal

## 🔄 Atualizações Futuras

- [ ] Integração com backend real
- [ ] Sistema de backup automático
- [ ] Logs de atividades
- [ ] Múltiplos usuários
- [ ] Permissões por nível
- [ ] Upload de arquivos para servidor
- [ ] Sistema de notificações
- [ ] Relatórios e analytics

## 📞 Suporte

Para dúvidas ou problemas com o painel administrativo, entre em contato com o administrador do sistema.

---

**Desenvolvido para Igreja Admac** 🏛️ 