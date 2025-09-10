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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register( formData.username, formData.email, formData.password, formData.fullName)
      .then((response) => {
        console.log("Registration successful:", response);
        localStorage.setItem("authToken", response.token);
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
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Nombre completo"
            onChange={handleChange}
            name="fullName"
            value={formData.fullName}
          />
        </div>
        <div className="form-control mb-3">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Nombre Usuario"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>
        <div className="form-control mb-3">
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Correo"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>
        <div className="form-control mb-4">
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Contraseña"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>

        <button className="btn btn-success w-full" onClick={handleSubmit}>Registrarse</button>
        <div className="divider">o</div>
        <Link to="/login" className="btn btn-outline btn-primary w-full">
          Iniciar sesión
        </Link>
      </form>
    </div>
  );
};

export default Register;
