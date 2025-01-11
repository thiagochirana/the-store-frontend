import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRb from "../../services/BackendService";

const HomePage = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState({
    all_total: 0,
    failed_total: 0,
    pending_total: 0,
    approved_total: 0,
    total_commission_value: 0,
    average_commission_percentage: 0,
  });

  // Função para formatar valores como moeda
  const formatToCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para formatar valores percentuais
  const formatToPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  useEffect(() => {
    if (authState.status !== "succeeded") {
      navigate("/login");
    }
  }, [authState.status, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await ApiRb.get("/shopowner");
        setDashboardData(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar dados do dashboard:",
          error.response?.data?.errors
        );
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Pagamentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Geral</h2>
          <p className="text-2xl font-bold">
            {formatToCurrency(dashboardData.all_total)}
          </p>
        </div>
        <div className="card bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Falhas</h2>
          <p className="text-2xl font-bold">
            {formatToCurrency(dashboardData.failed_total)}
          </p>
        </div>
        <div className="card bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pendentes</h2>
          <p className="text-2xl font-bold">
            {formatToCurrency(dashboardData.pending_total)}
          </p>
        </div>
        <div className="card bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Aprovados</h2>
          <p className="text-2xl font-bold">
            {formatToCurrency(dashboardData.approved_total)}
          </p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-8">Comissões</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-purple-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Comissões Totais</h2>
          <p className="text-2xl font-bold">
            {formatToCurrency(dashboardData.total_commission_value)}
          </p>
        </div>
        <div className="card bg-teal-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">
            Média % Total Estipulada nas vendas
          </h2>
          <p className="text-2xl font-bold">
            {formatToPercentage(dashboardData.average_commission_percentage)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
