import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ApiRb from "../../services/BackendService";

const EditSalesperson = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiRb.put(`/shopowner/salespersons/${id}`, formData);
      history.push("/vendedores");
    } catch (error) {
      console.error("Erro ao editar vendedor:", error);
    }
  };

  return (
    <div>
      <h2>Editar Vendedor</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Comissão (%)</label>
          <input
            type="number"
            name="percentual_commission"
            value={formData.percentual_commission}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditSalesperson;
