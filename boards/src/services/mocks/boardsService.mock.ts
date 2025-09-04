// import { Board } from "../../interfaces/board";

// Unas cuantas fechas simuladas
// const now = new Date().toISOString();
// const yesterday = new Date(Date.now() - 86400000).toISOString();

// Datos de ejemplo
// let mockBoards: Board[] = [
//   {
//     id: "1",
//     name: "Proyecto Frontend",
//     description: "Tareas relacionadas con la UI y microfrontends",
//     createdAt: yesterday,
//     updatedAt: now,
//   },
//   {
//     id: "2",
//     name: "Proyecto Backend",
//     description: "Endpoints y microservicios en Spring Boot",
//     createdAt: yesterday,
//     updatedAt: now,
//   },
//   {
//     id: "3",
//     name: "Ideas futuras",
//     description: "Tablero para brainstorming y features",
//     createdAt: now,
//   },
// ];

// Simula la latencia de red
// function delay(ms: number) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// export async function fetchBoardsMock(): Promise<Board[]> {
//   await delay(500); // simula 0.5s de red
//   return [...mockBoards];
// }

// export async function createBoardMock(payload: { name: string; description?: string }): Promise<Board> {
//   await delay(300);
//   const newBoard: Board = {
//     id: (mockBoards.length + 1).toString(),
//     name: payload.name,
//     description: payload.description,
//     createdAt: new Date().toISOString(),
//   };
//   mockBoards = [newBoard, ...mockBoards];
//   return newBoard;
// }
