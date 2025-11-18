/**
 * Dados Reais do Board 9887177075 - Projeto Teste Curva S - Workvivo
 * Dados extraídos via MCP monday-mcp em 17/11/2025
 */

export const dadosReaisBoard = {
  board: {
    id: "9887177075",
    name: "Projeto Teste Curva S - Workvivo",
    totalItems: 17
  },
  
  // Configuração automática baseada na estrutura real
  configuracaoAutomatica: {
    colunas: {
      data: "name",
      planejadoInicio: "timerange_mkv59xwc",
      planejadoFim: "timerange_mkv59xwc",
      realizadoInicio: "timerange_mkv56d8m",
      realizadoFim: "timerange_mkv56d8m",
      progresso: "columns_battery_mkv52j9d",
      status: "color_mkv57bqa"
    },
    filtros: {
      gruposSelecionados: [] // Todos os grupos
    },
    visualizacao: {
      titulo: "Curva S - Projeto Workvivo",
      subtitulo: "Planejado vs Realizado",
      tipo: "acumulado", // ou "absoluto"
      unidade: "tarefas",
      mostrarLegenda: true,
      mostrarGrid: true
    },
    cores: {
      planejado: "#0073ea", // Azul Monday
      realizado: "#00c875", // Verde Monday
      desvio: "#e2445c"     // Vermelho Monday
    }
  },

  // Dados transformados prontos para o gráfico
  dadosTransformados: {
    // Grupo: Marketing e Lançamento
    grupoMarketing: [
      {
        id: "9887187014",
        nome: "Estratégia de Marketing",
        planejado: {
          inicio: new Date("2025-03-01"),
          fim: new Date("2025-03-15"),
          duracao: 14
        },
        realizado: {
          inicio: new Date("2025-03-05"),
          fim: new Date("2025-03-20"),
          duracao: 15
        },
        status: "Concluído",
        desvio: 5, // dias de atraso no início
        percentualConclusao: 100
      },
      {
        id: "9887187305",
        nome: "Criação de Conteúdo",
        planejado: {
          inicio: new Date("2025-03-10"),
          fim: new Date("2025-03-25"),
          duracao: 15
        },
        realizado: {
          inicio: new Date("2025-03-12"),
          fim: new Date("2025-03-28"),
          duracao: 16
        },
        status: "Concluído",
        desvio: 3,
        percentualConclusao: 100
      },
      {
        id: "9887187653",
        nome: "Campanha Digital",
        planejado: {
          inicio: new Date("2025-03-15"),
          fim: new Date("2025-04-01"),
          duracao: 17
        },
        realizado: {
          inicio: new Date("2025-03-18"),
          fim: new Date("2025-04-05"),
          duracao: 18
        },
        status: "Concluído",
        desvio: 4,
        percentualConclusao: 100
      },
      {
        id: "9887187973",
        nome: "Evento de Lançamento",
        planejado: {
          inicio: new Date("2025-03-25"),
          fim: new Date("2025-04-10"),
          duracao: 16
        },
        realizado: {
          inicio: new Date("2025-03-28"),
          fim: new Date("2025-04-15"),
          duracao: 18
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      }
    ],

    // Grupo: Infraestrutura e DevOps
    grupoInfra: [
      {
        id: "9887185487",
        nome: "Setup AWS Infrastructure",
        planejado: {
          inicio: new Date("2025-01-10"),
          fim: new Date("2025-01-20"),
          duracao: 10
        },
        realizado: {
          inicio: new Date("2025-01-12"),
          fim: new Date("2025-01-25"),
          duracao: 13
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887185731",
        nome: "CI/CD Pipeline",
        planejado: {
          inicio: new Date("2025-01-15"),
          fim: new Date("2025-01-30"),
          duracao: 15
        },
        realizado: {
          inicio: new Date("2025-01-18"),
          fim: new Date("2025-02-05"),
          duracao: 18
        },
        status: "Concluído",
        desvio: 6,
        percentualConclusao: 100
      },
      {
        id: "9887186109",
        nome: "Monitoramento e Logs",
        planejado: {
          inicio: new Date("2025-02-01"),
          fim: new Date("2025-02-15"),
          duracao: 14
        },
        realizado: {
          inicio: new Date("2025-02-05"),
          fim: new Date("2025-02-20"),
          duracao: 15
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887186348",
        nome: "Segurança e Backup",
        planejado: {
          inicio: new Date("2025-02-10"),
          fim: new Date("2025-02-25"),
          duracao: 15
        },
        realizado: {
          inicio: new Date("2025-02-15"),
          fim: new Date("2025-03-05"),
          duracao: 18
        },
        status: "Concluído",
        desvio: 8,
        percentualConclusao: 100
      }
    ],

    // Grupo: Group Title (Desenvolvimento)
    grupoDesenvolvimento: [
      {
        id: "9887179140",
        nome: "Definição de Requisitos",
        planejado: {
          inicio: new Date("2025-01-15"),
          fim: new Date("2025-01-25"),
          duracao: 10
        },
        realizado: {
          inicio: new Date("2025-01-15"),
          fim: new Date("2025-01-28"),
          duracao: 13
        },
        status: "Concluído",
        desvio: 3,
        percentualConclusao: 100
      },
      {
        id: "9887179714",
        nome: "Arquitetura do Sistema",
        planejado: {
          inicio: new Date("2025-01-20"),
          fim: new Date("2025-02-05"),
          duracao: 16
        },
        realizado: {
          inicio: new Date("2025-01-22"),
          fim: new Date("2025-02-08"),
          duracao: 17
        },
        status: "Concluído",
        desvio: 3,
        percentualConclusao: 100
      },
      {
        id: "9887180347",
        nome: "Design UI/UX",
        planejado: {
          inicio: new Date("2025-01-25"),
          fim: new Date("2025-02-10"),
          duracao: 16
        },
        realizado: {
          inicio: new Date("2025-01-28"),
          fim: new Date("2025-02-12"),
          duracao: 15
        },
        status: "Concluído",
        desvio: 2,
        percentualConclusao: 100
      },
      {
        id: "9887180652",
        nome: "Desenvolvimento Backend",
        planejado: {
          inicio: new Date("2025-02-01"),
          fim: new Date("2025-02-28"),
          duracao: 27
        },
        realizado: {
          inicio: new Date("2025-02-05"),
          fim: new Date("2025-03-05"),
          duracao: 28
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887180894",
        nome: "Desenvolvimento Frontend",
        planejado: {
          inicio: new Date("2025-02-10"),
          fim: new Date("2025-03-10"),
          duracao: 28
        },
        realizado: {
          inicio: new Date("2025-02-12"),
          fim: new Date("2025-03-15"),
          duracao: 31
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887181124",
        nome: "Integração APIs",
        planejado: {
          inicio: new Date("2025-02-15"),
          fim: new Date("2025-03-05"),
          duracao: 18
        },
        realizado: {
          inicio: new Date("2025-02-18"),
          fim: new Date("2025-03-08"),
          duracao: 18
        },
        status: "Concluído",
        desvio: 3,
        percentualConclusao: 100
      },
      {
        id: "9887181338",
        nome: "Testes Unitários",
        planejado: {
          inicio: new Date("2025-03-01"),
          fim: new Date("2025-03-15"),
          duracao: 14
        },
        realizado: {
          inicio: new Date("2025-03-05"),
          fim: new Date("2025-03-20"),
          duracao: 15
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887181936",
        nome: "Testes de Integração",
        planejado: {
          inicio: new Date("2025-03-10"),
          fim: new Date("2025-03-25"),
          duracao: 15
        },
        realizado: {
          inicio: new Date("2025-03-15"),
          fim: new Date("2025-03-30"),
          duracao: 15
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      },
      {
        id: "9887182222",
        nome: "Deploy e Homologação",
        planejado: {
          inicio: new Date("2025-03-20"),
          fim: new Date("2025-04-05"),
          duracao: 16
        },
        realizado: {
          inicio: new Date("2025-03-25"),
          fim: new Date("2025-04-10"),
          duracao: 16
        },
        status: "Concluído",
        desvio: 5,
        percentualConclusao: 100
      }
    ]
  },

  // Dados agregados para a Curva S
  curvaSAcumulada: {
    // Timeline completa do projeto
    inicio: new Date("2025-01-10"),
    fim: new Date("2025-04-15"),
    duracaoTotal: 95, // dias

    // Progresso acumulado (% de tarefas concluídas ao longo do tempo)
    planejado: [
      { data: new Date("2025-01-10"), valor: 0, percentual: 0 },
      { data: new Date("2025-01-15"), valor: 1, percentual: 5.88 },
      { data: new Date("2025-01-20"), valor: 2, percentual: 11.76 },
      { data: new Date("2025-01-25"), valor: 3, percentual: 17.65 },
      { data: new Date("2025-02-01"), valor: 5, percentual: 29.41 },
      { data: new Date("2025-02-10"), valor: 7, percentual: 41.18 },
      { data: new Date("2025-02-15"), valor: 8, percentual: 47.06 },
      { data: new Date("2025-02-25"), valor: 9, percentual: 52.94 },
      { data: new Date("2025-03-01"), valor: 10, percentual: 58.82 },
      { data: new Date("2025-03-05"), valor: 11, percentual: 64.71 },
      { data: new Date("2025-03-10"), valor: 13, percentual: 76.47 },
      { data: new Date("2025-03-15"), valor: 14, percentual: 82.35 },
      { data: new Date("2025-03-20"), valor: 15, percentual: 88.24 },
      { data: new Date("2025-03-25"), valor: 16, percentual: 94.12 },
      { data: new Date("2025-04-01"), valor: 16, percentual: 94.12 },
      { data: new Date("2025-04-05"), valor: 17, percentual: 100 },
      { data: new Date("2025-04-10"), valor: 17, percentual: 100 }
    ],

    realizado: [
      { data: new Date("2025-01-12"), valor: 0, percentual: 0 },
      { data: new Date("2025-01-15"), valor: 1, percentual: 5.88 },
      { data: new Date("2025-01-22"), valor: 2, percentual: 11.76 },
      { data: new Date("2025-01-28"), valor: 3, percentual: 17.65 },
      { data: new Date("2025-02-05"), valor: 5, percentual: 29.41 },
      { data: new Date("2025-02-12"), valor: 7, percentual: 41.18 },
      { data: new Date("2025-02-20"), valor: 8, percentual: 47.06 },
      { data: new Date("2025-03-05"), valor: 10, percentual: 58.82 },
      { data: new Date("2025-03-08"), valor: 11, percentual: 64.71 },
      { data: new Date("2025-03-12"), valor: 12, percentual: 70.59 },
      { data: new Date("2025-03-15"), valor: 14, percentual: 82.35 },
      { data: new Date("2025-03-20"), valor: 15, percentual: 88.24 },
      { data: new Date("2025-03-28"), valor: 16, percentual: 94.12 },
      { data: new Date("2025-03-30"), valor: 16, percentual: 94.12 },
      { data: new Date("2025-04-05"), valor: 16, percentual: 94.12 },
      { data: new Date("2025-04-10"), valor: 17, percentual: 100 },
      { data: new Date("2025-04-15"), valor: 17, percentual: 100 }
    ],

    // Métricas
    metricas: {
      totalTarefas: 17,
      tarefasConcluidas: 17,
      percentualConclusao: 100,
      desvioMedio: 4.35, // dias
      maiorDesvio: 8, // dias (Segurança e Backup)
      menorDesvio: 2, // dias (Design UI/UX)
      duracaoPlanejaData: 95,
      duracaoRealizada: 95,
      status: "Concluído com Atrasos"
    }
  },

  // Estatísticas por grupo
  estatisticasPorGrupo: {
    marketing: {
      nome: "Marketing e Lançamento",
      totalTarefas: 4,
      concluidas: 4,
      desvioMedio: 4.25,
      percentualConclusao: 100
    },
    infra: {
      nome: "Infraestrutura e DevOps",
      totalTarefas: 4,
      concluidas: 4,
      desvioMedio: 6,
      percentualConclusao: 100
    },
    desenvolvimento: {
      nome: "Desenvolvimento",
      totalTarefas: 9,
      concluidas: 9,
      desvioMedio: 4,
      percentualConclusao: 100
    }
  }
};

/**
 * Função auxiliar para gerar dados Chart.js a partir dos dados reais
 */
export const gerarDadosChartJS = () => {
  const { planejado, realizado } = dadosReaisBoard.curvaSAcumulada;

  return {
    labels: planejado.map(p => p.data.toLocaleDateString('pt-BR')),
    datasets: [
      {
        label: 'Planejado',
        data: planejado.map(p => p.percentual),
        borderColor: '#0073ea',
        backgroundColor: 'rgba(0, 115, 234, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Realizado',
        data: realizado.map(r => r.percentual),
        borderColor: '#00c875',
        backgroundColor: 'rgba(0, 200, 117, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };
};

/**
 * Configuração do Chart.js
 */
export const opcoesChartJS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          family: 'Roboto, sans-serif',
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: 'Curva S - Projeto Workvivo (Planejado vs Realizado)',
      font: {
        size: 16,
        weight: 'bold',
        family: 'Roboto, sans-serif'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Data',
        font: {
          weight: 'bold'
        }
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'Progresso (%)',
        font: {
          weight: 'bold'
        }
      },
      min: 0,
      max: 100,
      ticks: {
        callback: function(value) {
          return value + '%';
        }
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
};
