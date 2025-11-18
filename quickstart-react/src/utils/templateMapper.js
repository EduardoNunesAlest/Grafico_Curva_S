/**
 * Utilitário para mapeamento inteligente de templates
 * Conformo PRD 2.0 - RF-10: Aplicar Templates em Novos Boards
 */

/**
 * Calcula similaridade entre duas strings (normalizada 0-1)
 * Usa algoritmo de Levenshtein simplificado
 */
const stringSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const s2 = str2.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Verifica se uma string contém a outra
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.7;
  }
  
  // Calcula distância de Levenshtein simples
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++;
  }
  
  return matches / longer.length;
};

/**
 * Encontra melhor coluna correspondente baseado em nome e tipo
 * @param {Array} columns - Colunas disponíveis no board
 * @param {Array} preferredNames - Nomes preferidos para busca
 * @param {Array} allowedTypes - Tipos de coluna permitidos
 * @returns {Object} - { column, confidence, status }
 */
export const findBestMatch = (columns, preferredNames, allowedTypes) => {
  if (!columns || columns.length === 0) {
    return { column: null, confidence: 0, status: 'error' };
  }
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const column of columns) {
    // Verifica se tipo é compatível
    if (!allowedTypes.includes(column.type)) continue;
    
    // Calcula score de similaridade com nomes preferidos
    for (const prefName of preferredNames) {
      const score = stringSimilarity(column.title, prefName);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = column;
      }
    }
  }
  
  if (!bestMatch) {
    // Fallback: retorna primeira coluna do tipo permitido
    bestMatch = columns.find(col => allowedTypes.includes(col.type));
    bestScore = 0.3;
  }
  
  // Determina status baseado em confiança
  let status = 'error';
  if (bestScore >= 0.8) status = 'success';
  else if (bestScore >= 0.5) status = 'warning';
  
  return {
    column: bestMatch,
    confidence: Math.round(bestScore * 100),
    status
  };
};

/**
 * Mapeia template para colunas do board
 * @param {Object} template - Template a ser aplicado
 * @param {Array} boardColumns - Colunas disponíveis no board
 * @returns {Object} - Configuração mapeada com status
 */
export const mapTemplateToBoard = (template, boardColumns) => {
  const mapping = {
    templateId: template.id,
    templateName: template.name,
    xAxis: null,
    curves: [],
    overallConfidence: 0,
    status: 'success'
  };
  
  // Mapeia Eixo X
  const xAxisMatch = findBestMatch(
    boardColumns,
    template.config.xAxis.preferredNames,
    template.config.xAxis.columnTypes
  );
  
  mapping.xAxis = {
    column: xAxisMatch.column,
    confidence: xAxisMatch.confidence,
    status: xAxisMatch.status,
    label: template.config.xAxis.label,
    format: template.config.xAxis.format
  };
  
  let totalConfidence = xAxisMatch.confidence;
  let mappedCount = 1;
  
  // Mapeia cada curva
  for (const curveTemplate of template.config.curves) {
    const curveMatch = findBestMatch(
      boardColumns,
      curveTemplate.preferredNames,
      curveTemplate.columnTypes
    );
    
    mapping.curves.push({
      ...curveTemplate,
      column: curveMatch.column,
      confidence: curveMatch.confidence,
      status: curveMatch.status
    });
    
    totalConfidence += curveMatch.confidence;
    mappedCount++;
  }
  
  // Calcula confiança geral
  mapping.overallConfidence = Math.round(totalConfidence / mappedCount);
  
  // Determina status geral
  if (mapping.overallConfidence >= 70) {
    mapping.status = 'success';
  } else if (mapping.overallConfidence >= 50) {
    mapping.status = 'warning';
  } else {
    mapping.status = 'error';
  }
  
  mapping.display = template.config.display;
  
  return mapping;
};

/**
 * Valida se mapeamento está completo e válido
 * @param {Object} mapping - Mapeamento a validar
 * @returns {Object} - { isValid, errors, warnings }
 */
