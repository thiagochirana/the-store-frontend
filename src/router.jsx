import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/Dashboard";
import SalesMainPage from "./pages/payments/Main";
import SalesTablePage from "../src/components/payments/Table";
import SalesCreatePage from "../src/components/payments/Create";
import SalespersonMainPage from "./pages/salespersons/Main";
import SalespersonTablePage from "../src/components/salespersons/Table";
import SalespersonCreatePage from "../src/components/salespersons/Create";
import SalespersonEditPage from "../src/components/salespersons/Edit";
import SalespersonDetailsPage from "../src/components/salespersons/Details";
import ErrorMainPage from "./pages/error/Main";
import UnauthorizedPage from "./pages/error/Unauthorized";
import NotFoundPage from "./pages/error/NotFound";

import ProtectedRoute from "../src/features/roles/protecterRouter";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route
          path="pagamentos"
          element={
            <ProtectedRoute allowedRoles={["shopowner"]}>
              <SalesMainPage />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<SalesTablePage />} />
          <Route path="lancamento" element={<SalesCreatePage />} />
        </Route>

        <Route
          path="vendedores"
          element={
            <ProtectedRoute allowedRoles={["shopowner"]}>
              <SalespersonMainPage />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<SalespersonTablePage />} />
          <Route path="cadastrar" element={<SalespersonCreatePage />} />
          <Route path="editar/:id" element={<SalespersonEditPage />} />
          <Route path="mostrar/:id" element={<SalespersonDetailsPage />} />
        </Route>

        <Route path="error" element={<ErrorMainPage />}>
          <Route path="401" element={<UnauthorizedPage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
