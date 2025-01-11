import { useState, useEffect } from "react";
import ApiRb from "../../services/BackendService";

const CreatePayment = () => {
  const [formData, setFormData] = useState({
    salesperson_id: "",
    customer_name: "",
    customer_email: "",
    value: "",
    gateway_used: "mercado_pago",
    custom_commission_percent: "",
  });
  const [loading, setLoading] = useState(false);
  const [salespersons, setSalespersons] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        const response = await ApiRb.get("/shopowner/salespersons");
        setSalespersons(response.data.salespersons);
      } catch (error) {
        console.error(
          "Error fetching salespersons:",
          error.response?.data?.errors
        );
      }
    };

    fetchSalespersons();
  }, []);

  const handleFilterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors([]);

    try {
      const response = await ApiRb.post("/payments/create", {
        salesperson_id: formData.salesperson_id || null,
        customer: {
          name: formData.customer_name,
          email: formData.customer_email,
          telephone: formData.customer_telephone,
        },
        value: parseFloat(formData.value),
        gateway_used: formData.gateway_used,
        custom_commission_percent: formData.custom_commission_percent
          ? parseFloat(formData.custom_commission_percent)
          : null,
      });

      setMessage(response.data.message || "Pagamento criado com sucesso!");
    } catch (error) {
      setErrors(error.response.data.errors || ['Houve erro ao criar um pagamento']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formStyle">
        <h1 className="text-2xl font-bold">Lançar Pagamento</h1>
        {message && <p className="text-green-500">{message}</p>}
        {errors.length > 0 && (
          <ul className="text-red-600 mb-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Vendedor</label>
            <select
              name="salesperson_id"
              value={formData.salesperson_id}
              onChange={handleFilterChange}
            >
              <option value="">Sem vendedor</option>
              {salespersons.map((salesperson) => (
                <option key={salesperson.id} value={salesperson.id}>
                  {salesperson.name} ({salesperson.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Comissão Personalizada (%)</label>
            <input
              type="number"
              name="custom_commission_percent"
              value={formData.custom_commission_percent}
              onChange={handleChange}
              placeholder="Comissão Personalizada (%)"
            />
          </div>
        </div>

        <div>
          <label>Nome do Cliente</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>
        <div>
          <label>Email do Cliente</label>
          <input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <label>Telefone do Cliente</label>
          <input
            type="text"
            name="customer_telephone"
            value={formData.customer_telephone}
            onChange={handleChange}
            placeholder="Telefone"
          />
        </div>
        <div>
          <label>Valor</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="R$"
          />
        </div>

        <div>
          <label>Gateway de Pagamento</label>
          <select
            name="gateway_used"
            value={formData.gateway_used}
            onChange={handleChange}
            className="inputStyle"
          >
            <option value="mercado_pago">Mercado Pago</option>
            <option value="pagseguro">Pagseguro</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processando..." : "Salvar Pagamento"}
        </button>
      </form>
    </div>
  );
};

export default CreatePayment;
