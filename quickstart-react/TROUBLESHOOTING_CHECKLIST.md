# ✅ Checklist de Troubleshooting - GraphQL Validation Errors

## 🎯 Objetivo
Diagnosticar e resolver o erro "GraphQL validation errors" no app Curva S do Monday.com.

---

## 📋 ANTES DE FAZER DEPLOY

### 1. Verificar Arquivos de Configuração

- [ ] **package.json** contém:
  ```json
  {
    "dependencies": {
      "monday-sdk-js": "^0.4.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "chart.js": "^4.4.0",
      "react-chartjs-2": "^5.2.0",
      "date-fns": "^2.30.0",
      "@vibe/core": "^3.19.0",
      "@vibe/icons": "^3.19.0"
    }
  }
  ```

- [ ] **vite.config.js** contém:
  ```javascript
  base: './',  // ✅ CRÍTICO
  build: {
    outDir: 'build',
    assetsDir: 'assets'
  }
  ```

- [ ] **monday-code-config.json** contém:
  ```json
  {
    "name": "Curva S",
    "version": "1.0.0",
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

### 2. Executar Build

- [ ] Executar `npm install`
- [ ] Executar `python build_and_zip.py`
- [ ] Verificar que ZIP foi criado em `dist/`
- [ ] Verificar tamanho do ZIP (~0.28 MB)

---

## 📦 DURANTE O DEPLOY

### 3. Configurar no Monday Developer Portal

- [ ] Acesse https://monday.com/developers/apps
- [ ] Crie novo app ou acesse app existente
- [ ] **Features → Permissions**: Marcar TODAS:
  - [ ] `boards:read`
  - [ ] `groups:read`
  - [ ] `columns:read`
  - [ ] `items:read`
- [ ] **Build → Upload**: Fazer upload do ZIP
- [ ] **Build → Publish**: Publicar para produção
- [ ] Aguardar processamento (1-2 minutos)

### 4. Instalar App no Board

- [ ] Ir para board de teste (ex: https://alest-demo.monday.com/boards/9887177075)
- [ ] Clicar em "+ Add View"
- [ ] Procurar por "Curva S" (ou nome do seu app)
- [ ] Clicar para instalar
- [ ] Aguardar carregamento da view

---

## 🔍 APÓS DEPLOY - TROUBLESHOOTING

### 5. Abrir DevTools (F12)

- [ ] Abrir board no navegador
- [ ] Pressionar **F12** (ou Ctrl+Shift+I)
- [ ] Ir para aba **Console**
- [ ] Deixar aberto e recarregar página (F5)

### 6. Verificar Logs no Console

**O QUE PROCURAR**:

#### ✅ Cenário de SUCESSO (funcionando):

```
============================================================
🚀 DEBUG: Inicializando useMondayContext
📦 Monday SDK carregado: true
============================================================
🔄 Buscando contexto do Monday.com...
📥 Contexto recebido com sucesso!
🆔 Board ID extraído: 9887177075
🆔 Tipo do Board ID: number
✅ boardId válido: 9887177075
✅ Contexto salvo no state
============================================================
🔍 DEBUG: Iniciando fetchBoardData
🆔 boardId: 9887177075 | Tipo: number
============================================================
📤 Query GraphQL enviada:
query {
  boards(ids: [9887177075]) { ... }
}
🔄 Enviando requisição para Monday API...
📥 Resposta completa da API:
{
  "data": {
    "boards": [...]
  }
}
✅ Board carregado com sucesso!
  - Nome: Projeto Teste Curva S
  - Items: 15
✅ SUCESSO: Dados do board salvos no state
```

---

#### ❌ Cenário de ERRO 1: boardId undefined

```
============================================================
🚀 DEBUG: Inicializando useMondayContext
📥 Contexto recebido com sucesso!
🆔 Board ID extraído: undefined    ← ❌ PROBLEMA AQUI!
❌ AVISO: boardId não encontrado no contexto!
============================================================
🔍 DEBUG: Iniciando fetchBoardData
🆔 boardId: undefined | Tipo: undefined    ← ❌ PROBLEMA!
❌ ERRO CRÍTICO: boardId não fornecido!
```

**SOLUÇÃO**:
- Verificar se app está sendo executado como **Board View**
- Verificar se `monday-code-config.json` tem `type: "main_board_view"`
- Testar em board diferente

---

#### ❌ Cenário de ERRO 2: GraphQL validation errors

```
============================================================
📤 Query GraphQL enviada:
query { boards(ids: [9887177075]) { ... } }
🔄 Enviando requisição para Monday API...
📥 Resposta completa da API:
{
  "errors": [
    {
      "message": "Field 'color' doesn't exist on type 'Group'",    ← ❌ PROBLEMA!
      "locations": [{"line": 6, "column": 7}]
    }
  ]
}
❌ ERROS GRAPHQL RETORNADOS: [...]
```

**SOLUÇÃO**:
- Identificar campo problemático na mensagem de erro
- Verificar query no `useBoardData.js`
- Remover campo inexistente

---

#### ❌ Cenário de ERRO 3: Permissões negadas

```
📥 Resposta completa da API:
{
  "error_message": "Unauthorized",    ← ❌ PROBLEMA!
  "errors": []
}
❌ ERRO NA RESPOSTA: Unauthorized
```

**SOLUÇÃO**:
1. Ir para Monday Developer Portal
2. Features → Permissions
3. Marcar TODAS as permissões de leitura
4. Salvar e republicar app

---

### 7. Verificar Network Tab (F12)

- [ ] Ir para aba **Network**
- [ ] Filtrar por **Fetch/XHR**
- [ ] Recarregar página
- [ ] Procurar requisição para `api.monday.com`

**O QUE VERIFICAR**:

- [ ] **Status Code**: Deve ser **200 OK**
  - Se 401: Problema de autenticação
  - Se 403: Problema de permissões
  - Se 500: Erro interno da API
  
- [ ] **Request Payload**: Ver query enviada
  ```graphql
  query {
    boards(ids: [9887177075]) {  # Deve ter [número], não undefined
      ...
    }
  }
  ```

- [ ] **Response**: Ver resposta da API
  - Se tem `"errors": [...]`: Erro GraphQL
  - Se tem `"data": {"boards": [...]}`: Sucesso!

---

## 🧪 TESTES MANUAIS

### 8. Teste no Console do Navegador

Cole no Console (F12) e execute:

```javascript
// Teste 1: Verificar SDK
console.log('🧪 Teste 1: SDK Monday');
console.log('window.mondaySdk:', typeof window.mondaySdk);

