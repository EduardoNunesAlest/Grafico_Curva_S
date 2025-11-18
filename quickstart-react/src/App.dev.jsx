import React from "react";
import { useEffect } from "react";
import "./App.css";
import "@vibe/core/tokens";
import { CurvaSView } from "./components/CurvaSView";

/**
 * Versão de desenvolvimento com mock de dados
 * Use apenas para testar UI localmente
 */

// Mock do Monday SDK para desenvolvimento
const mockMonday = {
  execute: () => Promise.resolve(),
  listen: () => {},
  get: (key) => {
    if (key === 'context') {
      return Promise.resolve({
        data: {
          boardId: '123456789', // Mock board ID
          user: { id: '1', name: 'Dev User' },
          theme: 'light'
        }
      });
    }
    return Promise.resolve({});
  },
  api: (query) => {
    // Mock de resposta da API
    return Promise.resolve({
      data: {
        boards: [{
          id: '123456789',
          name: 'Board de Teste',
          groups: [
            { id: 'group1', title: 'Fase 1', color: '#0073ea' },
            { id: 'group2', title: 'Fase 2', color: '#00d647' }
          ],
          columns: [
            { id: 'date1', title: 'Data Planejada', type: 'date' },
            { id: 'num1', title: 'Valor Planejado', type: 'numbers' },
            { id: 'date2', title: 'Data Real', type: 'date' },
            { id: 'num2', title: 'Valor Real', type: 'numbers' }
          ],
          items_page: {
            items: [
              {
                id: '1',
                name: 'Task 1',
                group: { id: 'group1', title: 'Fase 1' },
                column_values: [
                  { id: 'date1', text: '2024-01-01', value: '{"date":"2024-01-01"}', type: 'date' },
                  { id: 'num1', text: '10', value: '10', type: 'numbers' },
                  { id: 'date2', text: '2024-01-02', value: '{"date":"2024-01-02"}', type: 'date' },
                  { id: 'num2', text: '8', value: '8', type: 'numbers' }
                ]
              },
              {
                id: '2',
                name: 'Task 2',
                group: { id: 'group1', title: 'Fase 1' },
                column_values: [
                  { id: 'date1', text: '2024-01-05', value: '{"date":"2024-01-05"}', type: 'date' },
                  { id: 'num1', text: '15', value: '15', type: 'numbers' },
                  { id: 'date2', text: '2024-01-06', value: '{"date":"2024-01-06"}', type: 'date' },
                  { id: 'num2', text: '12', value: '12', type: 'numbers' }
                ]
              },
              {
                id: '3',
                name: 'Task 3',
                group: { id: 'group2', title: 'Fase 2' },
                column_values: [
                  { id: 'date1', text: '2024-01-10', value: '{"date":"2024-01-10"}', type: 'date' },
                  { id: 'num1', text: '20', value: '20', type: 'numbers' },
                  { id: 'date2', text: '2024-01-12', value: '{"date":"2024-01-12"}', type: 'date' },
                  { id: 'num2', text: '18', value: '18', type: 'numbers' }
                ]
              }
            ]
          }
        }]
      }
    });
  }
};

// Substituir monday SDK global
window.mondaySDK = () => mockMonday;

const App = () => {
  useEffect(() => {
    console.log('🔧 Modo DESENVOLVIMENTO com dados mockados');
    console.log('⚠️ Para produção, use App.jsx original');
  }, []);

  return (
    <div className="App">
      <div style={{
        background: '#fff3cd',
        padding: '10px',
        borderBottom: '2px solid #ffc107',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        🔧 MODO DESENVOLVIMENTO - Dados Mockados
      </div>
      <CurvaSView />
    </div>
  );
};

export default App;
