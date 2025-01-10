// src/components/Layout.jsx
import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Header />
        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout };
