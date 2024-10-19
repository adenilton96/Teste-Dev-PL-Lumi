# Projeto Node.js - Extrator de Faturas de Energia Elétrica
Este projeto tem como objetivo desenvolver um sistema para extrair dados de faturas de energia elétrica, armazená-los em um banco de dados PostgreSQL e exibi-los em uma interface web com gráficos e uma biblioteca de faturas. Utilizamos Node.js no back-end e React no front-end.

## Estrutura do Projeto

    ├───config
    ├───migrations
    ├───models
    ├───node_modules
    ├───public
    ├───seeders
    └───src
        ├───config
        ├───controllers
        ├───models
        └───utils

## Descrição dos Diretórios

config/: Contém arquivos de configuração da aplicação, incluindo configuração do banco de dados.
migrations/: Diretório onde as migrações do banco de dados são armazenadas.
models/: Contém os modelos Sequelize para interação com o banco de dados PostgreSQL.
public/: Arquivos públicos, como imagens, CSS e JavaScript, usados pela aplicação.
seeders/: Arquivos para popular o banco de dados com dados iniciais.
src/: Contém o código-fonte da aplicação.
config/: Configurações adicionais.
controllers/: Controladores para gerenciar a lógica da aplicação.
models/: Modelos usados para mapear as tabelas do banco de dados.
utils/: Funções utilitárias que auxiliam no processamento de dados.

## Instalação

### Pré-requisitos

- **Node.js (v14+)**
- **PostgreSQL**
- **NPM (v6+)**

## Passos de Instalação

1.**Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git

2.**Navegue até o diretório do projeto:**
    
    ```bash
    cd nome-do-projeto

3.**Instale as dependências:**
    
    ```bash
    npm install

## Configuração do Banco de Dados

1.**No arquivo .env_dev, renomear para .evn e adicione as configurações de conexão com o banco de dados:**

    PORT=3000
    DB_NAME=nome_do_banco
    DB_USER=seu_usuario
    DB_PWD=sua_senha
    DB_HOST=localhost
    DB_PORT=5432
    DB_DIALECT=postgres
    NODE_ENV=development

2.**Execute as migrações para criar o banco de dados de acordo com as configuraçãoes passadas no passo anterior:**      
    
    ```bash
    npx sequelize-cli db:create

3.**Execute as migrações para criar as tabelas no banco de dados:**

    ```bash
    npx sequelize-cli db:migrate

## Scripts Disponíveis
- **npm run dev**: Inicia a aplicação em modo de desenvolvimento com nodemon.
- **npm test**: Executa testes (ainda não implementados).

## Dependências
- **dotenv**: Carrega variáveis de ambiente.
- **express**: Framework web para criar APIs.
- **nodemon**: Reinicia automaticamente o servidor durante o desenvolvimento.
- **pdfjs-dist**: Biblioteca para manipular PDFs.
- **pg**: Driver para PostgreSQL.
- **sequelize**: ORM para interação com o banco de dados.

## Migrações
As migrações estão localizadas no diretório migrations/. Para criar uma nova migração, execute:

    ```bash
    npx sequelize-cli migration:generate --name nome-da-migracao

Depois de criar ou alterar as migrações, aplique as mudanças ao banco de dados:

    ```bash
    npx sequelize-cli db:migrate

Se precisar desfazer uma migração:

    ```bash
    npx sequelize-cli db:migrate:undo