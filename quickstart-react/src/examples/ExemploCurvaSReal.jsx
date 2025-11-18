import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Flex, Text, Box } from '@vibe/core';
import { dadosReaisBoard, gerarDadosChartJS, opcoesChartJS } from './dadosReaisBoard';
import './ExemploCurvaSReal.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Componente de exemplo mostrando Curva S com dados reais do board 9887177075
 */
export const ExemploCurvaSReal = () => {
  const { curvaSAcumulada, estatisticasPorGrupo } = dadosReaisBoard;
  const dadosGrafico = gerarDadosChartJS();

  return (
    <div className="exemplo-curva-s-real">
      {/* Header */}
      <div className="header">
        <div>
          <Text type="text1" weight="bold" style={{ fontSize: '24px', marginBottom: '8px' }}>
            Curva S - Projeto Workvivo
          </Text>
          <Text type="text2" color="secondary">
            Análise de Progresso: Planejado vs Realizado
          </Text>
        </div>
        <div className="status-badge concluido">
          {curvaSAcumulada.metricas.status}
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="metricas-resumo">
        <div className="metrica-card">
          <Text type="text2" color="secondary">Total de Tarefas</Text>
          <Text type="text1" weight="bold" style={{ fontSize: '32px', color: '#0073ea' }}>
            {curvaSAcumulada.metricas.totalTarefas}
          </Text>
        </div>
        
        <div className="metrica-card">
          <Text type="text2" color="secondary">Concluídas</Text>
          <Text type="text1" weight="bold" style={{ fontSize: '32px', color: '#00c875' }}>
            {curvaSAcumulada.metricas.tarefasConcluidas}
          </Text>
        </div>

        <div className="metrica-card">
          <Text type="text2" color="secondary">% Conclusão</Text>
          <Text type="text1" weight="bold" style={{ fontSize: '32px', color: '#00c875' }}>
            {curvaSAcumulada.metricas.percentualConclusao}%
          </Text>
        </div>

        <div className="metrica-card">
          <Text type="text2" color="secondary">Desvio Médio</Text>
          <Text type="text1" weight="bold" style={{ fontSize: '32px', color: '#e2445c' }}>
            {curvaSAcumulada.metricas.desvioMedio.toFixed(1)} dias
          </Text>
        </div>
      </div>

      {/* Gráfico Curva S */}
      <div className="grafico-container">
        <div className="grafico-wrapper">
          <Line data={dadosGrafico} options={opcoesChartJS} />
        </div>
      </div>

      {/* Análise por Grupo */}
      <div className="analise-grupos">
        <Text type="text1" weight="bold" style={{ fontSize: '18px', marginBottom: '16px' }}>
          Análise por Grupo
        </Text>
        
        <div className="grupos-grid">
          {Object.values(estatisticasPorGrupo).map((grupo, index) => (
            <div key={index} className="grupo-card">
              <div className="grupo-header">
                <Text type="text2" weight="bold">{grupo.nome}</Text>
                <div className={`badge ${grupo.percentualConclusao === 100 ? 'success' : 'warning'}`}>
                  {grupo.percentualConclusao}%
                </div>
              </div>
              
              <div className="grupo-metricas">
                <div className="grupo-metrica">
                  <Text type="text3" color="secondary">Tarefas</Text>
                  <Text type="text2" weight="medium">
                    {grupo.concluidas} / {grupo.totalTarefas}
                  </Text>
                </div>
                
                <div className="grupo-metrica">
                  <Text type="text3" color="secondary">Desvio Médio</Text>
                  <Text type="text2" weight="medium" style={{ 
                    color: grupo.desvioMedio > 5 ? '#e2445c' : '#00c875' 
                  }}>
                    {grupo.desvioMedio.toFixed(1)} dias
                  </Text>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${grupo.percentualConclusao}%`,
                    backgroundColor: grupo.percentualConclusao === 100 ? '#00c875' : '#fdab3d'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights e Alertas */}
      <div className="insights-section">
        <Text type="text1" weight="bold" style={{ fontSize: '18px', marginBottom: '16px' }}>
          Insights e Recomendações
        </Text>
        
        <div className="insights-list">
          <div className="insight-item success">
            <div className="insight-icon">✅</div>
            <div className="insight-content">
              <Text type="text2" weight="bold">Projeto Concluído</Text>
              <Text type="text3" color="secondary">
                Todas as {curvaSAcumulada.metricas.totalTarefas} tarefas foram finalizadas com sucesso.
              </Text>
            </div>
          </div>

          <div className="insight-item warning">
            <div className="insight-icon">⚠️</div>
            <div className="insight-content">
              <Text type="text2" weight="bold">Desvio de Prazo Detectado</Text>
              <Text type="text3" color="secondary">
                Desvio médio de {curvaSAcumulada.metricas.desvioMedio.toFixed(1)} dias. 
                Maior atraso: {curvaSAcumulada.metricas.maiorDesvio} dias na tarefa de "Segurança e Backup".
              </Text>
            </div>
          </div>

          <div className="insight-item info">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <Text type="text2" weight="bold">Grupo com Melhor Desempenho</Text>
              <Text type="text3" color="secondary">
                "Desenvolvimento" teve o menor desvio médio (4 dias) entre todos os grupos.
              </Text>
            </div>
          </div>

          <div className="insight-item info">
            <div className="insight-icon">📊</div>
            <div className="insight-content">
              <Text type="text2" weight="bold">Curva S Característica</Text>
              <Text type="text3" color="secondary">
                O projeto seguiu uma curva S típica, com aceleração no meio e 
                desaceleração no final, indicando boa gestão de ritmo.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Detalhada */}
      <div className="timeline-section">
        <Text type="text1" weight="bold" style={{ fontSize: '18px', marginBottom: '16px' }}>
          Timeline do Projeto
        </Text>
        
        <div className="timeline-info">
          <div className="timeline-item">
            <Text type="text3" color="secondary">Início Planejado</Text>
            <Text type="text2" weight="medium">
              {curvaSAcumulada.inicio.toLocaleDateString('pt-BR')}
            </Text>
          </div>
          
          <div className="timeline-item">
            <Text type="text3" color="secondary">Término Planejado</Text>
            <Text type="text2" weight="medium">
              {new Date("2025-04-05").toLocaleDateString('pt-BR')}
            </Text>
          </div>

          <div className="timeline-item">
            <Text type="text3" color="secondary">Término Real</Text>
            <Text type="text2" weight="medium" style={{ color: '#e2445c' }}>
              {curvaSAcumulada.fim.toLocaleDateString('pt-BR')}
            </Text>
          </div>

          <div className="timeline-item">
            <Text type="text3" color="secondary">Duração Total</Text>
            <Text type="text2" weight="medium">
              {curvaSAcumulada.duracaoTotal} dias
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
