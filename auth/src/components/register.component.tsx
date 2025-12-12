import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/Auth.service";

const Register = () => {


    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const getRuta: () => string = () => {
    return window.location.port === "8082" ? "/login" : "/auth/login";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register( formData.username, formData.email, formData.password, formData.fullName)
      .then((response) => {
        console.log("Registration successful:", response);
        sessionStorage.setItem("authToken", response.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-accent">
      <form className="card w-96 bg-base-100 shadow-2xl p-8 border-2 border-secondary/40">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold text-secondary">Registro</h2>
        </div>
        <div className="form-control mb-4">
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.214 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    type="text"
                    className="grow"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                    name="fullName"
                    value={formData.fullName}
                />
            </label>
        </div>
        <div className="form-control mb-3">
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.214 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    type="text"
                    className="grow"
                    placeholder="Nombre Usuario"
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                />
            </label>
        </div>
        <div className="form-control mb-3">
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                    type="email"
                    className="grow"
                    placeholder="Correo"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                />
            </label>
        </div>
        <div className="form-control mb-4">
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                </svg>
                <input
                    type="password"
                    className="grow"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                />
            </label>
        </div>

        <button className="btn btn-success w-full" onClick={handleSubmit}>Registrarse</button>
        <div className="divider">o</div>
        <Link to={getRuta()} className="btn btn-outline btn-primary w-full">
          Iniciar sesión
        </Link>
      </form>
    </div>
  );
};

export default Register;
