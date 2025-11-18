import React, { useMemo } from 'react';
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
import { Flex, Text, Loader } from '@vibe/core';
import { transformToCurvaSData } from '../utils/chartDataTransform';
import './CurvaSChart.css';

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
 * Componente de visualização do gráfico de Curva S
 * Exibe curvas planejada e real com base na configuração
 */
export const CurvaSChart = ({ boardData, config, loading }) => {
  const chartData = useMemo(() => {
    if (!boardData || !config) return null;
    return transformToCurvaSData(boardData, config);
  }, [boardData, config]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Figtree, Roboto, sans-serif'
          }
        }
      },
      title: {
        display: true,
        text: 'Curva S - Progresso Acumulado',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Figtree, Roboto, sans-serif'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2) + '%';
            }
            return label;
          },
          afterLabel: function(context) {
            if (context.datasetIndex === 0 && context.chart.data.datasets[1]) {
              const realValue = context.chart.data.datasets[1].data[context.dataIndex];
              const plannedValue = context.parsed.y;
              if (realValue !== undefined && plannedValue !== null) {
                const diff = realValue - plannedValue;
                const sign = diff >= 0 ? '+' : '';
                return `Diferença: ${sign}${diff.toFixed(2)}%`;
              }
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Data',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Progresso Acumulado (%)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center" className="chart-loading">
        <Loader size={40} />
        <Text>Carregando gráfico...</Text>
      </Flex>
    );
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" className="chart-empty">
        <Text type="text1" weight="bold">Sem dados para exibir</Text>
        <Text type="text2" color="secondary">
          Configure as colunas de data e valor para visualizar a Curva S
        </Text>
      </Flex>
    );
  }

  return (
    <div className="curva-s-chart">
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="chart-metrics">
        <Flex gap="large" justify="space-around">
          <div className="metric-card">
            <Text type="text2" color="secondary">Total de Pontos</Text>
            <Text type="text1" weight="bold">{chartData.labels.length}</Text>
          </div>
          <div className="metric-card">
            <Text type="text2" color="secondary">Progresso Planejado</Text>
            <Text type="text1" weight="bold" style={{ color: 'rgb(54, 162, 235)' }}>
              {chartData.datasets[0]?.data[chartData.datasets[0].data.length - 1]?.toFixed(1) || 0}%
            </Text>
          </div>
          <div className="metric-card">
            <Text type="text2" color="secondary">Progresso Real</Text>
            <Text type="text1" weight="bold" style={{ color: 'rgb(75, 192, 192)' }}>
              {chartData.datasets[1]?.data[chartData.datasets[1].data.length - 1]?.toFixed(1) || 0}%
            </Text>
          </div>
        </Flex>
      </div>
    </div>
  );
};