// Teste 2: Buscar contexto
console.log('🧪 Teste 2: Contexto');
window.mondaySdk().get('context').then(res => {
  console.log('✅ Contexto:', res);
  console.log('🆔 Board ID:', res.data?.boardId);
});

// Teste 3: Query manual simples
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
  console.log('✅ Resposta:', res);
  if (res.errors) {
    console.error('❌ ERROS:', res.errors);
  } else {
    console.log('✅ SUCESSO! Board:', res.data.boards[0].name);
  }
}).catch(err => {
  console.error('❌ ERRO:', err);
});
```

**RESULTADO ESPERADO**:
```
✅ Contexto: { data: { boardId: 9887177075, ... } }
✅ SUCESSO! Board: Projeto Teste Curva S
```

---

## 🔧 AÇÕES CORRETIVAS POR ERRO

### Se boardId = undefined:

1. **Verificar tipo de view**:
   - `monday-code-config.json` deve ter `"type": "main_board_view"`
   - Não pode ser `"dashboard_widget"` ou outro tipo

2. **Testar em board diferente**:
   - Criar board simples de teste
   - Adicionar app nesse board
   - Ver se funciona lá

3. **Verificar se SDK está inicializado**:
   - Ver logs de `useMondayContext` no Console
   - Se não aparecer nada, SDK não carregou

---

### Se "Field 'X' doesn't exist":

1. **Identificar campo problemático**:
   - Ver mensagem de erro completa
   - Exemplo: "Field 'color' doesn't exist on type 'Group'"

2. **Remover campo da query**:
   - Editar `src/hooks/useBoardData.js`
   - Remover linha do campo
   - Fazer rebuild: `python build_and_zip.py`
   - Fazer deploy novamente

---

### Se "Unauthorized" ou "Forbidden":

1. **Configurar permissões**:
   - Monday Developer Portal
   - Features → Permissions
   - Marcar TODAS as permissões de leitura:
     - `boards:read`
     - `groups:read`
     - `columns:read`
     - `items:read`

2. **Republicar app**:
   - Build → Publish to Production
   - Aguardar processamento

3. **Reinstalar app no board**:
   - Remover view antiga
   - Adicionar view novamente

---

## 📞 SUPORTE ESCALADO

Se após seguir TODOS os passos acima o erro persistir:

### Coletar Evidências:

1. **Screenshot do Console completo** (F12 → Console)
2. **Screenshot do Network tab** (F12 → Network → api.monday.com)
3. **Arquivo monday-code-config.json**
4. **Board ID sendo testado**
5. **Link do board**
6. **Resposta da API** (copiar JSON do Network)

### Enviar para:

- Email: suporte@alest.com.br
- Assunto: "[URGENT] Curva S - GraphQL Validation Errors"
- Anexar TODAS as evidências acima

---

## 🎯 Resumo dos Principais Problemas

| Erro | Causa | Solução Rápida |
|------|-------|----------------|
| "boardId undefined" | Contexto não carregado | Verificar tipo de view no manifest |
| "Field 'X' doesn't exist" | Campo inexistente na query | Remover campo da query |
| "Unauthorized" | Sem permissões | Configurar no Developer Portal |
| "Network Failed" | Problema de conexão | Verificar internet/proxy |
| App não carrega nada | Caminhos absolutos | `base: './'` no vite.config |

---

## ✅ Checklist Final

Antes de escalar para suporte, confirme:

- [ ] Fiz rebuild com `python build_and_zip.py`
- [ ] Verifiquei permissões no Developer Portal
- [ ] Limpei cache do navegador (Ctrl+Shift+Delete)
- [ ] Testei com DevTools aberto (F12)
- [ ] Li TODA a mensagem de erro no Console
- [ ] Tentei em board diferente
- [ ] Testei query manual no Console
- [ ] Coletei screenshots e logs

---

**Versão**: 1.0  
**Data**: 17 de novembro de 2025  
**Status**: ATIVO
