import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Column } from "../interfaces/column";
import { Task } from "../interfaces/task";
import { TaskCard } from "./TaskCard";
import { createTask, fetchTasks } from "../services/boardsService";

interface ListColumnProps {
    list: Column;
    onEditTask?: (taskId: number) => void;
}

export const ListColumn: React.FC<ListColumnProps> = ({ 
    list,
    onEditTask 
}) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]); // Esto debería venir de un estado global o prop
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            const loadListData = async () => {
                try {
                    setLoading(true);
                    const tasksData = await fetchTasks(list.id);
                    setTasks(tasksData);
                } catch (error) {
                    console.error('Error loading board data:', error);
                } finally {
                    setLoading(false);
                }
            };
            
            loadListData();
        }, [list.id]);

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            //Aquí deberías hacer la llamada al API para crear la tarea
            const newTask = await createTask(newTaskTitle.trim(),{            
                id: list.id
            });
            setTasks([...tasks, newTask]);
            setNewTaskTitle("");
            setIsAddingTask(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-sm flex flex-col">
            <div className="px-3 py-2 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">{list.name}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        {tasks.length || 0}
                    </span>
                </div>
            </div>

            <Droppable droppableId={list.id.toString()} type="TASK">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[100px] p-2 ${
                            snapshot.isDraggingOver 
                                ? 'bg-sky-50/80 transition-colors duration-200' 
                                : 'bg-gray-50/50'
                        }`}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard 
                                key={task.id} 
                                task={task} 
                                index={index}
                                onEdit={() => onEditTask?.(task.id)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className="p-2 bg-gray-50 rounded-b-lg">
                {!isAddingTask ? (
                    <button 
                        onClick={() => setIsAddingTask(true)} 
                        className="w-full text-left px-2 py-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Añadir
                    </button>
                ) : (
                    <div className="space-y-2">
                        <textarea
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddTask();
                                }
                            }}
                            placeholder="Titulo"
                            className="w-full p-2 rounded border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 min-h-[60px] resize-none"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button 
                                onClick={handleAddTask} 
                                className="px-3 py-1.5 rounded bg-sky-600 text-white text-sm hover:bg-sky-700 transition-colors"
                            >
                                Guardar
                            </button>
                            <button 
                                onClick={() => { 
                                    setIsAddingTask(false); 
                                    setNewTaskTitle(''); 
                                }} 
                                className="px-3 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};