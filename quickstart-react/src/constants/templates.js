/**
 * Templates pré-configurados de Curva S
 * Conformo PRD 2.0 - RF-08: Templates Pré-configurados
 */

export const CHART_TEMPLATES = [
  {
    id: 'faturamento',
    name: 'Curva S - Faturamento',
    description: 'Visualização de receita planejada vs. realizada ao longo do tempo',
    category: 'Financeiro',
    icon: '💰',
    config: {
      xAxis: {
        columnTypes: ['date', 'timeline'],
        preferredNames: ['data_competencia', 'competencia', 'data', 'mes'],
        label: 'Data de Competência',
        format: 'DD/MM/YYYY'
      },
      curves: [
        {
          id: 'planejado',
          name: 'Faturamento Planejado',
          columnTypes: ['numbers', 'numeric'],
          preferredNames: ['faturamento_planejado', 'planejado', 'meta', 'previsto'],
          color: '#2563eb',
          lineStyle: 'dashed',
          lineWidth: 2,
          unit: 'R$',
          calculationType: 'sum',
          visible: true
        },
        {
          id: 'realizado',
          name: 'Faturamento Realizado',
          columnTypes: ['numbers', 'numeric'],
          preferredNames: ['faturamento_realizado', 'realizado', 'real', 'efetivo'],
          color: '#10b981',
          lineStyle: 'solid',
          lineWidth: 3,
          unit: 'R$',
          calculationType: 'sum',
          visible: true
        }
      ],
      display: {
        showToday: true,
        showMilestones: true,
        showDivergence: true,
        showGrid: true
      }
    }
  },
  {
    id: 'projeto',
    name: 'Curva S - Obra/Projeto',
    description: 'Acompanhamento de progresso planejado vs. real em projetos',
    category: 'Projetos',
    icon: '🏗️',
    config: {
      xAxis: {
        columnTypes: ['date', 'timeline'],
        preferredNames: ['data_inicio', 'inicio', 'data', 'prazo'],
        label: 'Data de Início',
        format: 'DD/MM/YYYY'
      },
      curves: [
        {
          id: 'planejado',
          name: 'Progresso Planejado',
          columnTypes: ['progress', 'numbers', 'numeric', 'status'],
          preferredNames: ['progresso_planejado', 'planejado', 'meta', 'previsto'],
          color: '#2563eb',
          lineStyle: 'dashed',
          lineWidth: 2,
          unit: '%',
          calculationType: 'percentage',
          visible: true
        },
        {
          id: 'real',
          name: 'Progresso Real',
          columnTypes: ['progress', 'numbers', 'numeric', 'status'],
          preferredNames: ['progresso_real', 'progresso', 'real', 'conclusao'],
          color: '#10b981',
          lineStyle: 'solid',
          lineWidth: 3,
          unit: '%',
          calculationType: 'percentage',
          visible: true
        }
      ],
      display: {
        showToday: true,
        showMilestones: true,
        showDivergence: true,
        showGrid: true
      }
    }
  },
  {
    id: 'producao',
    name: 'Curva S - Produção',
    description: 'Monitoramento de meta de produção vs. produção real',
    category: 'Operações',
    icon: '🏭',
    config: {
      xAxis: {
        columnTypes: ['date', 'timeline'],
        preferredNames: ['data_producao', 'data', 'periodo'],
        label: 'Data de Produção',
        format: 'DD/MM/YYYY'
      },
      curves: [
        {
          id: 'meta',
          name: 'Meta de Produção',
          columnTypes: ['numbers', 'numeric'],
          preferredNames: ['meta_producao', 'meta', 'planejado', 'objetivo'],
          color: '#2563eb',
          lineStyle: 'dashed',
          lineWidth: 2,
          unit: 'un',
          calculationType: 'sum',
          visible: true
        },
        {
          id: 'real',
          name: 'Produção Real',
          columnTypes: ['numbers', 'numeric'],
          preferredNames: ['producao_real', 'producao', 'realizado'],
          color: '#10b981',
          lineStyle: 'solid',
          lineWidth: 3,
          unit: 'un',
          calculationType: 'sum',
          visible: true
        }
      ],
      display: {
        showToday: true,
        showMilestones: false,
        showDivergence: true,
        showGrid: true
      }
    }
  }
];

/**
 * Categorias de templates disponíveis
 */
export const TEMPLATE_CATEGORIES = [
  { id: 'financeiro', name: 'Financeiro', icon: '💰' },
  { id: 'projetos', name: 'Projetos', icon: '🏗️' },
  { id: 'operacoes', name: 'Operações', icon: '🏭' },
  { id: 'outros', name: 'Outros', icon: '📊' }
];

/**
 * Opções de visualização padrão
 */
export const DEFAULT_DISPLAY_OPTIONS = {
  showToday: true,
  showMilestones: true,
  showDivergence: true,
  showGrid: true
};

/**
 * Paleta de cores padrão para curvas
 */
export const DEFAULT_COLORS = [
  '#2563eb', // Azul
  '#10b981', // Verde
  '#f97316', // Laranja
  '#8b5cf6', // Roxo
  '#ef4444', // Vermelho
  '#06b6d4', // Cyan
  '#f59e0b', // Âmbar
  '#ec4899', // Rosa
  '#14b8a6', // Teal
  '#a855f7'  // Violeta
];

/**
 * Estilos de linha disponíveis
 */
export const LINE_STYLES = [
  { id: 'solid', name: 'Sólida', value: 'solid' },
  { id: 'dashed', name: 'Tracejada', value: 'dashed' },
  { id: 'dotted', name: 'Pontilhada', value: 'dotted' }
];

/**
 * Tipos de cálculo disponíveis
 */
export const CALCULATION_TYPES = [
  { id: 'sum', name: 'Soma Simples', description: 'Valores somados progressivamente' },
  { id: 'percentage', name: 'Percentual', description: 'Conversão para 0-100% baseado em total' },
  { id: 'absolute', name: 'Valor Absoluto', description: 'Valores originais sem transformação' }
];

/**
 * Unidades disponíveis
 */
export const UNITS = [
  { id: 'brl', symbol: 'R$', name: 'Real Brasileiro' },
  { id: 'usd', symbol: 'US$', name: 'Dólar Americano' },
  { id: 'eur', symbol: '€', name: 'Euro' },
  { id: 'percent', symbol: '%', name: 'Percentual' },
  { id: 'units', symbol: 'un', name: 'Unidades' },
  { id: 'hours', symbol: 'h', name: 'Horas' },
  { id: 'days', symbol: 'd', name: 'Dias' },
  { id: 'none', symbol: '', name: 'Sem unidade' }
];
