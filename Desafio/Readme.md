# Jitterbit API Challenge

API RESTful desenvolvida em Node.js para gerenciamento de pedidos, com persistência em MongoDB e transformação de dados conforme especificação do desafio.

## Funcionalidades

- Criação de pedidos com validação e transformação de dados
- Consulta individual de pedidos por ID
- Listagem de todos os pedidos
- Atualização de pedidos existentes
- Exclusão de pedidos
- Tratamento robusto de erros com mensagens claras
- Status codes HTTP adequados para cada operação

## Pré-requisitos

- Node.js 14 ou superior
- MongoDB rodando localmente ou URI de conexão remota (MongoDB Atlas)
- npm ou yarn

## Instalação

1. Clone o repositório:
git clone https://github.com/LuccaVG/Jitterbit-Test.git

cd \Desafio

3. Instale as dependências:

npm install

3. Configure o MongoDB:

Certifique-se de que o MongoDB está rodando na porta 27017

4. Inicie o servidor:

npm start

Endpoints
Criar Pedido (POST)

URL: POST /order

Obter Pedido (GET)

URL: GET /order/:id

Listar Pedidos (GET)

URL: GET /order/list

Atualizar Pedido (PUT)

URL: PUT /order/:id

Excluir Pedido (DELETE)

URL: DELETE /order/:id
