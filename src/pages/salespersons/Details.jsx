import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiRb from "../../services/BackendService";

const ShowSalesperson = () => {
  const { id } = useParams();
  const [salesperson, setSalesperson] = useState(null);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        const response = await ApiRb.get(`/shopowner/salespersons/${id}`);
        setSalesperson(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      }
    };

    fetchSalesperson();
  }, [id]);

  return (
    <div>
      <h2>Detalhes do Vendedor</h2>
      {salesperson ? (
        <div>
          <p><strong>Nome:</strong> {salesperson.name}</p>
          <p><strong>Email:</strong> {salesperson.email}</p>
          <p><strong>Comissão (%):</strong> {salesperson.commission_percentage}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ShowSalesperson;
