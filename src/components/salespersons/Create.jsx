import { useState } from "react";
import ApiRb from "../../services/BackendService";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    percentual_commission: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage("");

    try {
      const response = await ApiRb.post("/shopowner/salespersons", formData);

      if (response.status === 201) {
        // HTTP 201 Created
        setMessage(response.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          percentual_commission: "",
        });
      } else {
        setErrors(response.data.errors || ["Erro desconhecido"]);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Erro de conexão com o servidor."]);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="formStyle">
        <h1 className="text-2xl font-bold ">Cadastrar Vendedor</h1>

        {message && <div className="text-green-600">{message}</div>}
        {errors.length > 0 && (
          <ul className="text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirmação de Senha</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="percentual_commission">Comissão (%)</label>
          <input
            type="number"
            id="percentual_commission"
            name="percentual_commission"
            value={formData.percentual_commission}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Create;
