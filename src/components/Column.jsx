import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';


const Column = ({ tasks, status, onEdit, onDelete }) => {
  return (
    // Componente Droppable define uma área onde itens podem ser soltos
    <Droppable droppableId={status}>
      {(provided) => (
        // Elemento que representa a área droppable
        <div
          ref={provided.innerRef} // Referência para o elemento droppable
          {...provided.droppableProps} 
          className="bg-gray-800 text-white p-4 rounded w-full max-w-xs min-h-[375px] flex flex-col" 
        >
          {}
          <div className="pb-4">
            <h2 className="font-bold text-lg capitalize text-center">{status}</h2>
          </div>
          {}
          <div className="flex-1 overflow-y-auto">
            {}
            {tasks.map((task, index) => (
              
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  
                  <div
                    ref={provided.innerRef} // Referência para o elemento draggable
                    {...provided.draggableProps} // Props necessárias para o funcionamento do drag-and-drop
                    {...provided.dragHandleProps} // Props para o handle de arrasto
                    className="bg-gray-900 text-white p-4 mb-2 rounded shadow flex items-start" 
                  >
                    {}
                    <img
                      src={task.profileImage} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    {}
                    <div className="flex-1">
                      <p className="mb-1 break-words overflow-hidden text-ellipsis">{task.content}</p> {}
                      <p className="text-sm text-gray-400 break-words overflow-hidden text-ellipsis">{task.date} {task.time}</p> {}
                    </div>
                    {/* Botões de ação */}
                    <div className="flex flex-col items-center ml-4">
                      <button 
                        onClick={() => onEdit(task.id)} 
                        className="text-gray-300 hover:text-gray-100 mb-1 mt-2"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDelete(task.id)} 
                        className="text-red-400 hover:text-red-300"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* Placeholder para manter o espaço quando uma tarefa é arrastada */}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
