# Projeto Node.js - Extrator de Faturas de Energia Elétrica
Este projeto tem como objetivo desenvolver um sistema para extrair dados de faturas de energia elétrica, armazená-los em um banco de dados PostgreSQL.
Utilizamos Node.js.

## Estrutura do Projeto

    ├───config
    ├───migrations
    ├───models
    ├───node_modules
    ├───public
    |   └───faturas
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
- **insomnia ou postman**

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

## Rotas da API

Aqui estão as rotas disponíveis na aplicação:

- **GET /dados**

     Rota para obter os dados de todas as fatura de energia

    **Exemplo de resposta:**

    ```json

        {
            "dados": [
                {
                    "id": 1,
                    "numero_cliente": "7204076116",
                    "mes_referencia": "2024-03-01",
                    "eng_eletrica_qtd": 50,
                    "eng_eletrica_valor": "47.92",
                    "eng_sceee_ims_qtd": 504,
                    "eng_sceee_ims_valor": "257.74",
                    "eng_compensada_qtd": 504,
                    "eng_compensada_valor": "-245.61",
                    "contrib_ilum_publica_valor": "49.43",
                    "pdf": {
                        "type": "Buffer",
                        "data": [
                            74,
                            86,
                            ...
                        ]
                    }
                },
                {
                    "id": 2,
                    "numero_cliente": "7204076116",
                    "mes_referencia": "2024-02-01",
                    "eng_eletrica_qtd": 50,
                    "eng_eletrica_valor": "48.06",
                    "eng_sceee_ims_qtd": 250,
                    "eng_sceee_ims_valor": "128.21",
                    "eng_compensada_qtd": 250,
                    "eng_compensada_valor": "-121.83",
                    "contrib_ilum_publica_valor": "41.19",
                    "pdf": {
                        "type": "Buffer",
                        "data": [
                            74,
                            86,
                            ...
                        ]
                    }
                }
            ]
        }

- **GET /dados/:numero_cliente**

    Rota para obter os dados da fatura de energia do numero_cliente

    **Exemplo de resposta:**

    ```json

        {
            "dados": [
                {
                    "id": 1,
                    "numero_cliente": "7204076116",
                    "mes_referencia": "2024-03-01",
                    "eng_eletrica_qtd": 50,
                    "eng_eletrica_valor": "47.92",
                    "eng_sceee_ims_qtd": 504,
                    "eng_sceee_ims_valor": "257.74",
                    "eng_compensada_qtd": 504,
                    "eng_compensada_valor": "-245.61",
                    "contrib_ilum_publica_valor": "49.43",
                    "pdf": {
                        "type": "Buffer",
                        "data": [
                            74,
                            86,
                            ...
                        ]
                    }
                }
            ]
        }

- **POST /extraiDadosPdfUnico**

    Rota para extrair dados de um único PDF passando o local do arquivo

**Parâmetros do corpo (JSON):**
        
    ```json
        {
            "caminho": "C:/Users/nome do usuario/Downloads/3001422762-01-2024.pdf"
        }

**Exemplo de resposta:**

    ```json
    {
        "message": "Dados extraídos e cadastrados com sucesso!",
        "resultado": {
            "message": "Cadastrado com sucesso!",
            "dado": {
                "id": 25,
                "numero_cliente": "7202210726",
                "mes_referencia": "2024-01-01",
                "eng_eletrica_qtd": 100,
                "eng_eletrica_valor": "95.52",
                "eng_sceee_ims_qtd": 2300,
                "eng_sceee_ims_valor": "1172.31",
                "eng_compensada_qtd": 2300,
                "eng_compensada_valor": "-1120.85",
                "contrib_ilum_publica_valor": "40.45",
                "pdf": {
                    "type": "Buffer",
                    "data": [
                        74,
                        86,
                        ...,
                    ]
                }
            }
        }
    }

- **POST /extraiDadosPdfLote**

    Rota para extrair dados de um lote de PDFs passando o local da pasta com tdos ps PDFs

**Parâmetros do corpo (JSON):**
        
    ```json
    {
        "caminho": "C:/Users/nome do usuario/Desktop/faturas"
    }

**Exemplo de resposta:**

    ```json
    {
        "message": "Processamento concluído!",
        "resultados": [
            {
                "arquivo": "3001116735-01-2024.pdf"
            },
            {
                "arquivo": "3001116735-02-2024.pdf"
            },
            {
                "arquivo": "3001116735-03-2024.pdf"
            }
        ]
    }

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

## Observação

**Utilizar as rotas para popular o banco de dados**

**POST /extraiDadosPdfLote** ou **POST /extraiDadosPdfUnico**

- na pasta **fatuars** dentro de **public** tem dinponivel amgumas faturas de exemplo
    pode ser camado a rota
    
    **POST http://localhost:3000/extraiDadosPdfLote**
    
    **Parâmetros do corpo (JSON):**
        
    ```json
    {
        "caminho": "C:/Users/caminho para o diretorio/Desktop/Teste-Dev PL - Lumi/public/faturas"
    }
    
