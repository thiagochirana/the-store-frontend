import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout"; // Importando o Layout Comum
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/Dashboard";
import CounterPage from "./pages/CounterPage";
import SalesMainPage from "./pages/payments/Main";
import SalesTablePage from "./pages/payments/Table";
import SalesCreatePage from "./pages/payments/Create";
import SalespersonMainPage from "./pages/salespersons/Main";
import SalespersonTablePage from "./pages/salespersons/Table";
import SalespersonCreatePage from "./pages/salespersons/Create";
import SalespersonEditPage from "./pages/salespersons/Edit";
import SalespersonDetailsPage from "./pages/salespersons/Details";
import ErrorMainPage from "./pages/error/Main"
import UnauthorizedPage from "./pages/error/Unauthorized";
import NotFoundPage from "./pages/error/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Defina uma rota para o Layout que será usada por todas as páginas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="counter" element={<CounterPage />} />
        <Route path="pagamentos" element={<SalesMainPage />}>
          <Route path="" element={<SalesTablePage />} />
          <Route path="lancamento" element={<SalesCreatePage />} />
        </Route>
        <Route path="vendedores" element={<SalespersonMainPage />}>
          <Route path="" element={<SalespersonTablePage />} />
          <Route path="cadastrar" element={<SalespersonCreatePage />} />
          <Route path="editar/:id" element={<SalespersonEditPage />} />
          <Route path="mostrar/:id" element={<SalespersonDetailsPage />} />
        </Route>
        <Route path="error" element={<ErrorMainPage/>}>
          <Route path="401" element={<UnauthorizedPage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
