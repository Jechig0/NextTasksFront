import { Link } from "react-router-dom";


const LandingPage = () => {
  

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center  bg-gradient-to-br from-secondary to-accent">
      <div className="text-center p-8 bg-white/80 rounded-lg shadow-lg backdrop-blur-md">
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

        
          <div className="flex gap-4 justify-center">
            <Link to="/auth/login" className="btn btn-primary !text-white" >
              Iniciar Sesión
            </Link>
          </div>
           </div>
    </div>
  );
};

export default LandingPage;
