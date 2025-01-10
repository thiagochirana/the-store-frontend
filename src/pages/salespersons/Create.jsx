import { useState } from "react";
import ApiRb from "../../services/BackendService"

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
  
      if (response.status === 201) { // HTTP 201 Created
        setMessage(response.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          percentual_commission: "",
        });
      } else {
        setMessage(response.data.errors || ["Erro desconhecido"]);
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
      <h1 className="text-2xl font-bold mb-4">Cadastrar Vendedor</h1>
      {message && <div className="text-green-600 mb-4">{message}</div>}
      {errors.length > 0 && (
        <ul className="text-red-600 mb-4">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-bold" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label
            className="block mb-1 font-bold"
            htmlFor="password_confirmation"
          >
            Confirmação de Senha
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label
            className="block mb-1 font-bold"
            htmlFor="percentual_commission"
          >
            Comissão (%)
          </label>
          <input
            type="number"
            id="percentual_commission"
            name="percentual_commission"
            value={formData.percentual_commission}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
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
