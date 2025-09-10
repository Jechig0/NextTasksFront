import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password)
      .then((response) => {
        console.log("Login successful:", response);
        sessionStorage.setItem("token", response.token);
        navigate("/dashboard");
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
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-4">
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Entrar
        </button>
        <div className="divider">o</div>
        <Link to="/register" className="btn btn-outline btn-secondary w-full">
          Registrarse
        </Link>
      </form>
    </div>
  );
};

export default Login;
