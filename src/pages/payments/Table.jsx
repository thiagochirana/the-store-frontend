import { useState, useEffect } from "react";
import ApiRb from "../../services/BackendService";

const Sales = () => {
  const [filters, setFilters] = useState({
    salesperson_id: "",
    min_value: "",
    max_value: "",
    min_commission_percentage: "",
    max_commission_percentage: "",
    min_commission_value: "",
    max_commission_value: "",
    status: "",
    start_date: "",
    end_date: "",
  });
  const [data, setData] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 8,
    total_pages: 1,
    total_records: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, [pagination.current_page, pagination.per_page, filters]);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const filterParams = Object.keys(filters).reduce((acc, key) => {
        if (filters[key]) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});

      const params = new URLSearchParams({
        ...filterParams,
        page: pagination.current_page,
        per_page: pagination.per_page,
      });

      const response = await ApiRb.get(`/payments?${params.toString()}`);
      const { payments, pagination: pag } = response.data;

      setData(payments || []);
      setPagination(pag || pagination);
    } catch (error) {
      console.error(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePagination = (e) => {
    const value = e.target.value;

    setPagination((prevPagination) => ({
      ...prevPagination,
      per_page: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination({ ...pagination, current_page: newPage });
    }
  };

  const handleShowModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const toggleAdditionalFilters = () => {
    setShowAdditionalFilters(!showAdditionalFilters);
  };

  const formatToCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatToPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Pagamentos</h1>

      {/* Filters */}
      <div className="filterStyle">
        {/* Filtros que sempre aparecem */}
        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          placeholder="Data Inicial"
          onChange={handleFilterChange}
        />

        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          placeholder="Data Final"
          onChange={handleFilterChange}
        />

        <select
          name="salesperson_id"
          value={filters.salesperson_id}
          onChange={handleFilterChange}
        >
          <option value="">Sem vendedor</option>
          {salespersons.map((salesperson) => (
            <option key={salesperson.id} value={salesperson.id}>
              {salesperson.name} ({salesperson.id})
            </option>
          ))}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">Todos os Status</option>
          <option value="failed">Falhos</option>
          <option value="approved">Aprovados</option>
          <option value="pending">Pendente de Pagamento</option>
        </select>

        <select
          name="gateway_used"
          value={filters.gateway_used}
          onChange={handleFilterChange}
        >
          <option value="">Todos os gateways</option>
          <option value="mercado_pago">Mercado Pago</option>
          <option value="pagseguro">Pagseguro</option>
        </select>

        {/* Botão para alternar a exibição dos filtros adicionais */}
        <button
          type="button"
          onClick={toggleAdditionalFilters}
          className="btnStyleNoBg"
        >
          {showAdditionalFilters ? "Menos filtros" : "Mais filtros"}
        </button>

        {/* Filtros adicionais */}
        {showAdditionalFilters && (
          <>
            <input
              type="number"
              name="min_value"
              value={filters.min_value}
              onChange={handleFilterChange}
              placeholder="Valor min."
            />

            <input
              type="number"
              name="max_value"
              value={filters.max_value}
              onChange={handleFilterChange}
              placeholder="Valor máx."
            />

            <input
              type="number"
              name="min_commission_percentage"
              value={filters.min_commission_percentage}
              onChange={handleFilterChange}
              placeholder="Min Comissão %"
            />

            <input
              type="number"
              name="max_commission_percentage"
              value={filters.max_commission_percentage}
              onChange={handleFilterChange}
              placeholder="Max Comissão %"
            />

            <input
              type="number"
              name="min_commission_value"
              value={filters.min_commission_value}
              onChange={handleFilterChange}
              placeholder="Min valor de Comissão"
            />

            <input
              type="number"
              name="max_commission_value"
              value={filters.max_commission_value}
              onChange={handleFilterChange}
              placeholder="Max valor de Comissão"
            />

            <input
              type="number"
              name="per_page"
              value={pagination.per_page || ""}
              onChange={handlePagination}
              placeholder="Resultados por página"
            />
          </>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Pagamento ID</th>
              <th>Status</th>
              <th>Vendedor</th>
              <th>Gateway Utilizado</th>
              <th>R$ Valor</th>
              <th>Commissão %</th>
              <th>Comissão R$</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded ${
                      payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : payment.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status === "pending"
                      ? "Pendente"
                      : payment.status === "approved"
                      ? "Aprovado"
                      : "Falhou"}
                  </span>
                </td>
                <td>{payment.salesperson_id}</td>
                <td>
                  {payment.gateway_used == "mercado_pago"
                    ? "Mercado Pago"
                    : "PagSeguro"}
                </td>
                <td>{formatToCurrency(payment.value)}</td>
                <td>{formatToPercentage(payment.commission_percentage_on_sale)}</td>
                <td>{formatToCurrency(payment.commission_value)}</td>
                <td>
                  <button
                    onClick={() => handleShowModal(payment.customer)}
                    className="underline hover:text-green-400 transition duration-150"
                  >
                    {payment.customer.name}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="btnStyle"
          >
            Anterior
          </button>
          <p>
            Página {pagination.current_page} de {pagination.total_pages}
          </p>
          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="btnStyle"
          >
            Próximo
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Detalhes do Cliente</h2>
            <p>
              <strong>Nome:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Telefone:</strong> {selectedCustomer.telephone}
            </p>
            <button onClick={handleCloseModal} className="btnStyle mt-4">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
