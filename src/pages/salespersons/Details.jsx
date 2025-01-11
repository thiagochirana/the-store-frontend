import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiRb from "../../services/BackendService";

const ShowSalesperson = () => {
  const { id } = useParams();
  const [salesperson, setSalesperson] = useState(null);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        const response = await ApiRb.get(`/shopowner/salespersons/about`, { user_id: id});
        setSalesperson(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      }
    };

    fetchSalesperson();
  }, [id]);

  return (
<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Detalhes do Vendedor
      </h2>
      
      {salesperson ? (
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500 mb-1">Nome</p>
            <p className="text-lg text-gray-800">{salesperson.name}</p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-lg text-gray-800 break-all">{salesperson.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Comissão</p>
            <p className="text-lg text-gray-800">
              {salesperson.commission_percentage}%
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default ShowSalesperson;
