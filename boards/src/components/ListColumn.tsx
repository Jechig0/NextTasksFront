import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListColumn as ListType} from "../interfaces/listColumn";
import { Task as TaskType } from "../interfaces/task";
import { TaskCard } from "./TaskCard";


export const ListColumn: React.FC<{
list: ListType;
tasks: TaskType[];
onAddTask: (title: string) => void;
}> = ({ list, tasks, onAddTask }) => {
const [adding, setAdding] = useState(false);
const [title, setTitle] = useState("");


const submit = () => {
if (!title.trim()) return;
onAddTask(title.trim());
setTitle("");
setAdding(false);
};


return (
<div className="w-80 bg-gray-100 rounded p-3">
    <div className="flex justify-between items-center mb-3">
    <h3 className="font-semibold">{list.name}</h3>
    <span className="text-xs text-gray-500">{tasks.length}</span>
    </div>

<Droppable droppableId={list.id} type="TASK">
{(provided, snapshot) => (
<div
ref={provided.innerRef}
{...provided.droppableProps}
className={`min-h-[100px] ${snapshot.isDraggingOver ? 'bg-sky-50' : ''} p-1 rounded`}
>
{tasks.map((t, idx) => (
<TaskCard key={t.id} task={t} index={idx} />
))}
{provided.placeholder}
</div>
)}
</Droppable>


<div className="mt-3">
{!adding ? (
<button onClick={() => setAdding(true)} className="text-sm text-sky-700">+ Añadir tarjeta</button>
) : (
<div>
<input
value={title}
onChange={(e) => setTitle(e.target.value)}
onKeyDown={(e) => e.key === 'Enter' && submit()}
placeholder="Título de la tarjeta"
className="w-full p-2 rounded border"
/>
<div className="flex gap-2 mt-2">
<button onClick={submit} className="px-2 py-1 rounded bg-sky-600 text-white text-sm">Añadir</button>
<button onClick={() => { setAdding(false); setTitle(''); }} className="px-2 py-1 rounded border text-sm">Cancelar</button>
</div>
</div>
)}
</div>
</div>
);
};