export const validateMapping = (mapping) => {
  const errors = [];
  const warnings = [];
  
  // Valida Eixo X
  if (!mapping.xAxis || !mapping.xAxis.column) {
    errors.push('Eixo X não foi mapeado. Selecione uma coluna de data.');
  } else if (mapping.xAxis.confidence < 50) {
    warnings.push('Mapeamento do Eixo X tem baixa confiança. Revise a seleção.');
  }
  
  // Valida Curvas
  if (!mapping.curves || mapping.curves.length === 0) {
    errors.push('Nenhuma curva foi mapeada. Configure pelo menos uma curva.');
  } else {
    mapping.curves.forEach((curve, index) => {
      if (!curve.column) {
        errors.push(`Curva "${curve.name}" não foi mapeada. Selecione uma coluna.`);
      } else if (curve.confidence < 50) {
        warnings.push(`Curva "${curve.name}" tem baixa confiança no mapeamento.`);
      }
    });
  }
  
  // Valida duplicatas
  const usedColumns = [
    mapping.xAxis?.column?.id,
    ...mapping.curves.map(c => c.column?.id)
  ].filter(Boolean);
  
  const duplicates = usedColumns.filter((id, index) => usedColumns.indexOf(id) !== index);
  if (duplicates.length > 0) {
    warnings.push('Algumas colunas estão sendo usadas múltiplas vezes. Isso pode causar confusão.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Gera sugestões de melhoria para mapeamento
 * @param {Object} mapping - Mapeamento atual
 * @param {Array} boardColumns - Colunas disponíveis
 * @returns {Array} - Lista de sugestões
 */
export const generateSuggestions = (mapping, boardColumns) => {
  const suggestions = [];
  
  // Sugestões para Eixo X
  if (mapping.xAxis && mapping.xAxis.confidence < 80) {
    const dateColumns = boardColumns.filter(col => 
      ['date', 'timeline'].includes(col.type)
    );
    
    if (dateColumns.length > 1) {
      suggestions.push({
        type: 'xAxis',
        message: `Existem ${dateColumns.length} colunas de data. Considere usar: ${
          dateColumns.map(c => `"${c.title}"`).join(', ')
        }`
      });
    }
  }
  
  // Sugestões para Curvas
  mapping.curves.forEach((curve, index) => {
    if (curve.confidence < 80) {
      const numericColumns = boardColumns.filter(col => 
        curve.columnTypes.includes(col.type)
      );
      
      if (numericColumns.length > 1) {
        suggestions.push({
          type: 'curve',
          curveIndex: index,
          message: `Para "${curve.name}", considere: ${
            numericColumns.map(c => `"${c.title}"`).join(', ')
          }`
        });
      }
    }
  });
  
  return suggestions;
};

/**
 * Salva mapeamento customizado como template
 * @param {Object} mapping - Mapeamento a salvar
 * @param {Object} metadata - Metadados do template
 * @returns {Object} - Template salvo
 */
export const saveCustomTemplate = (mapping, metadata) => {
  const template = {
    id: `custom_${Date.now()}`,
    name: metadata.name,
    description: metadata.description || '',
    category: metadata.category || 'Outros',
    icon: metadata.icon || '📊',
    isCustom: true,
    createdAt: new Date().toISOString(),
    config: {
      xAxis: {
        columnTypes: [mapping.xAxis.column.type],
        preferredNames: [mapping.xAxis.column.title],
        label: mapping.xAxis.label,
        format: mapping.xAxis.format
      },
      curves: mapping.curves.map(curve => ({
        id: curve.id,
        name: curve.name,
        columnTypes: [curve.column.type],
        preferredNames: [curve.column.title],
        color: curve.color,
        lineStyle: curve.lineStyle,
        lineWidth: curve.lineWidth,
        unit: curve.unit,
        calculationType: curve.calculationType,
        visible: curve.visible
      })),
      display: mapping.display
    }
  };
  
  return template;
};
