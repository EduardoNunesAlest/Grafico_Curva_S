# Product Requirements Document (PRD)

## Projeto: Correção de Erro de Validação GraphQL no App Monday.com

---

## 1. Visão Geral

### 1.1 Contexto
O aplicativo desenvolvido para a plataforma Monday.com está apresentando erro de validação ao executar queries GraphQL para obter dados do board. O problema foi identificado após a recriação do app e impede o funcionamento correto da aplicação.

### 1.2 Objetivo
Diagnosticar e corrigir o erro de validação GraphQL que impede a obtenção de dados do board, restaurando o funcionamento completo do aplicativo Monday.com.

### 1.3 Escopo
- **Incluído:**
  - Diagnóstico da causa raiz do erro de validação
  - Implementação de correções nas queries GraphQL
  - Verificação e configuração de permissões do app
  - Validação da inicialização do SDK
  - Testes e validação da solução

- **Não Incluído:**
  - Desenvolvimento de novas funcionalidades
  - Refatoração completa da arquitetura
  - Migração para outras plataformas

---

## 2. Problema

### 2.1 Descrição do Problema
O aplicativo está gerando erros de validação ao tentar executar queries GraphQL, impedindo a leitura de dados dos boards do Monday.com.

### 2.2 Impacto
- **Alto**: Aplicativo completamente não funcional
- Usuários não conseguem acessar dados dos boards
- Bloqueio total das operações do app

---

## 3. Hipóteses e Causas Prováveis

### 3.1 Hipótese 1: boardId Não Está Sendo Passado (Prioridade: ALTA)
**Descrição**: O componente principal não está recebendo o `boardId` do contexto do Monday.com, resultando em queries inválidas.

**Indicadores**:
- Query montada com `undefined`: `boards(ids: [undefined])`
- Erro de validação antes da execução da query

**Impacto**: Crítico

### 3.2 Hipótese 2: Permissões Não Configuradas (Prioridade: ALTA)
**Descrição**: App recriado sem as permissões (escopos) necessárias para acessar a API GraphQL.

**Indicadores**:
- App recém-criado/reconfigurado
- Permissões ausentes no Monday Developer Portal

**Impacto**: Crítico

### 3.3 Hipótese 3: Manifesto Incorreto (Prioridade: MÉDIA)
**Descrição**: Arquivo `monday-code-config.json` com array de permissões vazio ou incorreto.

**Indicadores**:
- `permissions: []` no manifesto
- Build não incluindo permissões necessárias

**Impacto**: Alto

### 3.4 Hipótese 4: SDK Não Inicializado (Prioridade: MÉDIA)
**Descrição**: Chamadas à API sendo feitas antes da inicialização completa do monday-sdk-js.

**Indicadores**:
- Erros de contexto não disponível
- Timing issues na inicialização

**Impacto**: Médio

---

## 4. Requisitos de Solução

### 4.1 Requisitos Funcionais

#### RF01 - Sistema de Diagnóstico
- **Descrição**: Implementar logging detalhado para rastreamento de variáveis críticas
- **Critérios de Aceite**:
  - Logs exibindo `boardId` e seu tipo no console
  - Logs mostrando status de inicialização do SDK
  - Logs identificando o momento de execução das queries

#### RF02 - Validação de Contexto
- **Descrição**: Garantir obtenção correta do `boardId` do contexto Monday.com
- **Critérios de Aceite**:
  - `boardId` sendo extraído como número
  - Validação de `boardId` antes de executar queries
  - Tratamento de erro quando `boardId` é `undefined`

#### RF03 - Configuração de Permissões
- **Descrição**: Configurar todos os escopos necessários no Monday Developer Portal
- **Critérios de Aceite**:
  - Permissões `boards:read`, `groups:read`, `columns:read`, `items:read` ativas
  - Manifesto `monday-code-config.json` com permissões corretas
  - App republicado com novas permissões

#### RF04 - Inicialização Segura do SDK
- **Descrição**: Garantir que SDK está inicializado antes de executar queries
- **Critérios de Aceite**:
  - `monday.listen(['context'])` aguardado antes de chamadas API
  - Verificação de disponibilidade do SDK
  - Estados de loading apropriados na UI

### 4.2 Requisitos Não-Funcionais

#### RNF01 - Observabilidade
- Sistema deve fornecer logs claros para debugging
- Mensagens de erro devem ser descritivas e acionáveis

