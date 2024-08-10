import React, { useState } from 'react';

// Componente TaskInput para adicionar novas tarefas
const TaskInput = ({ addTask }) => {
  // Estado para armazenar o conteúdo da nova tarefa
  const [taskContent, setTaskContent] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    if (taskContent.trim()) { // Verifica se o conteúdo não está vazio
      addTask(taskContent); // Chama a função addTask passada por props
      setTaskContent(''); // Limpa o campo de entrada
    }
  };

  return (
    // Formulário para adicionar novas tarefas
    <form
      onSubmit={handleSubmit} // Define a função handleSubmit como handler para o envio do formulário
      className="flex justify-center mb-4 mt-5" // Estilização do formulário
    >
      {/* Campo de entrada de texto */}
      <input
        type="text"
        value={taskContent} // Valor controlado pelo estado taskContent
        onChange={(e) => setTaskContent(e.target.value)} // Atualiza o estado ao mudar o valor do campo
        placeholder="Nova tarefa" // Placeholder do campo de entrada
        className="p-2 border border-gray-600 rounded flex-grow max-w-xs bg-gray-800 text-white" // Estilização do campo de entrada
      />
      {/* Botão de envio */}
      <button
        type="submit" // Define o tipo do botão como submit
        className="bg-gray-700 text-white p-2 rounded ml-2 hover:bg-gray-500" // Estilização do botão
      >
        Adicionar
      </button>
    </form>
  );
};

export default TaskInput;
