import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="pt-1 flex-1 w-full bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout };
