# PRD - Componente Gráfico de Curva S Universal

## Informações do Documento

**Produto:** Componente de gráfico de Curva S configurável para visualização de dados acumulados em boards  
**Owner:** Product Owner da squad responsável pelo quickstart-react  
**Versão:** 2.0  
**Data de Criação:** 17 de novembro de 2025  
**Última Atualização:** 17 de novembro de 2025  
**Status:** Draft para Revisão

---

## 1. Visão Geral Executiva

### 1.1 Resumo

Desenvolvimento de um componente gráfico de Curva S universal, configurável e reutilizável para visualização de progresso acumulado ao longo do tempo. O componente permitirá comparação entre planejamento e execução através de interface intuitiva de mapeamento de dados, aplicável a múltiplos contextos: faturamento, obras, produção, projetos e desenvolvimento.

### 1.2 Contexto e Problema

**Situação Atual:**

Times de **Finanças, Controladoria, Operações, Projetos e Desenvolvimento** enfrentam desafios críticos para acompanhar a evolução de métricas acumuladas ao longo do tempo:

- **Faturamento:** Acompanhamento de receita planejada vs. realizada ocorre via planilhas externas (Excel/Sheets) com consolidações manuais
- **Projetos:** Falta de visibilidade consolidada de progresso de tarefas, custos e entregas por período
- **Obras/Produção:** Ausência de comparação visual entre cronograma planejado e execução real
- **Desenvolvimento:** Dificuldade em rastrear velocity, burndown e progresso de sprints

**Problemas Resultantes:**

- ❌ Falta de visibilidade consolidada em tempo real
- ❌ Dificuldade de identificar desvios (acima/abaixo do planejado) em tempo hábil
- ❌ Alto esforço manual para manutenção de relatórios e gráficos
- ❌ Soluções específicas por time/projeto, sem padronização
- ❌ Impossibilidade de comparar progresso entre diferentes áreas/projetos
- ❌ Dados dispersos em múltiplas ferramentas e formatos

**Problema Principal:**  
Não existe uma forma nativa, padronizada e reutilizável para visualizar **Curvas S** (dados acumulados planejados vs. realizados) em diferentes boards e contextos, com mínima configuração e máxima flexibilidade.

### 1.3 Solução Proposta

Componente gráfico universal de Curva S com:

- **Configuração dinâmica:** Mapeamento de dados via interface visual (dropdowns)
- **Flexibilidade:** Adaptável a qualquer tipo de dado acumulado (receita, progresso, custos, entregas)
- **Comparação:** Visualização de múltiplas curvas (planejado, realizado, projetado)
- **Filtragem:** Segmentação por grupos/categorias da board
- **Templates:** Configurações pré-definidas por contexto (faturamento, obras, produção)
- **Reutilização:** Aplicável em qualquer board sem reconfiguração complexa

---

## 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivos de Negócio

**Primários:**
- Padronizar visualização de progresso acumulado em todos os contextos organizacionais
- Reduzir dependência de planilhas externas e consolidações manuais
- Melhorar identificação precoce de desvios de planejamento (≥2 semanas de antecedência)
- Aumentar velocidade de tomada de decisão baseada em dados

**Secundários:**
- Aumentar adoção de boards como fonte única de verdade
- Reduzir tempo gasto em preparação de relatórios gerenciais
- Facilitar comunicação visual de progresso para stakeholders
- Promover cultura data-driven na organização

### 2.2 Objetivos de Usuário

- **Analistas/Controladores:** Configurar curvas em < 5 minutos sem ajuda técnica
- **Gestores:** Visualizar status de progresso em < 10 segundos
- **Executivos:** Identificar desvios críticos imediatamente
- **Times Técnicos:** Reutilizar configurações entre projetos similares

### 2.3 Métricas de Sucesso (KPIs)

| Métrica | Baseline | Meta 3 Meses | Meta 6 Meses | Método de Medição |
|---------|----------|--------------|--------------|-------------------|
| **Adoção** | 0% | 40% | 70% | % boards ativos com Curva S configurada |
| **Tempo de Configuração** | ~30min | 8min | 5min | Tempo médio primeira configuração completa |
| **Taxa de Sucesso** | N/A | 85% | 95% | % configurações sem erro na primeira tentativa |
| **Satisfação (NPS)** | N/A | 30 | 40 | Pesquisa trimestral com usuários ativos |
| **Reutilização** | 0 | 2 | 3+ | Média de templates aplicados por organização |
| **Performance** | N/A | <2s | <2s | Tempo de renderização para 1000 pontos |
| **Redução de Planilhas** | Baseline | -30% | -50% | Pesquisa de uso de ferramentas externas |
| **Uso Ativo Semanal** | 0 | 50% | 70% | % usuários que visualizam curva ≥1x/semana |

### 2.4 Critérios de Sucesso Qualitativos

- ✅ Usuário de negócio consegue configurar sem documentação técnica
- ✅ 9/10 usuários piloto recomendam a feature
- ✅ Redução de tickets de suporte relacionados a relatórios de progresso
- ✅ Adoção espontânea (sem campanha ativa) em ≥20% dos times

---

## 3. Personas e Casos de Uso

### 3.1 Personas Detalhadas

#### Persona 1: Analista Financeiro / Controladoria
**Perfil:**
- Idade: 28-45 anos
- Experiência: 3-10 anos em finanças
- Familiaridade técnica: Média (Excel avançado, ferramentas BI básicas)

**Necessidades:**
- Acompanhar faturamento planejado vs. realizado por período
- Identificar rapidamente desvios de receita (>5%)
- Gerar relatórios para DRE gerencial e apresentações executivas
- Consolidar dados de múltiplas fontes em uma única visualização

**Dores:**
- Consolidação manual consome 4-6 horas/semana
- Dados desatualizados em planilhas
- Dificuldade em identificar tendências de longo prazo
- Retrabalho ao mudar período de análise

**Comportamento:**
- Acessa sistema 3-5x/dia
- Prefere visualizações simples e diretas
- Exporta dados frequentemente para análises complementares

---

#### Persona 2: Gerente de Projetos
**Perfil:**
- Idade: 30-50 anos
- Experiência: 5-15 anos em gestão de projetos
- Familiaridade técnica: Média (ferramentas de gestão, metodologias ágeis)

**Necessidades:**
- Visualizar progresso geral de projeto e por fase
- Comparar planejamento versus execução diariamente
- Apresentar status em reuniões com stakeholders
- Antecipar riscos de atraso ou estouro de orçamento

**Dores:**
- Múltiplas fontes de dados não consolidadas
- Dificuldade em comunicar status visualmente
- Falta de visibilidade em tempo real
- Preparação demorada de apresentações

**Comportamento:**
- Acessa sistema 2-3x/dia
- Compartilha visualizações frequentemente
- Necessita exportar gráficos para slides

---

#### Persona 3: Coordenador de Área / Operações
**Perfil:**
- Idade: 32-48 anos
- Experiência: 4-12 anos em operações
- Familiaridade técnica: Média-baixa

**Necessidades:**
- Monitorar progresso de sua área específica
- Comparar performance entre diferentes grupos/equipes
- Identificar gargalos operacionais
- Reportar resultados para gerência

**Dores:**
- Dados da área "escondidos" em boards maiores
- Dificuldade em filtrar informações relevantes
- Falta de autonomia para criar visualizações
- Dependência de equipes técnicas para relatórios

**Comportamento:**
- Acessa sistema 1-2x/dia
- Foca em visualizações de seu grupo específico
- Prefere templates prontos a configurações customizadas

---

#### Persona 4: Diretor(a) / Executivo(a)
**Perfil:**
- Idade: 38-60 anos
- Experiência: 10-25 anos em liderança
- Familiaridade técnica: Básica-média

**Necessidades:**
- Visão consolidada de múltiplos projetos/áreas
- Identificação rápida de alertas e desvios críticos
- Dados confiáveis para decisões estratégicas
- Visualizações para board meetings

**Dores:**
- Sobrecarga de informação detalhada
- Falta de confiabilidade em dados consolidados manualmente
- Tempo limitado para análises profundas
- Necessidade de visões comparativas entre unidades

**Comportamento:**
- Acessa sistema 2-4x/semana
- Visualiza apenas informações de alto nível
- Delega configuração a analistas

---

### 3.2 Casos de Uso Detalhados

#### CU-01: Criar Curva S de Faturamento (Primeira Vez)
**Ator:** Analista Financeiro  
**Objetivo:** Configurar visualização de receita planejada vs. realizada  
**Frequência:** 1x por projeto (depois reutiliza)

**Pré-condições:**
- Board de faturamento com colunas: Data de Competência, Valor Planejado, Valor Realizado
- Usuário tem permissão de edição no board

**Fluxo Principal:**
1. Usuário acessa board de faturamento
2. Clica em "Adicionar Visualização" → "Curva S"
3. Sistema exibe wizard de configuração
4. Usuário seleciona "Template: Faturamento Planejado vs. Realizado"
5. Sistema pré-preenche:
   - Eixo X: Data de Competência (detectada automaticamente)
   - Curva 1: Valor Planejado (R$)
   - Curva 2: Valor Realizado (R$)
6. Usuário revisa e clica "Aplicar"
7. Sistema renderiza gráfico com ambas as curvas
8. Sistema salva configuração automaticamente

**Pós-condições:**
- Gráfico visível no board
- Configuração salva e reutilizável
- Dados atualizados em tempo real

**Fluxos Alternativos:**
- **3a:** Colunas não encontradas automaticamente → Sistema solicita mapeamento manual
- **5a:** Template não se aplica → Usuário configura manualmente via dropdowns

**Tempo Esperado:** 3-5 minutos

---

#### CU-02: Filtrar Curva por Grupo de Negócio
**Ator:** Coordenador de Área  
**Objetivo:** Visualizar apenas progresso de sua área específica  
**Frequência:** 3-5x/semana

**Pré-condições:**
- Curva S já configurada no board
- Board possui grupos definidos (ex: Marketing, Vendas, Operações)

**Fluxo Principal:**
1. Usuário acessa board com Curva S configurada
2. Localiza painel de filtros (lateral ou dropdown)
3. Marca checkbox "Marketing" (seu grupo)
4. Sistema recalcula curvas mostrando apenas dados do grupo Marketing
5. Gráfico atualiza em < 500ms
6. Usuário visualiza divergências específicas de sua área

**Pós-condições:**
- Visualização filtrada exibida
- Filtro pode ser removido ou alterado
- Outros visualizações do board não são afetadas

**Tempo Esperado:** < 30 segundos

---

#### CU-03: Identificar e Analisar Desvio Crítico
**Ator:** Gerente de Projetos  
**Objetivo:** Detectar atraso significativo e drill-down para detalhes  
**Frequência:** 2-3x/semana

**Fluxo Principal:**
1. Usuário visualiza Curva S de progresso de projeto
2. Identifica visualmente que Curva Real está 15% abaixo da Planejada em Março
3. Clica no ponto de divergência (dia 15/03)
4. Sistema exibe tooltip com:
   - Planejado: 65% (R$ 650k)
   - Realizado: 50% (R$ 500k)
   - Desvio: -15% (-R$ 150k)
5. Usuário clica em "Ver Detalhes"
6. Sistema abre modal com lista de tarefas/itens do período
7. Usuário identifica 3 tarefas atrasadas causando o desvio
8. Usuário exporta dados para reunião com equipe

**Pós-condições:**
- Desvio identificado e documentado
- Ações corretivas podem ser tomadas
- Dados exportados para discussão

**Tempo Esperado:** 2-3 minutos

---

#### CU-04: Reutilizar Configuração em Novo Projeto
**Ator:** Analista PMO  
**Objetivo:** Aplicar template de Curva S em novo board de projeto  
**Frequência:** 2-3x/mês (novos projetos)

**Fluxo Principal:**
1. Usuário cria novo board de projeto
2. Adiciona componente "Curva S"
3. Clica em "Usar Template Salvo"
4. Sistema lista templates disponíveis:
   - "Curva S - Projeto Padrão" (criado anteriormente)
   - "Curva S - Faturamento"
   - "Curva S - Produção"
5. Usuário seleciona "Curva S - Projeto Padrão"
6. Sistema mapeia automaticamente colunas por nome similar
7. Exibe preview: "Data de Início → Eixo X ✓", "% Conclusão → Curva Real ✓"
8. Usuário confirma
9. Curva renderizada imediatamente

**Pós-condições:**
- Curva S configurada em < 2 minutos
- Template reutilizado com sucesso
- Usuário pode ajustar detalhes se necessário

**Fluxos Alternativos:**
- **6a:** Colunas não encontradas → Sistema solicita mapeamento manual apenas das colunas faltantes

**Tempo Esperado:** 1-2 minutos

---

#### CU-05: Exportar Dados para Apresentação Executiva
**Ator:** Gerente de Projetos  
**Objetivo:** Gerar gráfico e dados para apresentação mensal  
**Frequência:** 1x/mês

**Fluxo Principal:**
1. Usuário acessa Curva S configurada
2. Ajusta período de visualização (últimos 3 meses)
3. Clica em menu "Exportar" (⋮)
4. Sistema exibe opções:
   - 📊 Exportar Gráfico (PNG)
   - 📄 Exportar Dados (CSV)
   - ⚙️ Exportar Configuração (JSON)
5. Usuário seleciona "Exportar Gráfico (PNG)"
6. Sistema gera imagem em alta resolução (1920x1080)
7. Download iniciado automaticamente
8. Usuário também exporta CSV para análise complementar

**Pós-condições:**
- Gráfico disponível para inclusão em slides
- Dados disponíveis para análises adicionais
- Visualização mantida no board

**Tempo Esperado:** < 1 minuto

---

#### CU-06: Comparar Múltiplas Curvas (Cenários)
**Ator:** Analista Financeiro  
**Objetivo:** Visualizar planejado, realizado e projeção futura simultaneamente  
**Frequência:** 1-2x/semana

**Fluxo Principal:**
1. Usuário acessa configuração de Curva S existente
2. Clica em "Adicionar Curva"
3. Configura terceira curva:
   - Nome: "Projeção (Cenário Otimista)"
   - Coluna: Valor Projetado Otimista
   - Cor: Verde claro
   - Tipo de linha: Tracejada
4. Sistema renderiza três curvas simultaneamente
5. Legenda automaticamente atualizada
6. Usuário visualiza divergência entre cenários
7. Salva configuração para revisões futuras

**Pós-condições:**
- Três curvas exibidas claramente
- Comparação visual facilitada
- Configuração salva para reutilização

**Tempo Esperado:** 2-3 minutos

---

## 4. Requisitos Funcionais

### 4.1 Configuração e Mapeamento de Dados

#### RF-01: Seleção de Eixo X (Temporal)
**Prioridade:** CRÍTICA

**Descrição:**  
Sistema deve permitir seleção flexível da coluna temporal para o Eixo X.

**Critérios de Aceitação:**
- [ ] Exibe dropdown com TODAS as colunas de tipo data disponíveis no board
- [ ] Suporta formatos de data:
  - DD/MM/YYYY (ex: 28/03/2025)
  - DD/MM (ex: 28/03)
  - YYYY-MM-DD (ISO 8601)
  - Timestamps Unix
  - Strings de data parseáveis (ex: "Março 2025")
- [ ] Detecta automaticamente colunas de data mais prováveis (sugestão inteligente)
- [ ] Valida que coluna selecionada contém dados válidos
- [ ] Exibe mensagem de erro clara se coluna não for adequada
- [ ] Permite seleção de múltiplas colunas de data para diferentes curvas (ex: Data Planejada vs. Data Real)
- [ ] Preview dos primeiros 5 valores ao passar mouse sobre opção

**Regras de Negócio:**
- Eixo X é obrigatório para renderizar gráfico
- Datas devem estar em ordem cronológica (sistema ordena automaticamente)
- Datas duplicadas são permitidas (múltiplos eventos no mesmo dia)

---

#### RF-02: Configuração de Curvas
**Prioridade:** CRÍTICA

**Descrição:**  
Sistema deve permitir configuração de múltiplas curvas com mapeamento independente.

**Critérios de Aceitação:**
- [ ] Permite adicionar de 1 a 10 curvas por gráfico
- [ ] Cada curva possui configuração independente:
  - Nome da curva (texto livre, máx 50 caracteres)
  - Coluna de dados (dropdown com colunas numéricas)
  - Cor (color picker com paleta pré-definida)
  - Tipo de linha (sólida, tracejada, pontilhada)
  - Espessura de linha (1-5px)
  - Unidade (R$, US$, %, un, horas, etc.)
- [ ] Valida que nomes de curvas são únicos no gráfico
- [ ] Permite reordenar curvas (drag-and-drop)
- [ ] Botão "Adicionar Curva" sempre visível
- [ ] Botão "Remover Curva" em cada configuração (mínimo 1 curva obrigatória)
- [ ] Preview em tempo real ao alterar configurações

**Regras de Negócio:**
- Mínimo 1 curva, máximo 10 curvas
- Cores devem ter contraste suficiente (sistema valida)
- Nomes de curvas não podem ser vazios

---

#### RF-03: Cálculo de Valores Acumulados
**Prioridade:** CRÍTICA

**Descrição:**  
Sistema deve calcular automaticamente valores acumulados ao longo do tempo.

**Critérios de Aceitação:**
- [ ] Oferece 3 métodos de acumulação:
  - **Soma Simples:** Valores somados progressivamente
  - **Percentual:** Conversão para 0-100% baseado em total
  - **Valor Absoluto:** Valores originais sem transformação (para custos, receita)
- [ ] Calcula acumulado corretamente mesmo com:
  - Datas não sequenciais
  - Valores ausentes (interpola ou mantém último valor)
  - Valores negativos (suportado)
- [ ] Normaliza valores para mesma escala quando necessário
- [ ] Recalcula automaticamente ao aplicar filtros
- [ ] Exibe total acumulado no tooltip

**Regras de Negócio:**
- Valores ausentes: comportamento configurável (interpolar, manter último, zero)
- Dados devem ser ordenados por data antes do cálculo
- Acumulado nunca deve decrescer (exceto se valores negativos)

---

#### RF-04: Filtragem por Grupos
**Prioridade:** ALTA

**Descrição:**  
Sistema deve permitir filtragem de dados por grupos definidos no board.

**Critérios de Aceitação:**
- [ ] Lista TODOS os grupos existentes no board
- [ ] Permite seleção múltipla (checkboxes)
- [ ] Opções:
  - "Selecionar Todos"
  - "Limpar Seleção"
  - Busca de grupos por nome
- [ ] Filtro aplicado a todas as curvas simultaneamente
- [ ] Recalcula valores acumulados após filtrar
- [ ] Indica visualmente quantos grupos estão selecionados
- [ ] Atualização em < 500ms após aplicar filtro
- [ ] Mantém seleção de filtros ao recarregar página

**Regras de Negócio:**
- Se nenhum grupo selecionado, exibir TODOS os dados
- Grupos podem ser vazios (sem dados associados)
- Filtro persiste na sessão do usuário

---

### 4.2 Visualização Gráfica

#### RF-05: Renderização de Curvas
**Prioridade:** CRÍTICA

**Descrição:**  
Sistema deve renderizar curvas de forma clara, profissional e interativa.

**Critérios de Aceitação:**
- [ ] Curvas renderizadas com interpolação suave (curva de Bézier ou similar)
- [ ] Estilos de linha distintos:
  - Curva Planejada: linha tracejada (padrão)
  - Curva Real: linha sólida (padrão)
  - Customizável pelo usuário
