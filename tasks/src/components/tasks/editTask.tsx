import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TaskRequest } from "../../interfaces/task.interface";
import { updateTask } from "../../services/Task.service";
import { useFetchTask } from "../../hooks/useFetchTask";

interface EditTaskProps {}

const EditTask: React.FC<EditTaskProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = id ? parseInt(id) : 0;

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [priority, setPriority] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  // Hook para obtener datos
  const { task, loading: loadingTask, error: taskError } = useFetchTask(taskId);

  // Efecto para cargar los datos de la tarea al componente
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      // Convertir la fecha al formato requerido por el input date
      setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es requerido");
      return;
    }

    if (!dueDate) {
      setError("La fecha de vencimiento es requerida");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const taskData: TaskRequest = {
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate).toISOString(),
        priority,
        boardId: task?.board.id || 1, // Usar el board actual de la tarea
      };

      await updateTask(taskId, taskData);
      navigate(`/details/${taskId}`); // Navegar a los detalles de la tarea
    } catch (err: any) {
      setError(err.message || "Error al actualizar la tarea");
      console.error("Error updating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Loading state
  if (loadingTask) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-md"></span>
        <span className="ml-2">Cargando tarea...</span>
      </div>
    );
  }

  // Error state
  if (taskError) {
    return (
      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <div className="alert alert-error">
            <span>{taskError}</span>
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleCancel} className="btn btn-ghost">
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">Editar Tarea</h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Título *</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingrese el título de la tarea"
              className="input input-bordered w-full"
              maxLength={200}
              required
              autoFocus
            />
          </div>

          {/* Descripción */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Descripción</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la tarea (opcional)"
              className="textarea textarea-bordered w-full h-24 resize-none"
              maxLength={1000}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha de vencimiento */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Fecha de vencimiento *
                </span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input input-bordered w-full"
                required
                min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Fecha de finalización
                </span>
              </label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="input input-bordered w-full"
                min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
              />
            </div>

            {/* Prioridad */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Prioridad</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="select select-bordered w-full"
              >
                <option value={1}>Baja</option>
                <option value={2}>Media</option>
                <option value={3}>Alta</option>
                <option value={4}>Urgente</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="card-actions justify-between pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !dueDate || isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Actualizando...
                </>
              ) : (
                "Actualizar Tarea"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
