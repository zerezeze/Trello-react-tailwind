import React, { useState } from 'react';


const TaskInput = ({ addTask }) => {
  // Estado para armazenar o conteúdo da nova tarefa
  const [taskContent, setTaskContent] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (taskContent.trim()) { 
      addTask(taskContent); 
      setTaskContent(''); 
    }
  };

  return (
    
    <form
      onSubmit={handleSubmit} 
      className="flex justify-center mb-4 mt-5" 
    >
      {}
      <input
        type="text"
        value={taskContent} // Valor controlado pelo estado taskContent
        onChange={(e) => setTaskContent(e.target.value)} // Atualiza o estado ao mudar o valor do campo
        placeholder="Nova tarefa" 
        className="p-2 border border-gray-600 rounded flex-grow max-w-xs bg-gray-800 text-white" 
      />
      {}
      <button
        type="submit" 
        className="bg-gray-700 text-white p-2 rounded ml-2 hover:bg-gray-500" 
      >
        Adicionar
      </button>
    </form>
  );
};

export default TaskInput;
