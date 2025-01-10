import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useSelector((state) => state.auth);

  if (!authState.access_token) {
    return null;
  }

  return (
    <header className="bg-green-500 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-10 h-10 rounded-full mr-3"
          />
          <a href="/" className="text-lg sm:text-xl font-bold">
            The Store
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/vendas" className="navLink">
            Vendas
          </a>
          <a href="/vendedores" className="navLink">
            Vendedores
          </a>
          <a href="/perfil" className="navLink">
            Seu Perfil
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-green-600">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a
                href="/vendas"
                className="block text-white hover:text-blue-200 transition duration-200"
              >
                Vendas
              </a>
            </li>
            <li>
              <a
                href="/vendedores"
                className="block text-white hover:text-blue-200 transition duration-200"
              >
                Vendedores
              </a>
            </li>
            <li>
              <a
                href="/perfil"
                className="block text-white hover:text-blue-200 transition duration-200"
              >
                Seu Perfil
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export { Header };
