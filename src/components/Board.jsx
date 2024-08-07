import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskInput from './TaskInput';
import Column from './Column';
import profileImage from '../assets/ze.jpeg'; // Ajuste o caminho para a imagem

const initialData = {
  backlog: [],
  todo: [],
  inProgress: [],
  done: [],
};

const Board = () => {
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialData;
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = Array.from(start);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: updatedTasks,
      }));
    } else {
      const startTasks = Array.from(start);
      const [movedTask] = startTasks.splice(source.index, 1);
      const finishTasks = Array.from(finish);
      finishTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      }));
    }
  };

  const addTask = (content) => {
    const newTask = {
      id: `task-${Date.now()}`,
      content,
      profileImage,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setTasks((prev) => ({
      ...prev,
      backlog: [...prev.backlog, newTask],
    }));
  };

  const handleEditTask = (id) => {
    const taskToEdit = Object.values(tasks).flat().find(task => task.id === id);
    if (taskToEdit) {
      setEditingTaskId(id);
      setEditContent(taskToEdit.content);
    }
  };

  const handleSaveEdit = () => {
    setTasks((prev) => {
      const updatedTasks = Object.keys(prev).reduce((acc, key) => {
        acc[key] = prev[key].map(task =>
          task.id === editingTaskId ? { ...task, content: editContent } : task
        );
        return acc;
      }, {});
      return updatedTasks;
    });
    setEditingTaskId(null);
    setEditContent('');
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => {
      const updatedTasks = Object.keys(prev).reduce((acc, key) => {
        acc[key] = prev[key].filter(task => task.id !== id);
        return acc;
      }, {});
      return updatedTasks;
    });
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 bg-gray-900 text-white min-h-screen">
      <TaskInput addTask={addTask} />
      {editingTaskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-gray-700 text-white p-4 rounded shadow">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="border border-gray-600 p-2 rounded w-full bg-gray-800 text-white"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-blue-600 text-white p-2 rounded mt-2"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full max-w-screen-xl">
          {Object.keys(tasks).map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks[status]}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