- [ ] Paleta de cores padrão:
  - Planejada: Azul (#2563eb)
  - Realizada: Verde (#10b981)
  - Projetada: Laranja (#f97316)
  - Outras: cores contrastantes automaticamente selecionadas
- [ ] Área de divergência destacada (preenchimento semi-transparente entre curvas)
- [ ] Eixos com escalas apropriadas e legíveis
- [ ] Grade de fundo sutil para facilitar leitura
- [ ] Linha vertical "Hoje" para referência temporal
- [ ] Responsivo (ajusta tamanho automaticamente)

**Regras de Negócio:**
- Gráfico deve ocupar mínimo 60% da largura do container
- Altura mínima: 400px (desktop), 300px (mobile)
- Curvas não devem se sobrepor visualmente (ajuste automático de z-index)

---

#### RF-06: Interatividade e Tooltips
**Prioridade:** ALTA

**Descrição:**  
Sistema deve fornecer interações intuitivas para exploração de dados.

**Critérios de Aceitação:**
- [ ] **Tooltip ao hover:**
  - Data específica do ponto
  - Valor de CADA curva naquele ponto
  - Diferença percentual entre Planejado e Real
  - Formato: "15/03/2025 | Planejado: R$ 100k | Real: R$ 85k | Desvio: -15%"
- [ ] **Zoom:**
  - Scroll do mouse para zoom in/out
  - Pinch gesture em mobile/tablet
  - Botão "Reset Zoom" sempre visível
- [ ] **Pan:**
  - Arrastar gráfico para navegar
  - Funciona em ambos os eixos
- [ ] **Clique em ponto:**
  - Drill-down para tarefas/itens associados àquela data
  - Modal com lista filtrada
- [ ] **Hover em legenda:**
  - Destaca curva correspondente
  - Opacidade reduzida nas outras curvas

**Regras de Negócio:**
- Tooltip deve aparecer em < 100ms
- Zoom máximo: 10x
- Zoom mínimo: visualização completa dos dados

---

#### RF-07: Legenda e Anotações
**Prioridade:** MÉDIA

**Descrição:**  
Sistema deve fornecer contexto visual adicional para facilitar interpretação.

**Critérios de Aceitação:**
- [ ] Legenda identificando cada curva com:
  - Cor
  - Nome
  - Tipo de linha
  - Checkbox para mostrar/ocultar curva
- [ ] Indicadores de marcos (milestones):
  - Ícones customizáveis (🎯, 🚩, ⭐)
  - Posicionados na data correta
  - Tooltip com descrição do marco
- [ ] Linha vertical "Hoje" (data atual):
  - Cor distinta (#ef4444)
  - Label "Hoje" no topo
- [ ] Área de projeção futura (opcional):
  - Fundo levemente diferenciado
  - Label "Projeção" no início da área
- [ ] Anotações customizadas:
  - Usuário pode adicionar notas em datas específicas
  - Ícone de nota (📝) clicável

**Regras de Negócio:**
- Legenda sempre visível (fixa ou flutuante)
- Máximo 5 milestones exibidos simultaneamente (mais antigos ocultados)
- Anotações são persistidas por usuário

---

### 4.3 Templates e Reutilização

#### RF-08: Templates Pré-configurados
**Prioridade:** ALTA

**Descrição:**  
Sistema deve fornecer templates prontos para contextos comuns.

**Critérios de Aceitação:**
- [ ] Templates padrão disponíveis:
  1. **"Curva S - Faturamento"**
     - Eixo X: Data de Competência
     - Curva 1: Faturamento Planejado (R$)
     - Curva 2: Faturamento Realizado (R$)
  2. **"Curva S - Obra/Projeto"**
     - Eixo X: Data de Início
     - Curva 1: Progresso Planejado (%)
     - Curva 2: Progresso Real (%)
  3. **"Curva S - Produção"**
     - Eixo X: Data de Produção
     - Curva 1: Meta de Produção (unidades)
     - Curva 2: Produção Real (unidades)
- [ ] Cada template possui:
  - Nome descritivo
  - Descrição de uso
  - Ícone representativo
  - Preview visual
- [ ] Sistema sugere template baseado em colunas detectadas no board
- [ ] Usuário pode aplicar template e ajustar depois
- [ ] Templates organizados por categoria

**Regras de Negócio:**
- Templates são somente leitura (não editáveis diretamente)
- Usuário pode criar templates customizados baseados nos padrão

---

#### RF-09: Salvar e Gerenciar Configurações
**Prioridade:** ALTA

**Descrição:**  
Sistema deve permitir salvar configurações personalizadas para reutilização.

**Critérios de Aceitação:**
- [ ] Botão "Salvar como Template" sempre disponível
- [ ] Ao salvar, solicita:
  - Nome do template (obrigatório, máx 60 caracteres)
  - Descrição (opcional, máx 200 caracteres)
  - Categoria (dropdown: Faturamento, Projetos, Produção, Outros)
  - Visibilidade (Privado, Compartilhado com equipe, Público)
- [ ] Página de gerenciamento de templates:
  - Lista todos os templates do usuário
  - Permite editar, duplicar, excluir
  - Filtro por categoria e visibilidade
  - Busca por nome
- [ ] Configuração salva inclui:
  - Mapeamento de colunas
  - Cores e estilos
  - Filtros (opcional)
  - Grupos selecionados (opcional)
- [ ] Versionamento automático (mantém últimas 5 versões)

**Regras de Negócio:**
- Templates privados só visíveis para o criador
- Templates compartilhados visíveis para membros da equipe/organização
- Limite de 50 templates salvos por usuário

---

#### RF-10: Aplicar Templates em Novos Boards
**Prioridade:** ALTA

**Descrição:**  
Sistema deve facilitar aplicação de templates em boards com estruturas similares.

**Critérios de Aceitação:**
- [ ] Ao adicionar Curva S em novo board, exibe modal:
  - "Começar do Zero"
  - "Usar Template"
- [ ] Ao selecionar template:
  - Sistema verifica compatibilidade automática
  - Mapeia colunas por nome (ex: "Data" → "Data de Início")
  - Exibe preview de mapeamento com status:
    - ✅ Coluna mapeada com 100% confiança
    - ⚠️ Coluna mapeada com <100% confiança (sugestão)
    - ❌ Coluna não encontrada (requer seleção manual)
- [ ] Permite ajustar mapeamentos antes de aplicar
- [ ] Aplica template em < 3 segundos
- [ ] Salva automaticamente após aplicação bem-sucedida

**Regras de Negócio:**
- Se >70% das colunas mapeadas automaticamente, aplicar template
- Se <70%, solicitar revisão manual obrigatória
- Sistema aprende com correções para melhorar sugestões futuras

---

### 4.4 Exportação e Compartilhamento

#### RF-11: Exportar Visualizações
**Prioridade:** MÉDIA

**Descrição:**  
Sistema deve permitir exportação de gráficos e dados em múltiplos formatos.

**Critérios de Aceitação:**
- [ ] Menu "Exportar" com 3 opções:
  1. **Exportar Gráfico (PNG)**
     - Alta resolução (1920x1080 ou superior)
     - Fundo transparente ou branco (opção do usuário)
     - Inclui legenda e anotações
  2. **Exportar Dados (CSV)**
     - Colunas: Data, Curva1, Curva2, ..., CurvaN
     - Formato compatível com Excel
     - Encoding UTF-8
  3. **Exportar Configuração (JSON)**
     - Arquivo com toda configuração do gráfico
     - Importável em outro board
- [ ] Download inicia automaticamente
- [ ] Nome do arquivo padrão: "CurvaS_[NomeBoard]_[Data].ext"
- [ ] Confirmação visual após exportação

**Regras de Negócio:**
- Exportações não contam para limite de armazenamento
- Logs de exportação mantidos por 30 dias (auditoria)
- Máximo 100 exportações por dia por usuário

---

#### RF-12: Compartilhar Gráficos
**Prioridade:** BAIXA (Fase 2)

**Descrição:**  
Sistema deve permitir compartilhamento de visualizações com stakeholders.

**Critérios de Aceitação:**
- [ ] Botão "Compartilhar" gera link público
- [ ] Link possui configurações:
  - Validade (7, 30, 90 dias, permanente)
  - Senha opcional
  - Permite comentários (sim/não)
- [ ] Visualização compartilhada é somente leitura
- [ ] Atualiza automaticamente com dados mais recentes (se configurado)
- [ ] Permite incorporar via iframe (embed code)

**Regras de Negócio:**
- Links expirados redirecionam para página de erro amigável
- Dados sensíveis requerem autenticação mesmo com link

---

### 4.5 Performance e Otimização

#### RF-13: Carregamento Otimizado
**Prioridade:** CRÍTICA

**Descrição:**  
Sistema deve garantir performance adequada mesmo com grandes volumes de dados.

**Critérios de Aceitação:**
- [ ] Renderização inicial < 2s para até 1000 pontos
- [ ] Agregação automática para datasets >1000 pontos:
  - Agrupa por semana se >1000 pontos diários
  - Agrupa por mês se >500 pontos semanais
- [ ] Lazy loading de dados:
  - Carrega apenas dados visíveis no viewport
  - Carrega mais ao fazer zoom/pan
- [ ] Skeleton loader durante carregamento inicial
- [ ] Indicador de progresso para operações >1s
- [ ] Cache de dados processados (5 minutos)

**Regras de Negócio:**
- Degradação graceful: se >5000 pontos, exibir aviso e oferecer filtros
- Usuário pode forçar visualização completa (com aviso de lentidão)
- Priorizar dados mais recentes em agregações

---

#### RF-14: Atualização em Tempo Real
**Prioridade:** MÉDIA

**Descrição:**  
Sistema deve refletir mudanças nos dados subjacentes automaticamente.

**Critérios de Aceitação:**
- [ ] Polling a cada 30 segundos para verificar alterações
- [ ] Notificação sutil quando novos dados disponíveis
- [ ] Botão "Atualizar Agora" sempre visível
- [ ] Animação suave ao atualizar curvas (sem "pulo" visual)
- [ ] Mantém posição de zoom/pan após atualização
- [ ] Opção de desabilitar atualização automática

**Regras de Negócio:**
- Não atualizar se usuário estiver interagindo com gráfico
- Atualização em background (não bloqueia interface)
- Máximo 1 atualização por minuto

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

**RNF-01: Tempo de Resposta**
- Renderização inicial: < 2s (1000 pontos)
- Aplicação de filtros: < 500ms
- Exportação PNG: < 3s
- Exportação CSV: < 2s
- Salvamento de configuração: < 1s

**RNF-02: Escalabilidade**
- Suportar até 5000 pontos sem crash
- Degradação controlada acima de 5000 pontos
- Memória < 150MB durante uso normal
- CPU < 30% em idle após renderização

**RNF-03: Disponibilidade**
- Uptime: 99.5%
- Fallback local se API offline
- Dados em cache por até 5 minutos

---

### 5.2 Usabilidade

**RNF-04: Curva de Aprendizado**
- Configuração inicial < 5 minutos (usuário não técnico)
- Taxa de conclusão sem ajuda: ≥ 80%
- Taxa de erro na primeira tentativa: < 10%

**RNF-05: Acessibilidade (WCAG 2.1 AA)**
- Navegação completa via teclado
- Suporte a leitores de tela (ARIA labels)
- Contraste mínimo 4.5:1 em todos os elementos
- Textos alternativos para elementos visuais
- Foco visível em todos os elementos interativos

**RNF-06: Internacionalização**
- Interface em Português (BR) - MVP
- Suporte futuro: EN, ES
- Formatação de datas/números por locale
- Moedas configuráveis (R$, US$, EUR, etc.)

---

### 5.3 Compatibilidade

**RNF-07: Navegadores**
- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

**RNF-08: Dispositivos**
- Desktop: ≥ 1280px (experiência completa)
- Tablet: 768-1279px (experiência adaptada)
- Mobile: < 768px (experiência otimizada)

**RNF-09: Integrações**
- API REST para acesso programático
- Webhooks para notificações de alterações
- Embed via iframe

---

### 5.4 Segurança

**RNF-10: Autenticação e Autorização**
- Respeitar permissões do board (visualizar, editar)
- Templates privados isolados por usuário
- Logs de auditoria para todas as ações

**RNF-11: Proteção de Dados**
- Dados processados client-side quando possível
- HTTPS obrigatório em todas as requisições
- Não armazenar dados sensíveis em cache persistente
- Sanitização de inputs para prevenir XSS

**RNF-12: Privacidade**
- LGPD compliance
- Anonimização de dados em logs
- Opt-out de analytics

---

## 6. Especificações Técnicas

### 6.1 Arquitetura

**Stack Tecnológico:**
- **Frontend:** React 18+
- **Gráficos:** Recharts ou Chart.js
- **Estado:** React Context API + Zustand
- **Requisições:** Axios + React Query
- **UI:** Tailwind CSS + shadcn/ui
- **Formatação:** date-fns + numeral.js

**Estrutura de Componentes:**
```
<CurvaSComponent>
  ├── <ConfigurationPanel>
  │   ├── <AxisXSelector>
  │   ├── <CurveConfigurator>
  │   └── <TemplateSelector>
  ├── <ChartCanvas>
  │   ├── <LineChart>
  │   ├── <Tooltip>
  │   ├── <Legend>
  │   └── <Annotations>
  ├── <FilterPanel>
  └── <ExportMenu>
```

---

### 6.2 Modelo de Dados

```typescript
interface CurvaSConfig {
  id: string;
  boardId: string;
  userId: string;
  name: string;
  description?: string;
  
  xAxis: {
    column: string;
    label: string;
    format: 'DD/MM/YYYY' | 'DD/MM' | 'YYYY-MM-DD' | 'timestamp';
  };
  
  curves: Array<{
    id: string;
    name: string;
    column: string;
    color: string;
    lineStyle: 'solid' | 'dashed' | 'dotted';
    lineWidth: 1 | 2 | 3 | 4 | 5;
    unit: string; // 'R, '%', 'un', etc.
    calculationType: 'sum' | 'percentage' | 'absolute';
    visible: boolean;
  }>;
  
  filters: {
    groups: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
  
  display: {
    showToday: boolean;
    showMilestones: boolean;
    showDivergence: boolean;
    showGrid: boolean;
  };
  
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: number;
    template?: string;
  };
}

interface ChartData {
  points: Array<{
    date: Date;
    values: Record<string, number>; // curveId -> value
    accumulated: Record<string, number>;
    group?: string;
  }>;
  
  summary: {
    totalPlanned: number;
    totalRealized: number;
    divergencePercent: number;
    lastUpdate: Date;
  };
}
```

---

### 6.3 APIs

```typescript
// Configurações
GET    /api/boards/{boardId}/chart-configs
POST   /api/boards/{boardId}/chart-configs
PUT    /api/chart-configs/{configId}
DELETE /api/chart-configs/{configId}

// Templates
GET    /api/chart-templates
POST   /api/chart-templates
PUT    /api/chart-templates/{templateId}
DELETE /api/chart-templates/{templateId}

// Dados
GET    /api/boards/{boardId}/chart-data
  ?configId={id}
  &startDate={date}
  &endDate={date}
  &groups[]={group1}&groups[]={group2}

// Exportação
POST   /api/chart-configs/{configId}/export
  body: { format: 'png' | 'csv' | 'json' }

// Compartilhamento
POST   /api/chart-configs/{configId}/share
  body: { expiresIn: number, password?: string }
GET    /api/shared-charts/{shareId}
```

---

## 7. Roadmap de Implementação

### FASE 1: VALIDAÇÃO DO PROTÓTIPO (1 semana)

**Objetivos:**
- Validar conceito com usuários reais
- Identificar gaps de funcionalidade
- Coletar feedback qualitativo

**Atividades:**
1. Demonstração para 2 usuários solicitantes (2 dias)
2. Testes com 3-5 boards reais (3 dias)
3. Consolidação de feedback (2 dias)

**Entregáveis:**
- ✅ Documento de feedback validado
- ✅ Relatório de testes com boards reais
- ✅ Lista priorizada de ajustes

---

### FASE 2: DESENVOLVIMENTO MVP (3 semanas)

**Objetivos:**
- Implementar funcionalidades core
- Integrar com backend
- Garantir estabilidade básica

**Sprint 1 - Configuração (1 semana):**
- RF-01: Seleção de Eixo X
- RF-02: Configuração de Curvas
- RF-03: Cálculo de Acumulados
- RNF-01: Performance básica

**Sprint 2 - Visualização (1 semana):**
- RF-05: Renderização de Curvas
- RF-06: Interatividade
- RF-07: Legenda
- RNF-08: Responsividade

**Sprint 3 - Persistência (1 semana):**
- RF-08: Templates
- RF-09: Salvar Configurações
- RF-04: Filtragem por Grupos
- Testes automatizados

**Entregáveis:**
- ✅ MVP funcional em ambiente de dev
- ✅ 3 templates pré-configurados
- ✅ Cobertura de testes ≥ 70%

---

### FASE 3: REFINAMENTO E UX (2 semanas)

**Objetivos:**
- Polimento de interface
- Features avançadas
- Otimização de performance

**Sprint 4 - Avançado (1 semana):**
- RF-10: Aplicar Templates
- RF-11: Exportação
- RF-13: Otimizações
- Validações robustas

**Sprint 5 - UX (1 semana):**
- Wizard de onboarding
- Mensagens de erro melhoradas
- Animações e transições
- Acessibilidade (WCAG AA)

**Entregáveis:**
- ✅ Interface polida
- ✅ Exportação funcional
- ✅ Conformidade WCAG 2.1 AA

---

### FASE 4: BETA E AJUSTES (2 semanas)

**Objetivos:**
- Testes com usuários reais
- Correção de bugs
- Ajustes finais

**Atividades:**
1. Beta fechado com 10 usuários (1 semana)
2. Coleta de feedback estruturado
3. Correções e ajustes (1 semana)
4. Preparação para launch

**Entregáveis:**
- ✅ Versão beta estável
- ✅ Zero bugs críticos
- ✅ Documentação completa

---

### FASE 5: LAUNCH E MONITORAMENTO (2 semanas)

**Objetivos:**
- Rollout gradual
- Monitoramento ativo
- Suporte intensivo

**Rollout:**
- Semana 1: 20% dos usuários
- Semana 2: 50% dos usuários
- Semana 3: 100% dos usuários

**Entregáveis:**
- ✅ Feature em produção
- ✅ Dashboard de métricas
- ✅ Materiais de divulgação

---

## 8. Critérios de Aceitação Final

### Funcionalidade
- [ ] Usuário configura Curva S em < 5 minutos
- [ ] Funciona em 100% dos boards testados (mín. 10)
- [ ] Templates aplicáveis em < 2 minutos
- [ ] Exportações funcionam sem erros
- [ ] Filtros atualizam gráfico em < 500ms
- [ ] Tooltips exibem dados corretos
- [ ] Configurações persistem entre sessões

### Performance
- [ ] Renderização < 2s (1000 pontos)
- [ ] Sem crashes com 5000 pontos
- [ ] Memória < 150MB em uso normal
- [ ] Taxa de erro < 1%

### Usabilidade
- [ ] NPS ≥ 40 (30+ usuários)
- [ ] 80% completam configuração sem ajuda
- [ ] Taxa de erro < 10% na primeira tentativa
- [ ] Acessibilidade WCAG 2.1 AA validada

### Qualidade
- [ ] Cobertura de testes ≥ 80%
- [ ] Zero bugs críticos
- [ ] Documentação completa
- [ ] Compatibilidade com todos navegadores listados

---

## 9. Riscos e Mitigações

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| **Performance inadequada (>5000 pontos)** | Média | Alto | Agregação automática + lazy loading + limite alertado |
| **Complexidade excessiva da UI** | Alta | Alto | UX research contínuo + wizard guiado + templates |
| **Incompatibilidade com boards legados** | Média | Médio | Validações robustas + modo compatibilidade + sugestões inteligentes |
| **Baixa adoção** | Baixa | Alto | Onboarding interativo + demos + suporte dedicado + champions |
| **Bugs em cálculos acumulados** | Média | Alto | Testes extensivos + peer review + validação com usuários |
| **Dados inconsistentes** | Alta | Médio | Validações + mensagens claras + sugestões de correção |
| **Feedback negativo pós-launch** | Baixa | Alto | Beta fechado + rollout gradual + iterações rápidas |
| **Sobrecarga do backend** | Baixa | Médio | Cache agressivo + processamento client-side + rate limiting |

---

## 10. Equipe e Responsabilidades

**Equipe Core:**
- **Product Owner:** Definição de features, priorização, validação com stakeholders
- **Dev Frontend (2):** Implementação de componentes, integrações, testes
- **Dev Backend (1):** APIs, persistência, otimizações
- **UX/UI Designer (1):** Interfaces, fluxos, protótipos, testes de usabilidade
- **QA Engineer (1):** Testes manuais, automatizados, validação de requisitos

**Suporte:**
- **Tech Lead:** Revisões de arquitetura, decisões técnicas
- **Data Analyst:** Definição de KPIs, análise de métricas
- **Customer Success:** Feedback de usuários, casos de uso reais

---

## 11. Dependências

**Técnicas:**
- ✅ API de boards estável e documentada
- ✅ Sistema de autenticação/permissões funcionando
- ✅ Framework de componentes UI padronizado
- ⚠️ Infraestrutura de armazenamento para templates (a implementar)

**Negócio:**
- ✅ Aprovação de budget e alocação de equipe
- ✅ Alinhamento com roadmap de produto
- ⚠️ Definição de champions em diferentes áreas (a definir)
- ⚠️ Plano de comunicação e treinamento (a criar)

---

## 12. Glossário

- **Curva S:** Gráfico que representa dados acumulados ao longo do tempo, formando curva sigmóide
- **Curva Planejada:** Linha representando progressão ideal conforme planejamento
- **Curva Real:** Linha representando progresso efetivamente alcançado
- **Board:** Painel contendo conjunto organizado de dados/tarefas
- **Grupo:** Categoria de classificação dentro de uma board
- **Template:** Configuração pré-definida reutilizável
- **Drill-down:** Navegação para nível de detalhe mais granular
- **Tooltip:** Caixa informativa exibida ao passar mouse sobre elemento
- **Acumulado:** Soma progressiva de valores ao longo do tempo
- **Divergência:** Diferença percentual entre curvas (geralmente planejado vs. real)

---

## 13. Anexos

### A. Referências Visuais
- [ ] Wireframes de tela de configuração
- [ ] Mockups de estados (vazio, carregando, configurado, erro)
- [ ] Protótipo interativo (Figma/Similar)
- [ ] Exemplos de Curvas S em ferramentas concorrentes

### B. Documentação Técnica
- [ ] Especificação completa da API
- [ ] Guia de estilo de componentes
- [ ] Diagrama de arquitetura do sistema
- [ ] Fluxogramas de processos críticos

### C. Pesquisas e Validações
- [ ] Resultados de entrevistas com usuários
- [ ] Análise de benchmarking (3+ ferramentas)
- [ ] Relatório de testes de usabilidade
- [ ] Feedback estruturado do beta

### D. Materiais de Suporte
- [ ] Guia rápido do usuário (PDF, 2 páginas)
- [ ] Vídeo tutorial (3-5 minutos)
- [ ] FAQ - Perguntas Frequentes
- [ ] Troubleshooting guide

---

## 14. Aprovações

| Stakeholder | Papel | Status | Data | Comentários |
|-------------|-------|--------|------|-------------|
| [Nome] | Product Manager | ⏳ Pendente | - | - |
| [Nome] | Tech Lead | ⏳ Pendente | - | - |
| [Nome] | UX Designer | ⏳ Pendente | - | - |
| [Nome] | Engineering Manager | ⏳ Pendente | - | - |
| [Nome] | Finance Lead | ⏳ Pendente | - | Validação caso uso faturamento |
| [Nome] | Operations Lead | ⏳ Pendente | - | Validação caso uso obras |

---

## 15. Histórico de Versões

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | [Data Anterior] | [Autor] | Versão inicial focada em faturamento |
| 2.0 | 17/11/2025 | [Seu Nome] | Unificação com PRD universal, expansão de escopo, detalhamento de requisitos |

---

**📌 Status do Documento:** Draft para Revisão  
**🎯 Próximos Passos:**
1. Revisão por stakeholders técnicos
2. Validação de viabilidade técnica (Tech Lead)
3. Aprovação de budget e timeline (Product Manager)
4. Kickoff com equipe de desenvolvimento

**📧 Contato:**  
Para dúvidas ou sugestões: [seu-email@empresa.com]