import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../interfaces/task"


interface TaskCardProps {
    task: Task;
    index: number;
    onEdit?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit }) => {
    if(!task) return null;
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 mb-2 bg-white rounded-lg shadow-sm ${
                        snapshot.isDragging ? 'shadow-md rotate-3' : ''
                    }`}
                >
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">{task.title}</p>
                        </div>
                        <button
                            onClick={onEdit}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Editar tarea"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};