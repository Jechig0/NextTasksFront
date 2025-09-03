import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="min-h-screen bg-base-200 flex items-center justify-center">
    <div className="text-center p-8">
      <div className="avatar mb-6">
        <div className="w-24 rounded">
          <img 
            src="/generated_image.png" 
            alt="NextTasks" 
          />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-primary mb-4">
        NextTasks
      </h1>
      
      <p className="text-lg text-base-content/70 mb-8">
        Gestiona tus tareas de manera eficiente
      </p>

      <Link
        to="/dashboard"
        className="btn btn-primary"
      >
        Iniciar Sesión
      </Link>
    </div>
  </div>
);

export default LandingPage;
