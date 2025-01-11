import { useState, useEffect } from "react";
import ApiRb from "../../services/BackendService";

const CreatePayment = () => {
  const [formData, setFormData] = useState({
    salesperson_id: "",
    customer_name: "",
    customer_email: "",
    value: "",
    gateway_used: "",
    custom_commission_percent: "",
  });
  const [loading, setLoading] = useState(false);
  const [salespersons, setSalespersons] = useState([]);
  const [message, setMessage] = useState("");

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
      setMessage(
        error.response?.data?.errors?.join(", ") || "Erro ao criar pagamento."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Pagamento</h1>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">ID do Vendedor</label>
          <select
            name="salesperson_id"
            value={formData.salesperson_id}
            onChange={handleFilterChange}
            className="inputStyle"
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
          <label className="block font-medium mb-1">Nome do Cliente</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Nome do Cliente"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email do Cliente</label>
          <input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            placeholder="Email do Cliente"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Telefone do Cliente</label>
          <input
            type="text"
            name="customer_telephone"
            value={formData.customer_telephone}
            onChange={handleChange}
            placeholder="Telefone"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Valor</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="Valor da Venda"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Comissão Personalizada (%)
          </label>
          <input
            type="number"
            name="custom_commission_percent"
            value={formData.custom_commission_percent}
            onChange={handleChange}
            placeholder="Comissão Personalizada (%)"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
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
