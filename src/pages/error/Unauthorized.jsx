import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página.
        </p>
        <button onClick={handleGoBack} className="px-4 py-2 text-green-500">
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
