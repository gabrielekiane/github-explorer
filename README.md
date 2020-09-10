# github-explorer

### Instalando dependências: 
Para baixar as dependências do projeto execute:

```
yarn 
```
ou 
```
npm i 
```

### Startando projeto:
Para rodar o projeto você pode executá-lo através do comando:
```
yarn start
```
ou 
```
npm start
```


### Sobre o projeto: 
O objetivo era consumir a api do github para poder acessar os repositórios e também as issues de cada projeto de um determinado user.
Para isso, foi utilizado:

* react-router-dom: para lidar com as rotas da aplicação;
* styled-components: essa package isola o nosso CSS em componentes, fazendo com que a estilização não afete o restante da aplicação (https://styled-components.com/);
    * além disso, o styled-components também aceita o 'encadeamento' dos estilos, como os pré-processadores SASS, LESS etc. Demais, né???
* polished: é uma lib que nos permite trabalhar com cores: clarear, escurecer, mexer no contraste... (https://polished.js.org/);
* react-icons: contém todos os ícones de fontes disponíveis;
* Axios: http client (https://github.com/axios/axios);

### Vídeo do projeto: 

![github-explorer](https://user-images.githubusercontent.com/39500774/92667305-f4fce800-f2e1-11ea-87be-40153e59ecbd.gif)
