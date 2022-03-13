# Meu-Guru Front-End Test

Este repositório se trata de um desafio técnico para uma vaga de Desenvolvedor Front-end Pleno da empresa MeuGuru.

## Descrição do projeto

Na página é apresentada uma tabela com uma lista de universidades brasileiras, obitda através de uma requisição GET para a API [https://api.meuguru.net/global/university](api.meuguru.net/global/university).

**OBS.:** Caso não seja possível carregar os dados da API, nomes aleatórios serão gerados para que o projeto ainda seja funcional.

Na tabela, o usuário é capaz de filtrar e ordenar as universidades por região, estado, local (interior ou capital) e tipo de universidade (privada ou pública), além de realizar buscas na tabela.

## Instruções de instalação

### Requisitos do sistema

Para seguir o passo-a-passo, será necessário que você tenha instalado em sua máquina o [Git](https://git-scm.com/) e o [NodeJS](https://nodejs.org/en/), preferencialmente em suas versões mais recentes.

### Procedimento

Abra uma janela do terminal ou do prompt de comando, e clone o repositório:

```bash
git clone git@github.com:ThalesQwerty/meuguru-frontend-test.git
# ou
git clone https://github.com/ThalesQwerty/meuguru-frontend-test.git
```

Em seguida, entre na pasta raiz do repositório e instale as dependências utilizando o `npm` ou `yarn`:

```bash
cd meuguru-frontend-test
yarn install
# ou
cd meuguru-frontend-test
npm install
```

### Executar localmente

Após a instalação, para executar o projeto em sua máquina, basta executar o comando:

```bash
yarn dev
# ou
npm run dev
```

Por fim, abra o seu navegador em [http://localhost:3000](http://localhost:3000) para executar localmente o projeto.

## Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
