import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState({
    id_usuario: '',
    descricao: '',
    nome_setor: '',
    prioridade: '',
    status: '',
  });
  const [isAddingTarefa, setIsAddingTarefa] = useState(false); // Adicionando a variável isAddingTarefa

  const adicionarTarefa = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa),
      });
      if (response.ok) {
        setNovaTarefa({ id_usuario: '', descricao: '', nome_setor: '', prioridade: '', status: '' });
        buscarTarefas();
      } else {
        console.error('Erro ao adicionar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const buscarTarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas');
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <div>
      <header>
        <h1>Tarefas Kanban</h1>
        <button onClick={() => setIsAddingTarefa(true)}>Adicionar Tarefa</button>
      </header>
      <div className="dashboard">
        {tarefas.map(tarefa => (
          <Card key={tarefa.id_tarefa} tarefa={tarefa} buscarTarefas={buscarTarefas} />
        ))}
      </div>
      {isAddingTarefa && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Tarefa</h2>
            <input
              placeholder="ID Usuário"
              value={novaTarefa.id_usuario}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, id_usuario: e.target.value })}
            />
            <input
              placeholder="Descrição"
              value={novaTarefa.descricao}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
            />
            <input
              placeholder="Nome Setor"
              value={novaTarefa.nome_setor}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, nome_setor: e.target.value })}
            />
            <input
              placeholder="Prioridade"
              value={novaTarefa.prioridade}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
            />
            <input
              placeholder="Status"
              value={novaTarefa.status}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
            />
            <button onClick={adicionarTarefa}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;