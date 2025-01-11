import { useState, useEffect } from "react";
import ApiRb from "../../services/BackendService";
import { Link } from "react-router-dom"; // Importa o Link para navegação

const Salespersons = () => {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 8,
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

      const response = await ApiRb.get(
        `/shopowner/salespersons?${params.toString()}`
      );
      // Verifica se a resposta é um array vazio ou um objeto com a estrutura esperada
      if (Array.isArray(response.data)) {
        setData([]);
        setPagination({
          current_page: 1,
          per_page: 10,
          total_pages: 1,
          total_records: 0,
        });
      } else {
        setData(response.data.salespersons || []);
        setPagination(
          response.data.pagination || {
            current_page: 1,
            per_page: 10,
            total_pages: 1,
            total_records: 0,
          }
        );
      }
    } catch (error) {
      console.error(error.response?.data?.errors);
      setData([]);
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

  const formatToPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Vendedores</h1>

      {/* Filtros */}
      <div className="filterStyle">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          placeholder="Email"
        />

        <button onClick={handleSearch} className="btnStyle">
          Buscar
        </button>
      </div>

      {/* Tabela */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="tableStyle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Comissão (%)</th>
              <th>Ações</th> {/* Coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            {data.map((salesperson) => (
              <tr key={salesperson.id}>
                <td>{salesperson.id}</td>
                <td>{salesperson.name}</td>
                <td>{salesperson.email}</td>
                <td>{formatToPercentage(salesperson.commission_percentage)}</td>
                <td>
                  {/* Ações: Links para detalhes e edição */}
                  <Link
                    to={`/vendedores/mostrar/${salesperson.id}`} // Rota para mostrar detalhes
                    className="btnAction info"
                  >
                    Detalhes
                  </Link>
                  <Link
                    to={`/vendedores/editar/${salesperson.id}`} // Rota para editar
                    className="btnAction warn"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginação */}
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

export default Salespersons;
