import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListColumn as ListType} from "../interfaces/listColumn";
import { Task as TaskType } from "../interfaces/task";
import { TaskCard } from "./TaskCard";

interface ListColumnProps {
    list: ListType;
    tasks: TaskType[];
    onAddTask: (title: string) => void;
    onEditTask?: (taskId: string) => void;
}

export const ListColumn: React.FC<ListColumnProps> = ({ 
    list, 
    tasks, 
    onAddTask,
    onEditTask 
}) => {
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState("");

    const submit = () => {
        if (!title.trim()) return;
        onAddTask(title.trim());
        setTitle("");
        setAdding(false);
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-sm flex flex-col">
            <div className="px-3 py-2 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">{list.name}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        {tasks.length}
                    </span>
                </div>
            </div>

            <Droppable droppableId={list.id} type="TASK" isDropDisabled={false}>
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
                {!adding ? (
                    <button 
                        onClick={() => setAdding(true)} 
                        className="w-full text-left px-2 py-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Añadir tarjeta
                    </button>
                ) : (
                    <div className="space-y-2">
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    submit();
                                }
                            }}
                            placeholder="Introduce el título de la tarjeta..."
                            className="w-full p-2 rounded border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 min-h-[60px] resize-none"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button 
                                onClick={submit} 
                                className="px-3 py-1.5 rounded bg-sky-600 text-white text-sm hover:bg-sky-700 transition-colors"
                            >
                                Añadir tarjeta
                            </button>
                            <button 
                                onClick={() => { 
                                    setAdding(false); 
                                    setTitle(''); 
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