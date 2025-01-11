import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiRb from "../../services/BackendService";

const EditSalesperson = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    percentual_commission: "",
  });

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        const response = await ApiRb.get(`/shopowner/salespersons/about`, {
          user_id: id,
        });
        setFormData({
          user_id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          percentual_commission: response.data.commission_percentage,
        });
      } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
      }
    };

    fetchSalesperson();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "percentual_commission") {
      setFormData({ ...formData, [name]: (value < 0 ? 0 : value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await ApiRb.put(
        `/shopowner/salespersons/update`,
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.errors || ["Erro desconhecido"]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formStyle">
        <h1 className="text-2xl font-bold mb-4">Editar Vendedor</h1>
        {message && <div className="text-green-600 mb-4">{message}</div>}
        <input type="hidden" name="user_id" value={formData.user_id}></input>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comissão %</label>
          <input
            type="number"
            name="percentual_commission"
            value={formData.percentual_commission}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
        <a href="/vendedores" className="w-full text-green-500">
          Voltar
        </a>
      </form>
    </div>
  );
};

export default EditSalesperson;
