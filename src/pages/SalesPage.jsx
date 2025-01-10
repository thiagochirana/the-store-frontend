import React, { useState, useEffect } from "react";
import ApiRb from '../services/BackendService'

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

  const fetchData = async () => {
    setLoading(true);
    try {
      // Filtra os parâmetros de acordo com os campos preenchidos
      const filterParams = Object.keys(filters).reduce((acc, key) => {
        if (filters[key]) {  // Verifica se o filtro tem valor
          acc[key] = filters[key]; // Adiciona o filtro diretamente como chave-valor
        }
        return acc;
      }, {});
  
      // Faz a requisição, passando os filtros dinâmicos corretamente
      const response = await ApiRb.get("/payments", {
        params: {
          ...filterParams,  // Envia apenas os filtros preenchidos
          page: pagination.current_page,
          per_page: pagination.per_page,
        },
      });
  
      const { payments, pagination: pag } = response.data;
      setData(payments || []); // Evita erro se `payments` for undefined
      setPagination(pag || pagination); // Garante que `pagination` nunca será undefined
    } catch (error) {
      console.error(error.response.data.errors);
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
        <input
          type="text"
          name="salesperson_id"
          value={filters.salesperson_id}
          onChange={handleFilterChange}
          placeholder="Salesperson ID"
          className="inputStyle"
        />
        <input
          type="number"
          name="min_value"
          value={filters.min_value}
          onChange={handleFilterChange}
          placeholder="Min Value"
          className="inputStyle"
        />
        <input
          type="number"
          name="max_value"
          value={filters.max_value}
          onChange={handleFilterChange}
          placeholder="Max Value"
          className="inputStyle"
        />
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
              <th>ID</th>
              <th>Salesperson</th>
              <th>Value</th>
              <th>Commission %</th>
              <th>Commission Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.salesperson_id}</td>
                <td>{payment.value}</td>
                <td>{payment.commission_percentage_on_sale}</td>
                <td>{payment.commission_value}</td>
                <td>{payment.status}</td>
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
            Previous
          </button>
          <p>
            Page {pagination.current_page} of {pagination.total_pages}
          </p>
          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="btnStyle"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Sales;