#### RNF02 - Resiliência
- App deve lidar graciosamente com contextos inválidos
- Mensagens de erro amigáveis para o usuário

#### RNF03 - Manutenibilidade
- Código deve incluir comentários explicativos
- Documentação de configuração atualizada

---

## 5. Plano de Implementação

### 5.1 Fase 1: Diagnóstico (Prioridade: CRÍTICA)

#### Tarefa 1.1 - Implementar Logging em `useBoardData.js`
```javascript
// Adicionar no início da função
console.log('🆔 boardId recebido:', boardId, typeof boardId);
console.log('📊 Query a ser executada:', query);
```

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 1 dia  
**Dependências**: Nenhuma

#### Tarefa 1.2 - Implementar Logging em `useMondayContext.js`
```javascript
// Adicionar após obter contexto
console.log('🔍 Contexto completo:', context);
console.log('🆔 boardId extraído:', context.boardId, typeof context.boardId);
```

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 1 dia  
**Dependências**: Nenhuma

#### Tarefa 1.3 - Deploy e Análise de Logs
- Fazer deploy da versão com logs
- Abrir Console do Navegador (F12)
- Documentar valores observados

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 0.5 dia  
**Dependências**: Tarefas 1.1 e 1.2

### 5.2 Fase 2: Correção de Contexto (Prioridade: ALTA)

#### Tarefa 2.1 - Revisar `useMondayContext.js`
- Verificar implementação de `monday.get('context')`
- Garantir extração correta do `boardId`
- Adicionar validação de tipo

**Código Esperado**:
```javascript
const context = await monday.get('context');
const boardId = Number(context.data.boardId);

if (!boardId || isNaN(boardId)) {
  console.error('❌ boardId inválido:', boardId);
  return null;
}
```

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 2 dias  
**Dependências**: Análise da Fase 1

#### Tarefa 2.2 - Implementar Validação Pré-Query
- Adicionar validação antes de executar `monday.api()`
- Retornar erro amigável se `boardId` inválido

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 1 dia  
**Dependências**: Tarefa 2.1

### 5.3 Fase 3: Configuração de Permissões (Prioridade: ALTA)

#### Tarefa 3.1 - Configurar Permissões no Developer Portal
1. Acessar Monday Developer Portal
2. Navegar para: App → Features → Permissions
3. Marcar permissões:
   - ✅ `boards:read`
   - ✅ `groups:read`
   - ✅ `columns:read`
   - ✅ `items:read`
4. Salvar configurações

**Responsável**: Desenvolvedor/DevOps  
**Prazo**: 0.5 dia  
**Dependências**: Nenhuma

#### Tarefa 3.2 - Atualizar `monday-code-config.json`
Verificar e corrigir o manifesto:

```json
{
  "name": "Nome do App",
  "permissions": [
    "boards:read",
    "groups:read", 
    "columns:read",
    "items:read"
  ]
}
```

**Responsável**: Desenvolvedor  
**Prazo**: 0.5 dia  
**Dependências**: Tarefa 3.1

#### Tarefa 3.3 - Republicar App
- Fazer rebuild do projeto
- Deploy para Monday.com
- Testar em board real

**Responsável**: DevOps  
**Prazo**: 1 dia  
**Dependências**: Tarefas 3.1 e 3.2

### 5.4 Fase 4: Inicialização do SDK (Prioridade: MÉDIA)

#### Tarefa 4.1 - Implementar Inicialização Segura
```javascript
// Garantir inicialização antes de usar API
await monday.listen(['context']);
const context = await monday.get('context');
// Só então executar queries
```

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 1 dia  
**Dependências**: Nenhuma

#### Tarefa 4.2 - Adicionar Estados de Loading
- Implementar loading state enquanto SDK inicializa
- Exibir feedback visual ao usuário

**Responsável**: Desenvolvedor Frontend  
**Prazo**: 1 dia  
**Dependências**: Tarefa 4.1

### 5.5 Fase 5: Validação e Testes (Prioridade: ALTA)

#### Tarefa 5.1 - Testes Unitários
- Testar obtenção de contexto com mocks
- Testar validação de `boardId`
- Testar construção de queries

**Responsável**: QA/Desenvolvedor  
**Prazo**: 2 dias  
**Dependências**: Fases 2, 3 e 4

