// Interface simple para el dashboard con 6 estadísticas clave
export interface DashBoard {
    // 1. Total de tableros del usuario
    totalBoards: number;
    
    // 2. Total de tareas
    totalTasks: number;
    
    // 3. Tareas completadas
    completedTasks: number;
    
    // 4. Tareas pendientes
    pendingTasks: number;
    
    // 5. Tareas vencidas (overdue)
    overdueTasks: number;
    
    // 6. Porcentaje de productividad (tareas completadas del total)
    productivityRate: number; // 0-100
}