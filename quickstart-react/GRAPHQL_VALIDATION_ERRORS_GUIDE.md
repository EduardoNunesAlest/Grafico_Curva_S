# 🔴 GraphQL Validation Errors - Guia Completo de Diagnóstico e Resolução

## 📌 Visão Geral

**Data**: 17 de novembro de 2025  
**Contexto**: Monday.com Apps Framework  
**Erro Observado**: "GraphQL validation errors"  
**Gravidade**: CRÍTICA (impede carregamento do app)

---

## 🎯 O Que É Este Erro?

### Definição

**GraphQL Validation Errors** ocorrem quando a **estrutura da query GraphQL** enviada para a API do Monday.com **não atende aos requisitos do schema GraphQL** do servidor.

É diferente de:
- ❌ **Erro de Autenticação** (401 Unauthorized)
- ❌ **Erro de Permissão** (403 Forbidden)
- ❌ **Erro de Rede** (Network Failed)
- ❌ **Erro de Dados** (Null/Empty Response)

### Quando Acontece?

O erro acontece **ANTES** da execução da query, durante a fase de **validação do schema**:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Cliente   │────▶│   GraphQL    │────▶│   Monday    │
│   (React)   │     │  Validation  │     │     API     │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           │ ❌ FALHA AQUI
                           ▼
                    "Validation Error"
