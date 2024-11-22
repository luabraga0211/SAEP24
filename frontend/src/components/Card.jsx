import React from 'react';

const Card = ({ tarefa, buscarTarefas }) => {
  const { id_tarefa, id_usuario, descricao, nome_setor, prioridade, status } = tarefa;

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id_tarefa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        buscarTarefas();
      } else {
        console.error('Erro ao atualizar status da tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  return (
    <div className="card">
      <h3>{descricao}</h3>
      <p><strong>Setor:</strong> {nome_setor}</p>
      <p><strong>Prioridade:</strong> {prioridade}</p>
      <p><strong>Status:</strong> {status}</p>
      <div className="actions">
        {status !== 'pronto' && (
          <button onClick={() => handleStatusChange('fazendo')}>Em andamento</button>
        )}
        {status !== 'a fazer' && (
          <button onClick={() => handleStatusChange('pronto')}>Concluir</button>
        )}
      </div>
    </div>
  );
};

export default Card;