import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout"; // Importando o Layout Comum
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CounterPage from "./pages/CounterPage";
import SalesPage from "./pages/SalesPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Defina uma rota para o Layout que será usada por todas as páginas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> {/* Página inicial */}
        <Route path="login" element={<LoginPage />} />
        <Route path="counter" element={<CounterPage />} />
        <Route path="vendas" element={<SalesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
