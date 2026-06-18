# 🎮 Projeto FrameStore - Planejamento e Roadmap

Este documento serve como o guia oficial de planejamento para o desenvolvimento das funcionalidades do projeto **FrameStore**.

**Aviso Importante:** Este é um projeto escolar de cunho demonstrativo. Todas as transações financeiras (compras, saldo, resgate de cupons) serão **100% simuladas**. O saldo dos usuários será injetado e gerenciado diretamente via Banco de Dados (DB) para demonstrar a lógica de e-commerce sem envolver gateways de pagamento reais.

---

## 🏗️ 1. Arquitetura e Tecnologias

- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js (com Express).
- **Banco de Dados:** SQL (MySQL/PostgreSQL) para garantir relacionamento consistente.
- **Configuração:** Todas as variáveis sensíveis (dados de conexão com DB, segredos de autenticação, portas) serão gerenciadas via arquivo `.env`, garantindo segurança e separação de ambientes.

---

## 🗄️ 2. Modelagem do Banco de Dados

Para evitar dependências externas de armazenamento, as imagens serão armazenadas diretamente no banco de dados.

### Tabelas Principais

- **`USUARIOS`:**
- `id`: (PK) Identificador único.
- `nome`: Nome para display no perfil.
- `email`: Credencial de login.
- `senha`: Hash da senha (criptografada).
- `saldo`: (Decimal) Dinheiro virtual.
- `pontos`: (Inteiro) Moeda secundária.
- `adm`: (Boolean) Define privilégios de acesso ao Painel Administrativo.

- **`JOGOS`:**
- `id`: (PK) Identificador único.
- `titulo`: Nome do jogo.
- `preco`: (Decimal) Preço cheio.
- `desconto`: (Decimal/Null) Porcentagem de desconto.
- `platform`: Steam, PlayStation, Xbox, etc.
- `capa`: (LONGBLOB) Imagem principal convertida em binário.
- `gallery1`: (LONGBLOB) Imagem da galeria 1.
- `gallery2`: (LONGBLOB) Imagem da galeria 2.
- `gallery3`: (LONGBLOB) Imagem da galeria 3.

- **`CUPONS`:**
- `id`: (PK) Identificador único.
- `nome`: Código do cupom.
- `tipo`: Tipo de benefício.
- `desconto`: (Decimal) Valor abatido.
- `custo_pontos`: (Inteiro) Custo em pontos.

### Tabelas Relacionais

- **`CARRINHO`:** (`id_usuario`, `id_jogo`)
- **`BIBLIOTECA`:** (`id_usuario`, `id_jogo`, `data_compra`)
- **`USUARIO_CUPONS`:** (`id_usuario`, `id_cupom`, `usado`)

---

## ⚙️ 3. Lógica de Negócio e Funcionalidades

### A. Autenticação e Perfil

1. Login via `email` e `senha`. O sistema valida as credenciais contra os dados protegidos via `.env`.
2. No `perfil.html`, se a coluna `adm` do usuário for `true`, o frontend renderiza o botão "Painel Administrativo".
3. A aba "Biblioteca" renderiza os jogos adquiridos.

### B. Sistema de Compras

1. Adição de itens na tabela `CARRINHO`.
2. **Checkout:** Validação de saldo (via `USUARIOS`), atualização de saldo, inserção em `BIBLIOTECA`, remoção de `CARRINHO` e incremento de `pontos`.

### C. Sistema de Pontos e Cupons

1. Resgate de cupons verifica `pontos` totais.
2. Aplicação de cupom reduz o preço total no momento do checkout.

### D. Painel Administrativo (Área Restrita)

1. **Segurança:** As rotas administrativas serão protegidas por um middleware no Express, que verifica no banco de dados se o usuário logado possui a flag `adm = true` antes de processar qualquer requisição.
2. **Gestão de Jogos:**

- Adicionar novos jogos (incluindo upload das imagens direto como `LONGBLOB`).
- Editar informações (título, preço, imagens) de jogos existentes.
- Deletar jogos.

3. **Gestão de Usuários:**

- Listagem de usuários.
- Edição direta de `saldo` e `pontos` de qualquer usuário (ideal para correções ou testes).

3. **Gestão de Cupons:**

- Adicionar novos cupons para a aba de pontos (quanto de desconto aplica e seu custo de pontos)
- Editar cupons existentes
- Deletar cupons

---

## 🚀 4. Etapas de Execução (Roadmap)

- [ ] **Passo 1:** Configurar servidor Node.js e conectar ao banco (dados sensíveis no `.env`).
- [ ] **Passo 2:** Criar script SQL (Tabelas com suporte a `LONGBLOB` para imagens).
- [ ] **Passo 3:** Desenvolver rotas de API REST.
- [ ] **Passo 4:** Conectar Frontend à API (substituir dados estáticos por `fetch()`).
- [ ] **Passo 5:** Implementar lógica de Carrinho e Checkout.
- [ ] **Passo 6:** Implementar lógica de Pontos e Cupons.
- [ ] **Passo 7:** Desenvolver Painel Administrativo com middleware de segurança e formulários de edição (Jogos e Usuários).
- [ ] **Passo 8:** Refinamento de UI/UX (Feedback visual de transações e acesso restrito).
