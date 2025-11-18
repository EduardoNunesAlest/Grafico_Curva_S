import React, { useState, useEffect, useMemo } from 'react';
import { Flex, Dropdown, Button, Loader, Text } from '@vibe/core';
import { getDateColumns, getNumericColumns } from '../utils/chartDataTransform';
import './CurvaSConfig.css';

const DEFAULT_CONFIG = {
  curvaPlaneada: { colunaData: '', colunaValor: '', tipoCálculo: 'percentual' },
  curvaReal: { colunaData: '', colunaValor: '', tipoCálculo: 'percentual' },
  filtros: { gruposSelecionados: [] }
};

/**
 * Componente de configuração da Curva S
 * Permite mapear colunas de data e valor para as curvas planejada e real
 */
export const CurvaSConfig = ({ boardData, onConfigChange, initialConfig }) => {
  const [config, setConfig] = useState(initialConfig || DEFAULT_CONFIG);

  const [dateColumns, setDateColumns] = useState([]);
  const [numericColumns, setNumericColumns] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (initialConfig) {
      setConfig(prev => ({
        ...DEFAULT_CONFIG,
        ...initialConfig,
        curvaPlaneada: {
          ...DEFAULT_CONFIG.curvaPlaneada,
          ...initialConfig.curvaPlaneada
        },
        curvaReal: {
          ...DEFAULT_CONFIG.curvaReal,
          ...initialConfig.curvaReal
        },
        filtros: {
          ...DEFAULT_CONFIG.filtros,
          ...initialConfig.filtros
        }
      }));
    }
  }, [initialConfig]);

  useEffect(() => {
    if (boardData?.columns) {
      setDateColumns(getDateColumns(boardData.columns));
      setNumericColumns(getNumericColumns(boardData.columns));
    }
    if (boardData?.groups) {
      setGroups(boardData.groups);
    }
  }, [boardData]);

  const handleChange = (section, field, value) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section],
        [field]: value
      }
    };
    setConfig(newConfig);
  };

  const handleGroupSelection = (groupId) => {
    const currentGroups = config.filtros.gruposSelecionados;
    const newGroups = currentGroups.includes(groupId)
      ? currentGroups.filter(id => id !== groupId)
      : [...currentGroups, groupId];
    
    const newConfig = {
      ...config,
      filtros: { gruposSelecionados: newGroups }
    };
    setConfig(newConfig);
  };

  const handleApply = () => {
    if (validateConfig()) {
      onConfigChange(config);
    }
  };

  const validateConfig = () => {
    const { curvaPlaneada, curvaReal } = config;
    return (
      curvaPlaneada.colunaData &&
      curvaPlaneada.colunaValor &&
      curvaReal.colunaData &&
      curvaReal.colunaValor
    );
  };

  if (!boardData) {
    return (
      <Flex direction="column" align="center" justify="center" style={{ padding: '40px' }}>
        <Loader size={40} />
        <Text>Carregando dados do board...</Text>
      </Flex>
    );
  }

  const dateOptions = dateColumns.map(col => ({
    value: col.id,
    label: col.title
  }));

  const numericOptions = numericColumns.map(col => ({
    value: col.id,
    label: col.title
  }));

  const selectedValues = useMemo(() => ({
    plannedDate: dateOptions.find(opt => opt.value === config.curvaPlaneada.colunaData) || null,
    plannedValue: numericOptions.find(opt => opt.value === config.curvaPlaneada.colunaValor) || null,
    realDate: dateOptions.find(opt => opt.value === config.curvaReal.colunaData) || null,
    realValue: numericOptions.find(opt => opt.value === config.curvaReal.colunaValor) || null
  }), [config, dateOptions, numericOptions]);

  return (
    <div className="curva-s-config">
      <div className="config-shell">
        <div className="config-header">
          <div>
            <Text type="text2" color="secondary">Projeto</Text>
            <Text type="text1" weight="bold">
              {boardData?.name || 'Curva S - Configuração'}
            </Text>
          </div>
          <Text type="text3" color="secondary">
            Configure o mapeamento das colunas antes de visualizar o gráfico.
          </Text>
        </div>

        <div className="config-content">
          <div className="config-grid">
            <div className="config-card">
              <div className="config-card__header">
                <Text type="text1" weight="bold">Configuração da Curva Planejada</Text>
                <Text type="text3" color="secondary">
                  Escolha as colunas que representam datas e valores planejados.
                </Text>
              </div>
              <Flex direction="column" gap="medium">
                <div className="config-field">
                  <Text type="text3" weight="medium" className="config-field__label">
                    Coluna de data (planejado)
                  </Text>
                  <Dropdown
                    className="config-dropdown"
                    placeholder="Selecione a coluna de data"
                    options={dateOptions}
                    value={selectedValues.plannedDate}
                    onChange={(option) => handleChange('curvaPlaneada', 'colunaData', option.value)}
                    size="large"
                  />
                </div>
                <div className="config-field">
                  <Text type="text3" weight="medium" className="config-field__label">
                    Coluna de valor (planejado)
                  </Text>
                  <Dropdown
                    className="config-dropdown"
                    placeholder="Selecione a coluna de valor"
                    options={numericOptions}
                    value={selectedValues.plannedValue}
                    onChange={(option) => handleChange('curvaPlaneada', 'colunaValor', option.value)}
                    size="large"
                  />
                </div>
              </Flex>
            </div>

            <div className="config-card">
              <div className="config-card__header">
                <Text type="text1" weight="bold">Configuração da Curva Real</Text>
                <Text type="text3" color="secondary">
                  Mapeie as colunas correspondentes ao progresso realizado.
                </Text>
              </div>
              <Flex direction="column" gap="medium">
                <div className="config-field">
                  <Text type="text3" weight="medium" className="config-field__label">
                    Coluna de data (real)
                  </Text>
                  <Dropdown
                    className="config-dropdown"
                    placeholder="Selecione a coluna de data"
                    options={dateOptions}
                    value={selectedValues.realDate}
                    onChange={(option) => handleChange('curvaReal', 'colunaData', option.value)}
                    size="large"
                  />
                </div>
                <div className="config-field">
                  <Text type="text3" weight="medium" className="config-field__label">
                    Coluna de valor (real)
                  </Text>
                  <Dropdown
                    className="config-dropdown"
                    placeholder="Selecione a coluna de valor"
                    options={numericOptions}
                    value={selectedValues.realValue}
                    onChange={(option) => handleChange('curvaReal', 'colunaValor', option.value)}
                    size="large"
                  />
                </div>
              </Flex>
            </div>
          </div>

          {groups.length > 0 && (
            <div className="config-card config-card--groups">
              <div className="config-card__header">
                <Text type="text1" weight="bold">Filtrar por Grupos (opcional)</Text>
                <Text type="text3" color="secondary">
                  Selecione apenas os grupos que deseja considerar no gráfico.
                </Text>
              </div>
              <div className="groups-list">
                {groups.map(group => (
                  <label key={group.id} className="group-checkbox">
                    <input
                      type="checkbox"
                      checked={config.filtros.gruposSelecionados.includes(group.id)}
                      onChange={() => handleGroupSelection(group.id)}
                    />
                    <span className="group-checkbox__label" style={{ color: group.color || '#333' }}>
                      {group.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="config-actions">
            <Button
              onClick={handleApply}
              disabled={!validateConfig()}
              size="large"
              kind="primary"
              className="apply-button"
            >
              Aplicar Configuração
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
