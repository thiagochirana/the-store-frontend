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
  });
  const [data, setData] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_pages: 1,
    total_records: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [pagination.current_page, pagination.per_page]);

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

  const handleSearch = () => {
    setPagination({ ...pagination, current_page: 1 }); // Reinicia a página para 1 ao aplicar filtro
    fetchData();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination({ ...pagination, current_page: newPage });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Payments</h1>

      {/* Filters */}
      <div className="mb-4">
        <select
          name="salesperson_id"
          value={filters.salesperson_id}
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
        <input
          type="number"
          name="min_value"
          value={filters.min_value}
          onChange={handleFilterChange}
          placeholder="Valor min."
          className="inputStyle"
        />
        <input
          type="number"
          name="max_value"
          value={filters.max_value}
          onChange={handleFilterChange}
          placeholder="Valor máx."
          className="inputStyle"
        />
        <input
          type="number"
          name="min_commission_percentage"
          value={filters.min_commission_percentage}
          onChange={handleFilterChange}
          placeholder="Min Comissão %"
          className="inputStyle"
        />
        <input
          type="number"
          name="max_commission_percentage"
          value={filters.max_commission_percentage}
          onChange={handleFilterChange}
          placeholder="Max Comissão %"
          className="inputStyle"
        />
        <input
          type="number"
          name="min_commission_value"
          value={filters.min_commission_value}
          onChange={handleFilterChange}
          placeholder="Min valor de Comissão"
          className="inputStyle"
        />
        <input
          type="number"
          name="max_commission_value"
          value={filters.max_commission_value}
          onChange={handleFilterChange}
          placeholder="Max valor de Comissão"
          className="inputStyle"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="inputStyle"
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
          className="inputStyle"
        >
          <option value="">Todos os gateways</option>
          <option value="mercado_pago">Mercado Pago</option>
          <option value="pagseguro">Pagseguro</option>
        </select>

        <button onClick={handleSearch} className="btnStyle">
          Search
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Status</th>
              <th>Venda ID</th>
              <th>Salesperson</th>
              <th>Gateway</th>
              <th>R$</th>
              <th>Commissão %</th>
              <th>Comissão R$</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment.id}>
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
                <td>{payment.id}</td>
                <td>{payment.salesperson_id}</td>
                <td>
                  {payment.gateway_used == "mercado_pago"
                    ? "Mercado Pago"
                    : "PagSeguro"}
                </td>
                <td>{payment.value}</td>
                <td>{payment.commission_percentage_on_sale}</td>
                <td>{payment.commission_value}</td>
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
    </div>
  );
};

export default Sales;
