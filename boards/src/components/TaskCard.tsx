import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../interfaces/task"


export const TaskCard: React.FC<{ task: Task; index: number }> = ({ task, index }) => {
return (
<Draggable draggableId={task.id} index={index}>
{(provided, snapshot) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className={`p-3 rounded-md shadow-sm bg-white mb-3 ${snapshot.isDragging ? 'opacity-90' : ''}`}
>
<div className="text-sm font-medium">{task.title}</div>
{task.description && <div className="text-xs text-gray-500 mt-1">{task.description}</div>}
</div>
)}
</Draggable>
);
};