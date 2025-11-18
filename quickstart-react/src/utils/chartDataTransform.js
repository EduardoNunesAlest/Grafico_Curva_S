import { parseISO, format, isValid } from 'date-fns';

/**
 * Transforma dados do Monday.com para formato de Curva S
 * @param {Object} boardData - Dados do board
 * @param {Object} config - Configuração de mapeamento
 * @returns {Object} Dados formatados para o gráfico
 */
export const transformToCurvaSData = (boardData, config) => {
  if (!boardData?.items_page?.items) {
    return { labels: [], datasets: [] };
  }

  const items = boardData.items_page.items;
  
  // Extrair e processar dados planejados
  const plannedData = extractCurveData(
    items,
    config.curvaPlaneada.colunaData,
    config.curvaPlaneada.colunaValor
  );

  // Extrair e processar dados reais
  const realData = extractCurveData(
    items,
    config.curvaReal.colunaData,
    config.curvaReal.colunaValor
  );

  // Combinar e ordenar todas as datas
  const allDates = [...new Set([
    ...plannedData.map(d => d.date),
    ...realData.map(d => d.date)
  ])].sort((a, b) => new Date(a) - new Date(b));

  // Calcular valores acumulados
  const plannedAccumulated = calculateAccumulated(plannedData, allDates);
  const realAccumulated = calculateAccumulated(realData, allDates);

  return {
    labels: allDates.map(date => format(new Date(date), 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Planejado',
        data: plannedAccumulated,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 5
      },
      {
        label: 'Real',
        data: realAccumulated,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };
};

/**
 * Extrai dados de curva dos itens do board
 */
const extractCurveData = (items, dateColumnId, valueColumnId) => {
  const data = [];

  items.forEach(item => {
    const dateColumn = item.column_values.find(col => col.id === dateColumnId);
    const valueColumn = item.column_values.find(col => col.id === valueColumnId);

    if (dateColumn && valueColumn) {
      const date = parseDateValue(dateColumn);
      const value = parseNumericValue(valueColumn);

      if (date && value !== null) {
        data.push({ date, value });
      }
    }
  });

  return data;
};

/**
 * Parse de valor de data do Monday.com
 * Suporta tipos: date, timeline
 */
const parseDateValue = (column) => {
  try {
    if (!column.value) return null;
    
    const parsed = JSON.parse(column.value);
    
    // Tipo timeline (from/to)
    if (parsed.from) {
      const date = parseISO(parsed.from);
      return isValid(date) ? date.toISOString() : null;
    }
    
    // Tipo date simples
    if (parsed.date) {
      const date = parseISO(parsed.date);
      return isValid(date) ? date.toISOString() : null;
    }
    
    // Fallback para texto
    if (column.text) {
      const date = parseISO(column.text);
      return isValid(date) ? date.toISOString() : null;
    }
  } catch (error) {
    console.warn('Error parsing date:', error, column);
  }
  return null;
};

/**
 * Parse de valor numérico do Monday.com
 * Suporta tipos: numbers, progress, status
 */
const parseNumericValue = (column) => {
  try {
    // Tentar parse do JSON value
    if (column.value) {
      const parsed = JSON.parse(column.value);
      
      // Tipo progress (retorna percentual diretamente)
      if (typeof parsed === 'number') return parsed;
      
      // Tipo numbers
      if (parsed.number !== undefined) return parseFloat(parsed.number);
      
      // Tipo status (usar index como valor)
      if (parsed.index !== undefined) return parseFloat(parsed.index) * 25; // 0, 25, 50, 75, 100
    }

    // Fallback para texto
    if (column.text) {
      // Se tem %, extrair número
      if (column.text.includes('%')) {
        const cleaned = column.text.replace(/[^\d.-]/g, '');
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
      }
      
      const cleaned = column.text.replace(/[^\d.-]/g, '');
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    }
  } catch (error) {
    console.warn('Error parsing numeric value:', error, column);
  }
  return 0;
};

/**
 * Calcula valores acumulados ao longo do tempo
 */
const calculateAccumulated = (data, allDates) => {
  const accumulated = [];
  let total = 0;

  allDates.forEach(date => {
    // Somar todos os valores até esta data
    const valuesUpToDate = data
      .filter(d => new Date(d.date) <= new Date(date))
      .reduce((sum, d) => sum + d.value, 0);
    
    accumulated.push(valuesUpToDate);
    total = Math.max(total, valuesUpToDate);
  });

  // Normalizar para 0-100%
  if (total > 0) {
    return accumulated.map(val => (val / total) * 100);
  }

  return accumulated;
};

/**
 * Filtra colunas por tipo
 */
export const getColumnsByType = (columns, types) => {
  return columns.filter(col => types.includes(col.type));
};

/**
 * Obtém colunas de data disponíveis
 */
export const getDateColumns = (columns) => {
  return getColumnsByType(columns, ['date', 'timeline']);
};

/**
 * Obtém colunas numéricas disponíveis
 */
export const getNumericColumns = (columns) => {
  return getColumnsByType(columns, ['numbers', 'numeric', 'status', 'progress']);
};
