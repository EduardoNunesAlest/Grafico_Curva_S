import { useState, useEffect, useCallback } from 'react';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

/**
 * Hook para buscar dados de um board do Monday.com
 * @param {string} boardId - ID do board
 * @param {Array<string>} groupIds - IDs dos grupos para filtrar (opcional)
 */
export const useBoardData = (boardId, groupIds = []) => {
  const [boardData, setBoardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoardData = useCallback(async () => {
    console.log('='.repeat(60));
    console.log('🔍 DEBUG: Iniciando fetchBoardData');
    console.log('🆔 boardId:', boardId, '| Tipo:', typeof boardId);
    console.log('📦 groupIds:', groupIds);
    console.log('='.repeat(60));

    if (!boardId) {
      console.error('❌ ERRO CRÍTICO: boardId não fornecido!');
      setError('Board ID não fornecido');
      return;
    }

    // Validar que boardId é número
    const numericBoardId = parseInt(boardId, 10);
    if (isNaN(numericBoardId)) {
      console.error('❌ ERRO CRÍTICO: boardId não é número válido!', boardId);
      setError('Board ID inválido: ' + boardId);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const query = `
        query {
          boards(ids: [${numericBoardId}]) {
            id
            name
            groups {
              id
              title
            }
            columns {
              id
              title
              type
            }
            items_page(limit: 500) {
              cursor
              items {
                id
                name
                group {
                  id
                  title
                }
                column_values {
                  id
                  text
                  value
                  type
                }
              }
            }
          }
        }
      `;

      console.log('📤 Query GraphQL enviada:');
      console.log(query);
      console.log('🔄 Enviando requisição para Monday API...');

      const response = await monday.api(query);

      console.log('📥 Resposta completa da API:');
      console.log(JSON.stringify(response, null, 2));

      // Verificar erros GraphQL na resposta
      if (response.errors && response.errors.length > 0) {
        console.error('❌ ERROS GRAPHQL RETORNADOS:', response.errors);
        const errorMessages = response.errors.map(e => {
          console.error('  - Erro:', e.message);
          if (e.locations) {
            console.error('    Localização:', e.locations);
          }
          if (e.path) {
            console.error('    Path:', e.path);
          }
          return e.message;
        }).join('; ');
        throw new Error('GraphQL Errors: ' + errorMessages);
      }

      if (response.error_message) {
        console.error('❌ ERRO NA RESPOSTA:', response.error_message);
        throw new Error(response.error_message);
      }

      if (!response.data) {
        console.error('❌ RESPOSTA SEM DADOS!');
        console.error('Resposta completa:', response);
        throw new Error('Resposta sem dados');
      }

      if (!response.data.boards || response.data.boards.length === 0) {
        console.error('❌ BOARD NÃO ENCONTRADO!');
        console.error('Boards retornados:', response.data.boards);
        throw new Error('Board não encontrado (ID: ' + numericBoardId + ')');
      }

      let board = response.data.boards[0];
      console.log('✅ Board carregado com sucesso!');
      console.log('  - Nome:', board.name);
      console.log('  - ID:', board.id);
      console.log('  - Grupos:', board.groups?.length || 0);
      console.log('  - Colunas:', board.columns?.length || 0);
      console.log('  - Items:', board.items_page?.items?.length || 0);
      
      // Filtrar por grupos se especificado
      if (groupIds.length > 0) {
        const itemsAntes = board.items_page.items.length;
        board = {
          ...board,
          items_page: {
            items: board.items_page.items.filter(item => 
              groupIds.includes(item.group.id)
            )
          }
        };
        const itemsDepois = board.items_page.items.length;
        console.log('🔍 Filtrado por grupos:', groupIds);
        console.log('  - Items antes:', itemsAntes);
        console.log('  - Items depois:', itemsDepois);
      }

      setBoardData(board);
      console.log('✅ SUCESSO: Dados do board salvos no state');
    } catch (err) {
      console.error('❌ ERRO CAPTURADO:', err);
      console.error('📋 Tipo do erro:', err.constructor.name);
      console.error('📋 Stack trace:', err.stack);
      
      // Extrair mensagem de erro detalhada
      let errorMessage = 'Erro ao carregar dados do board';
      
      if (err.error_message) {
        errorMessage = err.error_message;
      } else if (err.errors && Array.isArray(err.errors)) {
        errorMessage = err.errors.map(e => e.message).join(', ');
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('💬 Mensagem de erro final:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('='.repeat(60));
    }
  }, [boardId, groupIds]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  return { 
    boardData, 
    loading, 
    error, 
    refetch: fetchBoardData 
  };
};
