import { useState, useEffect } from 'react';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

/**
 * Hook para acessar o contexto do Monday.com
 * Retorna informações sobre o usuário, board, tema, etc.
 */
export const useMondayContext = () => {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('='.repeat(60));
    console.log('🚀 DEBUG: Inicializando useMondayContext');
    console.log('📦 Monday SDK carregado:', !!monday);
    console.log('='.repeat(60));

    const fetchContext = async () => {
      try {
        setLoading(true);
        console.log('🔄 Buscando contexto do Monday.com...');
        
        const contextData = await monday.get('context');
        
        console.log('📥 Contexto recebido com sucesso!');
        console.log('📋 Contexto completo:', JSON.stringify(contextData, null, 2));
        console.log('🆔 Board ID extraído:', contextData.data?.boardId);
        console.log('🆔 Tipo do Board ID:', typeof contextData.data?.boardId);
        console.log('👤 User ID:', contextData.data?.user?.id);
        console.log('🏢 Account ID:', contextData.data?.account?.id);
        console.log('🎨 Theme:', contextData.data?.theme);
        
        // Validar que boardId existe
        if (!contextData.data?.boardId) {
          console.error('❌ AVISO: boardId não encontrado no contexto!');
          console.error('Isso pode causar "GraphQL validation errors"');
        } else {
          console.log('✅ boardId válido:', contextData.data.boardId);
        }
        
        setContext(contextData.data);
        setError(null);
        console.log('✅ Contexto salvo no state');
      } catch (err) {
        console.error('❌ ERRO ao buscar contexto do Monday:', err);
        console.error('📋 Tipo do erro:', err.constructor.name);
        console.error('📋 Stack trace:', err.stack);
        console.error('💬 Mensagem:', err.message);
        setError(err.message || 'Erro ao carregar contexto do Monday');
      } finally {
        setLoading(false);
        console.log('='.repeat(60));
      }
    };

    fetchContext();

    // Listener para mudanças de contexto
    console.log('👂 Registrando listener para mudanças de contexto...');
    const unsubscribe = monday.listen('context', (res) => {
      console.log('🔔 Contexto atualizado!');
      console.log('📋 Novo contexto:', JSON.stringify(res.data, null, 2));
      setContext(res.data);
    });

    return () => {
      console.log('🧹 Limpando listener de contexto...');
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return { context, loading, error, monday };
};
