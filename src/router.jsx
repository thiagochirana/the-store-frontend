import { Routes, Route } from "react-router-dom";
import SessionPage from "./pages/SessionPage";
import HomePage from "./pages/HomePage";
import CounterPage from "./pages/CounterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<SessionPage />} />
      <Route path="/counter" element={<CounterPage />} />
    </Routes>
  );
};

export default AppRoutes;
