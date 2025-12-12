import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const getRuta: () => string = () => {
    return window.location.port === "8082" ? "/register" : "/auth/register";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password)
      .then((response) => {
        console.log("Login successful:", response);
        sessionStorage.setItem("authToken", response.token);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary">
      <form className="card w-96 bg-base-100 shadow-2xl p-8 border-2 border-primary/40">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold text-primary">Iniciar sesión</h2>
        </div>
        <div className="form-control mb-3">
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.214 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    type="text"
                    className="grow"
                    placeholder="Usuario"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Entrar
        </button>
        <div className="divider">o</div>
        <Link to={getRuta()} className="btn btn-outline btn-secondary w-full">
          Registrarse
        </Link>
      </form>
    </div>
  );
};

export default Login;
