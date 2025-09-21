# Landing Page do Jogo War

Bem-vindo ao projeto da landing page do jogo War! Este projeto foi desenvolvido usando React e Vite, proporcionando uma experiência web moderna e eficiente para os interessados no jogo War.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
war-game-landing
├── src
│   ├── assets
│   │   └── styles
│   │       ├── global.css
│   │       └── landing.css
│   ├── components
|   |   ├── Landing.jsx
|   |   ├── PlayOptions.jsx
│   │   └── Sala.jsx
│   ├── App.jsx
│   └── main.jsx
├── public
|   ├── world-map.png
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Como começar

Para começar a editar o projeto, siga estes passos:

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra seu navegador:**
   Acesse `http://localhost:5173` para visualizar a landing page.

## Funcionalidades

- **Landing Page:** Tela inicial com visual atrativo e botão PLAY.
- **Opções de Jogo:** Após clicar em PLAY, o usuário escolhe entre:
  - **Host Game:** Cria uma nova sala, podendo editar o nome da sala e adicionar bots.
  - **Join Session:** Exibe as salas disponíveis para entrar.
- **Página da Sala:**
  - Exibe a lista de jogadores presentes na sala.
  - Se o usuário entrou como Host, pode editar o nome da sala e adicionar bots nas vagas livres.
  - Se entrou por Join Session, apenas visualiza o nome da sala e os jogadores.
  - O botão "Start" só fica disponível quando há pelo menos 3 jogadores (incluindo bots).
- **Navegação entre páginas** utilizando React Router.

## Tecnologias Utilizadas

- React
- Vite
- CSS

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