```

---

## 🔍 Tipos de Erros de Validação GraphQL

### 1. **Campo Não Existe no Schema** ⚠️

**Causa**: Tentar buscar um campo que foi removido ou nunca existiu na API.

**Exemplo Observado**:
```graphql
query {
  boards(ids: [123]) {
    groups {
      id
      title
      color  # ❌ ERRO: Campo "color" não existe mais!
    }
  }
}
```

**Erro Retornado**:
```json
{
  "errors": [{
    "message": "Field 'color' doesn't exist on type 'Group'",
    "locations": [{"line": 6, "column": 7}]
  }]
}
```

**Solução**: Remover o campo da query.

---

### 2. **Tipo de Argumento Incorreto** ⚠️

**Causa**: Passar argumento com tipo diferente do esperado pelo schema.

**Exemplo INCORRETO**:
```graphql
query {
  boards(ids: 123) {  # ❌ ERRO: Deveria ser [Int]! (array)
    id
    name
  }
}
```

**Exemplo CORRETO**:
```graphql
query {
  boards(ids: [123]) {  # ✅ Correto: Array de inteiros
    id
    name
  }
}
```

**Erro Retornado**:
```json
{
  "errors": [{
    "message": "Argument 'ids' has invalid value 123. Expected type '[Int]!', found 123."
  }]
}
```

---

### 3. **Argumento Obrigatório Ausente** ⚠️

**Causa**: Não fornecer argumento marcado como obrigatório (!) no schema.

**Exemplo INCORRETO**:
```graphql
query {
  boards {  # ❌ ERRO: Falta argumento "ids" obrigatório
    id
    name
  }
}
```

**Exemplo CORRETO**:
```graphql
query {
  boards(ids: [123]) {  # ✅ Correto: Argumento obrigatório fornecido
    id
    name
  }
}
```

---

### 4. **Paginação Incorreta** ⚠️

**Causa**: Usar `items` em vez de `items_page` (API v2 do Monday.com).

**Exemplo INCORRETO**:
```graphql
query {
  boards(ids: [123]) {
    items {  # ❌ ERRO: Campo deprecado
      id
      name
    }
  }
}
```

**Exemplo CORRETO**:
```graphql
query {
  boards(ids: [123]) {
    items_page(limit: 500) {  # ✅ Correto: API v2 com paginação
      cursor
      items {
        id
        name
      }
    }
  }
}
```

---

### 5. **Query Malformada (Sintaxe)** ⚠️

**Causa**: Erro de sintaxe GraphQL (chaves, parênteses, vírgulas).

**Exemplo INCORRETO**:
```graphql
query {
  boards(ids: [123]) {
    id
    name
    # ❌ ERRO: Faltando fechar chave
}
```

**Exemplo CORRETO**:
```graphql
query {
  boards(ids: [123]) {
    id
    name
  }
}  # ✅ Correto: Todas as chaves fechadas
```

---

## 🐛 Causas Específicas do Erro no Curva S

### Análise Baseada na Imagem

O erro **"GraphQL validation errors"** está ocorrendo **MESMO após apagar e recriar o app**.

Isso indica que o problema **NÃO É**:
- ❌ Cache do navegador (já testado)
- ❌ Versão antiga do app
- ❌ Configuração de permissões do app antigo

O problema **PROVAVELMENTE É**:

### 🔴 Hipótese 1: boardId Não Está Sendo Passado (Mais Provável)

**Causa**: O componente não está recebendo o `boardId` do contexto Monday.

**Diagnóstico**:
```javascript
// useBoardData.js linha 30
boards(ids: [${boardId}])
// Se boardId = undefined → boards(ids: [undefined])
// ❌ GraphQL validation error!
```

**Como Verificar**:
```javascript
// Adicionar log no useBoardData.js
console.log('🆔 boardId recebido:', boardId, typeof boardId);

// Se aparecer: "undefined" ou "string" → ERRO!
// Deve aparecer: número válido (ex: 9887177075)
```

**Solução**:
```javascript
// useMondayContext.js deve retornar boardId corretamente
const { boardId } = useMondayContext();

// Verificar se monday.get('context') está funcionando
monday.get('context').then(res => {
  console.log('📋 Contexto Monday:', res);
  console.log('🆔 Board ID:', res.data.boardId);
});
```

---

### 🔴 Hipótese 2: Permissões do App Não Configuradas

**Causa**: O novo app não tem as permissões GraphQL necessárias.

**Permissões Necessárias no Monday Developer Portal**:

```json
{
  "permissions": [
    "boards:read",      // ✅ OBRIGATÓRIO
    "groups:read",      // ✅ OBRIGATÓRIO
    "columns:read",     // ✅ OBRIGATÓRIO
    "items:read"        // ✅ OBRIGATÓRIO
  ]
}
```

**Como Verificar**:
1. Acesse: https://monday.com/developers/apps
2. Seu app → Features → Permissions
3. Marque todas as permissões de leitura acima
4. Salve e republique o app

---

### 🔴 Hipótese 3: monday-code-config.json Incorreto

**Causa**: Manifest do app não declara permissões ou tipo correto.

**Verificar**: `build/monday-code-config.json`

**Exemplo INCORRETO**:
```json
{
  "name": "Curva S",
  "permissions": []  // ❌ ERRO: Sem permissões!
}
```

**Exemplo CORRETO**:
```json
{
  "name": "Curva S",
  "version": "1.0.0",
  "icon": "https://exemplo.com/icon.png",
  "permissions": [
    "boards:read",
    "groups:read",
    "columns:read",
    "items:read"
  ],
  "features": {
    "board_views": {
      "views": [{
        "type": "main_board_view",
        "configuration_url": "./index.html"
      }]
    }
  }
}
```

---

### 🔴 Hipótese 4: SDK Não Inicializado Corretamente

**Causa**: monday-sdk-js não está configurado antes da query.

**Verificar**: `src/hooks/useMondayContext.js`

**Exemplo INCORRETO**:
```javascript
import mondaySdk from 'monday-sdk-js';
const monday = mondaySdk();

// ❌ ERRO: Não espera inicialização
monday.api(query);  // Pode falhar!
```

**Exemplo CORRETO**:
```javascript
import mondaySdk from 'monday-sdk-js';
const monday = mondaySdk();

// ✅ Correto: Inicializa e espera
monday.setToken('TOKEN');  // Se necessário
await monday.listen(['context']);
const response = await monday.api(query);
```

---

## 🛠️ Processo de Diagnóstico Completo

### Passo 1: Adicionar Logs Detalhados

**Editar**: `src/hooks/useBoardData.js`

```javascript
const fetchBoardData = useCallback(async () => {
  console.log('=' .repeat(60));
  console.log('🔍 DEBUG: Iniciando fetchBoardData');
  console.log('🆔 boardId:', boardId, '| Tipo:', typeof boardId);
  console.log('📦 groupIds:', groupIds);
  console.log('=' .repeat(60));

  if (!boardId) {
    console.error('❌ ERRO CRÍTICO: boardId não fornecido!');
    setError('Board ID não fornecido');
    return;
  }

  // Validar que boardId é número
  const numericBoardId = parseInt(boardId, 10);
  if (isNaN(numericBoardId)) {
    console.error('❌ ERRO CRÍTICO: boardId não é número válido!', boardId);
    setError('Board ID inválido');
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const query = `
      query {
        boards(ids: [${numericBoardId}]) {
          id
          name
          groups {
            id
            title
          }
          columns {
            id
            title
            type
          }
          items_page(limit: 500) {
            cursor
            items {
              id
              name
              group {
                id
                title
              }
              column_values {
                id
                text
                value
                type
              }
            }
          }
        }
      }
    `;

    console.log('📤 Query GraphQL:', query);
    console.log('🔄 Enviando requisição...');

    const response = await monday.api(query);

    console.log('📥 Resposta completa:', JSON.stringify(response, null, 2));

    // Verificar erros na resposta
    if (response.errors && response.errors.length > 0) {
      console.error('❌ ERROS GRAPHQL:', response.errors);
      throw new Error(`GraphQL Errors: ${response.errors.map(e => e.message).join(', ')}`);
    }

    if (response.error_message) {
      console.error('❌ ERRO NA RESPOSTA:', response.error_message);
      throw new Error(response.error_message);
    }

    if (!response.data) {
      console.error('❌ RESPOSTA SEM DADOS!');
      throw new Error('Resposta sem dados');
    }

    if (!response.data.boards || response.data.boards.length === 0) {
      console.error('❌ BOARD NÃO ENCONTRADO!');
      throw new Error('Board não encontrado');
    }

    let board = response.data.boards[0];
    console.log('✅ Board carregado:', board.name, '| Items:', board.items_page.items.length);
    
    // Filtrar por grupos se especificado
    if (groupIds.length > 0) {
      board = {
        ...board,
        items_page: {
          items: board.items_page.items.filter(item => 
            groupIds.includes(item.group.id)
          )
        }
      };
      console.log('🔍 Filtrado por grupos:', groupIds, '| Items:', board.items_page.items.length);
    }

    setBoardData(board);
    console.log('✅ SUCESSO: Dados do board salvos no state');
  } catch (err) {
    console.error('❌ ERRO CAPTURADO:', err);
    console.error('📋 Stack trace:', err.stack);
    
    let errorMessage = 'Erro ao carregar dados do board';
    
    if (err.error_message) {
      errorMessage = err.error_message;
    } else if (err.errors && Array.isArray(err.errors)) {
      errorMessage = err.errors.map(e => e.message).join(', ');
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    console.error('💬 Mensagem de erro final:', errorMessage);
    setError(errorMessage);
  } finally {
    setLoading(false);
    console.log('=' .repeat(60));
  }
}, [boardId, groupIds]);
```

---

### Passo 2: Verificar Contexto Monday

**Editar**: `src/hooks/useMondayContext.js`

```javascript
useEffect(() => {
  console.log('=' .repeat(60));
  console.log('🚀 DEBUG: Inicializando useMondayContext');
  console.log('=' .repeat(60));

  monday
    .get('context')
    .then((res) => {
      console.log('📥 Contexto Monday recebido:', JSON.stringify(res, null, 2));
      console.log('🆔 Board ID extraído:', res.data?.boardId);
      console.log('👤 User ID extraído:', res.data?.user?.id);
      console.log('🏢 Account ID extraído:', res.data?.account?.id);
      
      setContext({
        boardId: res.data?.boardId,
        userId: res.data?.user?.id,
        accountId: res.data?.account?.id,
        theme: res.data?.theme,
        ...res.data
      });
      
      setLoading(false);
      console.log('✅ Contexto salvo no state');
    })
    .catch((err) => {
      console.error('❌ ERRO ao buscar contexto:', err);
      console.error('📋 Stack trace:', err.stack);
      setError(err);
      setLoading(false);
    });
}, []);
```

---

### Passo 3: Testar Query Diretamente no Console

**Abrir DevTools** (F12) e executar:

```javascript
// Teste 1: Verificar SDK
console.log('🧪 Teste 1: SDK Monday');
console.log('monday:', window.mondaySdk);
console.log('monday.api:', typeof window.mondaySdk()?.api);

// Teste 2: Buscar contexto
console.log('🧪 Teste 2: Contexto');
window.mondaySdk().get('context').then(res => {
  console.log('Contexto:', res);
  console.log('Board ID:', res.data?.boardId);
});

// Teste 3: Query manual
console.log('🧪 Teste 3: Query Manual');
const boardId = 9887177075;  // Substitua pelo seu board ID
const query = `
  query {
    boards(ids: [${boardId}]) {
      id
      name
    }
  }
`;

window.mondaySdk().api(query).then(res => {
  console.log('Resposta:', res);
  if (res.errors) {
    console.error('ERROS:', res.errors);
  }
});
```

---

## ✅ Checklist de Resolução

### Antes de Fazer Deploy

- [ ] **1. Verificar package.json**
  ```json
  {
    "dependencies": {
      "monday-sdk-js": "^0.4.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    }
  }
  ```

- [ ] **2. Verificar vite.config.js**
  ```javascript
  export default defineConfig({
    base: './',  // ✅ CRÍTICO: Caminhos relativos
    build: {
      outDir: 'build',
      assetsDir: 'assets'
    }
  });
  ```

- [ ] **3. Verificar monday-code-config.json**
  - Nome do app correto
  - Versão incrementada
  - Permissões declaradas
  - type: "main_board_view"

- [ ] **4. Limpar e Rebuildar**
  ```bash
  npm run clean
  python build_and_zip.py
  ```

- [ ] **5. Testar Localmente (Opcional)**
  ```bash
  npm run dev
  # Usar ngrok para expor porta
  ngrok http 8301
  # Configurar URL no Monday Developer Portal
  ```

---

### Depois do Deploy

- [ ] **1. Limpar Cache do Navegador**
  - Ctrl + Shift + Delete
  - All time
  - Cached images and files
  - Fechar navegador
  - Reabrir

- [ ] **2. Abrir DevTools (F12)**
  - Console tab
  - Verificar logs de DEBUG
  - Procurar por ❌ ou erros em vermelho

- [ ] **3. Verificar Network Tab**
  - Filter: Fetch/XHR
  - Procurar requisições para api.monday.com
  - Verificar status code (200? 400? 500?)
  - Ver Payload (query enviada)
  - Ver Response (erros retornados)

- [ ] **4. Testar em Board Diferente**
  - Criar board de teste simples
  - Adicionar view do Curva S
  - Verificar se erro persiste

---

## 🔬 Testes Avançados

### Teste 1: Query Minimalista

Simplificar ao máximo para isolar o problema:

```javascript
const query = `
  query {
    boards(ids: [${boardId}]) {
      id
      name
    }
  }
`;
```

**Se funcionar**: Problema está em algum campo específico.  
**Se não funcionar**: Problema é mais fundamental (permissões, boardId, etc.)

---

### Teste 2: Query com Campos Graduais

Adicionar campos um por vez:

```javascript
// Teste 2.1: Só boards
query { boards(ids: [123]) { id name } }

// Teste 2.2: Com groups
query { boards(ids: [123]) { id name groups { id title } } }

// Teste 2.3: Com columns
query { boards(ids: [123]) { id name columns { id title type } } }

// Teste 2.4: Com items_page
query { boards(ids: [123]) { id name items_page(limit: 1) { items { id name } } } }
```

Identificar **em qual passo** o erro acontece.

---

### Teste 3: Usar monday-mcp para Validar

```javascript
// Via MCP (você pode fazer isso)
mcp0_get_board_items_page({
  boardId: 9887177075,
  limit: 5,
  includeColumns: true
});

// Se funcionar via MCP mas não via app:
// → Problema é no app (SDK, permissões, etc.)
// Se não funcionar nem via MCP:
// → Problema é no board ou nas permissões da conta
```

---

## 📊 Comparação de Cenários

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| "GraphQL validation errors" + boardId undefined | Contexto não carregado | Verificar useMondayContext |
| "GraphQL validation errors" + boardId correto | Query malformada | Validar sintaxe GraphQL |
| "GraphQL validation errors" + query correta | Permissões | Configurar no Developer Portal |
| Funciona local, falha no Monday | Caminhos absolutos | `base: './'` no vite.config |
| Funciona em board X, falha em Y | Board específico | Verificar estrutura do board |

---

## 🚀 Solução Definitiva (Passo a Passo)

### 1. Atualizar useBoardData.js com Validação Completa

Vou criar o arquivo atualizado...

### 2. Atualizar useMondayContext.js com Logs

Vou criar o arquivo atualizado...

### 3. Rebuild e Deploy

```bash
python build_and_zip.py
```

### 4. Abrir DevTools e Monitorar

**MUITO IMPORTANTE**: Deixar Console aberto durante teste!

---

## 📞 Suporte

Se após seguir todos os passos o erro persistir, coletar:

1. **Screenshot do Console** (F12 → Console tab)
2. **Screenshot do Network** (F12 → Network tab → XHR/Fetch)
3. **Arquivo** `monday-code-config.json`
4. **Board ID** sendo testado
5. **Logs completos** do Console

Enviar para: suporte@alest.com.br

---

## 🎯 Resumo Executivo

**Erro**: GraphQL validation errors  
**Significado**: Query GraphQL não passa na validação do schema  
**Causas Comuns**:
1. ❌ Campo inexistente na query
2. ❌ Tipo de argumento incorreto
3. ❌ boardId undefined ou inválido
4. ❌ Permissões não configuradas
5. ❌ SDK não inicializado

**Solução Imediata**: Adicionar logs detalhados e verificar Console (F12)

---

**Status**: 🔴 CRÍTICO  
**Prioridade**: P0 (Blocker)  
**Próximo Passo**: Adicionar logs e testar com DevTools aberto

**Versão**: 1.0  
**Data**: 17 de novembro de 2025  
**Autor**: Alest EVC Team
