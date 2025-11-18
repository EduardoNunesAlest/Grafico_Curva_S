import React, { useState, useEffect } from 'react';
import { Flex, TabsContext, TabList, Tab, TabPanel, TabPanels, Text, Button } from '@vibe/core';
import { useMondayContext } from '../hooks/useMondayContext';
import { useBoardData } from '../hooks/useBoardData';
import { CurvaSConfig } from './CurvaSConfig';
import { CurvaSChart } from './CurvaSChart';
import { ErrorBoundary } from './ErrorBoundary';
import './CurvaSView.css';

/**
 * Componente principal da View de Curva S
 * Integra configuração e visualização do gráfico
 */
export const CurvaSView = () => {
  const { context, loading: contextLoading, error: contextError } = useMondayContext();
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState(null);
  const [configVersion, setConfigVersion] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Extrair boardId do contexto
  const boardId = context?.boardId || context?.boardIds?.[0];

  const { 
    boardData, 
    loading: boardLoading, 
    error: boardError,
    refetch 
  } = useBoardData(boardId, selectedGroups);

  useEffect(() => {
    // Carregar configuração salva do localStorage
    const savedConfig = localStorage.getItem(`curva-s-config-${boardId}`);
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
        if (parsed.filtros?.gruposSelecionados) {
          setSelectedGroups(parsed.filtros.gruposSelecionados);
        }
      } catch (error) {
        console.error('Error loading saved config:', error);
      }
    }
  }, [boardId]);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setSelectedGroups(newConfig.filtros?.gruposSelecionados || []);
    setConfigVersion((prev) => prev + 1);
    
    // Salvar configuração no localStorage
    if (boardId) {
      localStorage.setItem(`curva-s-config-${boardId}`, JSON.stringify(newConfig));
    }
    
    // Mudar para aba do gráfico
    setActiveTab(1);
  };

  const handleReset = () => {
    setConfig(null);
    setSelectedGroups([]);
    if (boardId) {
      localStorage.removeItem(`curva-s-config-${boardId}`);
    }
    setConfigVersion(0);
    setActiveTab(0);
  };

  if ((contextLoading && !context) || (boardLoading && !boardData)) {
    return (
      <Flex direction="column" align="center" justify="center" className="loading-state">
        <Text type="text1" weight="bold" style={{ marginBottom: '8px' }}>
          Preparando Curva S…
        </Text>
        <Text type="text2" color="secondary">
          Estamos buscando o contexto e os dados do board.
        </Text>
      </Flex>
    );
  }

  // Estados de erro
  if (contextError) {
    return (
      <Flex direction="column" align="center" justify="center" className="error-state">
        <Text type="text1" weight="bold" style={{ color: '#c53030', marginBottom: '8px' }}>
          Erro ao carregar contexto
        </Text>
        <Text type="text2" color="secondary">{contextError}</Text>
      </Flex>
    );
  }

  if (boardError) {
    return (
      <Flex direction="column" align="center" justify="center" className="error-state">
        <Text type="text1" weight="bold" style={{ color: '#c53030', marginBottom: '8px' }}>
          Erro ao carregar dados do board
        </Text>
        <Text type="text2" color="secondary">{boardError}</Text>
        <Button onClick={refetch} style={{ marginTop: '16px' }}>
          Tentar Novamente
        </Button>
      </Flex>
    );
  }

  if (!boardId) {
    return (
      <Flex direction="column" align="center" justify="center" className="empty-state">
        <Text type="text1" weight="bold">Board não detectado</Text>
        <Text type="text2" color="secondary">
          Por favor, abra esta view em um board do Monday.com
        </Text>
      </Flex>
    );
  }

  return (
    <ErrorBoundary onReset={handleReset}>
      <div className="curva-s-view">
        <div className="curva-s-shell">
        <header className="view-header">
          <div className="view-header__titles">
            <Text type="text1" weight="bold" className="view-title">
              Curva S - Análise de Progresso
            </Text>
            <Text type="text2" color="secondary" className="view-subtitle">
              {boardData?.name || 'Carregando...'}
            </Text>
          </div>
          <div className="view-header__actions">
            {config && (
              <Button onClick={handleReset} kind="secondary" size="small" className="ghost-button">
                Limpar configuração
              </Button>
            )}
          </div>
        </header>

        <TabsContext 
          activeTabId={activeTab} 
          onTabChange={setActiveTab}
          className="view-tabs"
        >
          <TabList>
            <Tab id={0}>
              <span className="tab-label">Configuração</span>
            </Tab>
            <Tab id={1} disabled={!config}>
              <span className="tab-label">Gráfico</span>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel id={0}>
              <div className="tab-content">
                <CurvaSConfig
                  boardData={boardData}
                  onConfigChange={handleConfigChange}
                  initialConfig={config}
                />
              </div>
            </TabPanel>

            <TabPanel id={1}>
              <div className="tab-content">
                {config ? (
                  <>
                    <div className="chart-toolbar">
                      <Flex gap="small">
                        <Button kind="secondary" size="small" onClick={() => setActiveTab(0)} className="ghost-button">
                          Ajustar configuração
                        </Button>
                        <Button kind="tertiary" size="small" onClick={handleReset} className="ghost-button ghost-button--outline">
                          Reiniciar
                        </Button>
                      </Flex>
                    </div>
                    <CurvaSChart
                      key={configVersion}
                      boardData={boardData}
                      config={config}
                      loading={boardLoading}
                    />
                  </>
                ) : (
                  <Flex direction="column" align="center" justify="center" className="empty-state">
                    <Text type="text1" weight="bold">Configure a Curva S</Text>
                    <Text type="text2" color="secondary">
                      Vá para a aba "Configuração" para mapear as colunas
                    </Text>
                  </Flex>
                )}
              </div>
            </TabPanel>
          </TabPanels>
        </TabsContext>
        </div>
      </div>
    </ErrorBoundary>
  );
};
