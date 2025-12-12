import React from "react";
import { useFetchDashBoard } from "../hooks/useFetchDashBoard";
import { Link, useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
  const { dashboard, loading, error, refetch } = useFetchDashBoard();
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Error</h3>
            <div className="text-xs">{error}</div>
          </div>
          <button onClick={refetch} className="btn btn-sm">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No hay datos del dashboard disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 flex justify-between items-center bg-base-200 rounded-2xl p-6 shadow-lg">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              Dashboard
            </h1>
            <p className="text-lg text-base-content/80 font-medium">
              Resumen de tu actividad y estadísticas
            </p>
          </div>
          
          <button
            className="btn btn-error btn-lg hover:scale-105 transition-all duration-200 shadow-lg"
            onClick={() => {
              sessionStorage.removeItem("authToken");
              window.location.reload();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {/* Total de Tableros */}
          <div className="stat bg-gradient-to-br from-primary to-primary-focus text-primary-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="stat-figure text-primary-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                className="drop-shadow-lg"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path
                    strokeDasharray="64"
                    strokeDashoffset="64"
                    d="M12 7h8c0.55 0 1 0.45 1 1v10c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-11Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.6s"
                      values="64;0"
                    />
                  </path>
                  <path d="M12 7h-9v0c0 0 0.45 0 1 0h6z" opacity="0">
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="0.6s"
                      dur="0.2s"
                      values="M12 7h-9v0c0 0 0.45 0 1 0h6z;M12 7h-9v-1c0 -0.55 0.45 -1 1 -1h6z"
                    />
                    <set
                      fill="freeze"
                      attributeName="opacity"
                      begin="0.6s"
                      to="1"
                    />
                  </path>
                </g>
              </svg>
            </div>
            <div className="stat-title text-primary-content/90 font-semibold text-lg">
              Total Tableros
            </div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.totalBoards}</div>
          </div>

          {/* Total de Tareas */}
          <div className="stat bg-gradient-to-br from-secondary to-secondary-focus text-secondary-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="stat-figure text-secondary-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                className="drop-shadow-lg"
              >
                <path
                  fill="currentColor"
                  d="M10.944 15.433L9.16 13.648q-.073-.073-.161-.11t-.18-.036t-.192.036t-.174.11q-.165.165-.165.357t.165.356l1.933 1.939q.13.13.267.184q.137.052.298.052t.298-.052t.268-.184l4.032-4.033q.146-.146.156-.35t-.156-.369t-.36-.165t-.36.165zM6.616 21q-.691 0-1.153-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3h7.213q.323 0 .628.13t.522.349L18.52 7.02q.217.218.348.522t.131.628v11.214q0 .69-.463 1.153T17.385 21zM14 7.192V4H6.616q-.231 0-.424.192T6 4.615v14.77q0 .23.192.423t.423.192h10.77q.23 0 .423-.192t.192-.424V8h-3.192q-.349 0-.578-.23T14 7.192M6 4v4zv16z"
                />
              </svg>
            </div>
            <div className="stat-title text-secondary-content/90 font-semibold text-lg">
              Total Tareas
            </div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.totalTasks}</div>
          </div>

          {/* Tareas Completadas */}
          <div className="stat bg-gradient-to-br from-success to-success-focus text-success-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="stat-figure text-success-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-12 h-12 stroke-current drop-shadow-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-success-content/90 font-semibold text-lg">Completadas</div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.completedTasks}</div>
          </div>

          {/* Tareas Pendientes */}
          <div className="stat bg-gradient-to-br from-warning to-warning-focus text-warning-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="stat-figure text-warning-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-12 h-12 stroke-current drop-shadow-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-warning-content/90 font-semibold text-lg">Pendientes</div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.pendingTasks}</div>
          </div>

          {/* Tareas Vencidas */}
          <div className="stat bg-gradient-to-br from-error to-error-focus text-error-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="stat-figure text-error-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-12 h-12 stroke-current drop-shadow-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-error-content/90 font-semibold text-lg">Vencidas</div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.overdueTasks}</div>
          </div>

          {/* Productividad */}
          <div className="stat bg-gradient-to-br from-accent to-accent-focus text-accent-content rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:col-span-2 xl:col-span-1">
            <div className="stat-figure text-accent-content opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-12 h-12 stroke-current drop-shadow-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-accent-content/90 font-semibold text-lg">Productividad</div>
            <div className="stat-value text-4xl font-bold drop-shadow-md">{dashboard.productivityRate}%</div>
            <div className="stat-desc text-accent-content/90 mt-3">
              <progress
                className="progress progress-accent-content w-full h-3 shadow-inner"
                value={dashboard.productivityRate}
                max="100"
              ></progress>
            </div>
          </div>
        </div>

        {/* Sección de acciones */}
        <div className="flex justify-center">
          <div className="bg-base-200 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-base-content mb-2">¿Listo para ser productivo?</h2>
              <p className="text-base-content/70">Gestiona tus tableros y tareas de manera eficiente</p>
            </div>
            <Link 
              to="/boards" 
              className="btn btn-accent btn-lg hover:scale-105 transition-all duration-200 shadow-lg group flex justify-center "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Ir a los Tableros
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