#### Tarefa 5.2 - Testes de Integração
- Testar app em board real do Monday.com
- Validar em diferentes tipos de boards
- Testar com diferentes permissões de usuário

**Responsável**: QA  
**Prazo**: 2 dias  
**Dependências**: Tarefa 5.1

#### Tarefa 5.3 - Testes de Regressão
- Validar funcionalidades existentes
- Verificar performance
- Testar edge cases

**Responsável**: QA  
**Prazo**: 1 dia  
**Dependências**: Tarefa 5.2

---

## 6. Critérios de Validação GraphQL

### 6.1 Checklist de Validação

#### ✅ Estrutura da Query
- [ ] Campos solicitados existem na API
- [ ] Sintaxe GraphQL correta (chaves, parênteses)
- [ ] Argumentos com tipos corretos

#### ✅ Paginação
- [ ] Usando `items_page` ao invés de `items` (deprecado)
- [ ] Implementando cursor-based pagination quando necessário

#### ✅ Argumentos
- [ ] `boards(ids: [NUMBER])` - array de números
- [ ] Valores não são `undefined` ou `null`

#### ✅ Campos Deprecados
Evitar campos removidos:
- ❌ `groups { color }` (removido)
- ✅ Usar campos atualizados da documentação

---

## 7. Cronograma

| Fase | Duração | Início | Término |
|------|---------|--------|---------|
| Fase 1: Diagnóstico | 2.5 dias | D+0 | D+2.5 |
| Fase 2: Correção Contexto | 3 dias | D+2.5 | D+5.5 |
| Fase 3: Permissões | 2 dias | D+0 | D+2 |
| Fase 4: SDK | 2 dias | D+5.5 | D+7.5 |
| Fase 5: Testes | 5 dias | D+7.5 | D+12.5 |
| **Total** | **≈ 13 dias úteis** | | |

*Nota: Fases 1 e 3 podem rodar em paralelo*

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| boardId permanece undefined | Média | Alto | Revisar arquitetura de contexto, consultar docs Monday |
| Permissões não propagam | Baixa | Alto | Aguardar 24h após republicação, contatar suporte Monday |
| SDK não inicializa | Baixa | Médio | Implementar retry logic, verificar versão do SDK |
| Problema em produção diferente de dev | Média | Alto | Testar em ambiente staging idêntico ao prod |

---

## 9. Métricas de Sucesso

### 9.1 Métricas Técnicas
- ✅ 0 erros de validação GraphQL
- ✅ `boardId` sendo recebido corretamente em 100% dos casos
- ✅ Tempo de resposta da query < 2s
- ✅ Taxa de sucesso das queries = 100%

### 9.2 Métricas de Qualidade
- ✅ Cobertura de testes > 80%
- ✅ 0 bugs críticos em produção
- ✅ Logs claros e acionáveis implementados

---

## 10. Documentação

### 10.1 Documentação Técnica Necessária
- [ ] Diagrama de fluxo de obtenção de contexto
- [ ] Documentação de queries GraphQL utilizadas
- [ ] Guia de troubleshooting
- [ ] README atualizado com setup de permissões

### 10.2 Documentação de Configuração
- [ ] Passo a passo de configuração no Developer Portal
- [ ] Exemplo de `monday-code-config.json` correto
- [ ] Checklist de deploy

---

## 11. Aprovações

| Stakeholder | Papel | Status | Data |
|-------------|-------|--------|------|
| [Nome] | Product Owner | Pendente | - |
| [Nome] | Tech Lead | Pendente | - |
| [Nome] | QA Lead | Pendente | - |

---

## 12. Apêndices

### Apêndice A: Exemplo de Query Correta
```graphql
query GetBoardData($boardId: [ID!]!) {
  boards(ids: $boardId) {
    id
    name
    groups {
      id
      title
    }
    items_page(limit: 50) {
      items {
        id
        name
        column_values {
          id
          text
          value
        }
      }
    }
  }
}
```

### Apêndice B: Referências
- [Monday.com GraphQL API Docs](https://developer.monday.com/api-reference/docs/introduction-to-graphql)
- [Monday SDK JS Documentation](https://github.com/mondaycom/monday-sdk-js)
- [App Permissions Guide](https://developer.monday.com/apps/docs/permissions)

---

**Versão**: 1.0  
**Data**: 17 de Novembro de 2025  
**Autor**: Claude (Assistente AI)  
**Status**: Draft para Aprovação