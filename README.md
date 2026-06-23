# Formula 1 Drivers API

API REST desenvolvida com Node.js e Express para gerenciamento de pilotos e classificação de equipes da Fórmula 1.

## Tecnologias Utilizadas

* Node.js
* Express.js
* Joi
* Helmet
* UUID

## Funcionalidades

### Drivers

* Listar todos os pilotos
* Buscar piloto por ID
* Buscar piloto pela posição no campeonato
* Criar novo piloto
* Atualizar informações de um piloto
* Remover piloto

### Teams

* Listar classificação das equipes
* Buscar equipe por posição no campeonato

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/formula1-drivers-api.git
```

Entre na pasta:

```bash
cd formula1-drivers-api
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

## Endpoints

### Drivers

#### Listar todos os pilotos

```http
GET /api/v1/drivers
```

#### Buscar piloto por ID

```http
GET /api/v1/drivers/:id
```

#### Buscar piloto por posição

```http
GET /api/v1/drivers/standings/:position
```

#### Criar piloto

```http
POST /api/v1/drivers
```

Body:

```json
{
  "name": "Lewis Hamilton",
  "team": "Ferrari",
  "points": 250
}
```

#### Atualizar piloto

```http
PUT /api/v1/drivers/:id
```

Body:

```json
{
  "points": 300
}
```

#### Remover piloto

```http
DELETE /api/v1/drivers/:id
```

---

### Teams

#### Listar classificação das equipes

```http
GET /api/v1/teams
```

#### Buscar equipe por posição

```http
GET /api/v1/teams/standings/:position
```

---

## Validações

A API utiliza Joi para validação de dados:

### Driver

```json
{
  "name": "string",
  "team": "string",
  "points": "number"
}
```

Regras:

* Nome entre 3 e 50 caracteres
* Equipe entre 3 e 50 caracteres
* Pontuação entre 0 e 1000

---

## Segurança

A aplicação utiliza Helmet para adicionar cabeçalhos HTTP de segurança.

---

## Possíveis Melhorias

* Persistência em banco de dados
* Paginação
* Filtros de busca
* Testes automatizados
* Docker
* Swagger/OpenAPI

---

## Autor

Ayrton Sena

Desenvolvedor Front-end e Back-end JavaScript.
