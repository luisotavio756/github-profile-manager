# Challenge Greenmile

## Mind Map

- Para realizar o teste, antes de tudo coletei todos os requisitos que estavam explícitos no documento, ponderei as possíveis ferramentes que iria utilizar e iniciei a estrutura inicial com as configurações padrões de estilo e padrões de código. Além disso utilizei o Notion para organizar todas as idéias.
- Durante o desenvolvimento, tive alguns problemas para obter uma API_KEY fornecida pela Google, tendo em vista que eu nunca tinha utilizado, então tive que aprender a navegar no G Cloud e buscar a documentação para conseguir.
- Para o Switch Theme, optei por não utilizar Redux por dois motivos: pela maturidade atual da API Context do React e pela simplicidade do Hook, sendo assim, instalar o Redux e seus pacotes auxiliares seria gastas demais para resolver um pequeno problema.
- Após a finalização do projeto, percebi que algumas melhorias poderiam ser feitas e logo após subi para um host online e para o Github.

## Requirements

- Should be able enter a Github name and get User data and Starred repositories;
- Should be able show the User location in a Map;
- Should be able star a especific repository listed;
- Should be able toggle theme.

## To-Do

- [x]  Initialize Project
- [x]  Install Packages:
    - ESLint + Prettier;
    - React Icons;
    - Styled Components;
    - TypeScript;
    - Axios;
    - Unform;
    - Polished;
    - React Router DOM;
    - React Geolocation.
- [x]  Define colors and fonts
    - Font: Century Gothic
    - Colors:
        - Green: #8bb03e
        - Blue: #28343d
- [x]  Create Main Page
    - Page with input to enter nick ID of the Github.
- [x]  List User meta data from Github user response;
- [x]  List the repositories stargarreds from the User;
- [x]  Get coordinates of the user from the User address;
- [x]  Implements the Switch Theme color;
- [x]  Build tests.
