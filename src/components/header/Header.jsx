import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVendasDropdownOpen, setIsVendasDropdownOpen] = useState(false);
  const [isVendedoresDropdownOpen, setIsVendedoresDropdownOpen] =
    useState(false);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!authState.access_token) {
    return null;
  }

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prevState) => !prevState);
  };

  return (
    <header className="bg-green-500 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-lg sm:text-xl font-bold">
            The Store
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 relative">
          {/* Vendas Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown(setIsVendasDropdownOpen)}
              className="flex items-center space-x-2 navLink"
            >
              <span>Vendas</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isVendasDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isVendasDropdownOpen && (
              <div className="absolute top-full left-0 bg-green-600 shadow-lg rounded mt-2 z-10 transition-all">
                <ul className="flex flex-col p-2">
                  <li>
                    <a
                      href="/vendas"
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Mostrar
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vendas/lancamento"
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Nova
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Vendedores Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown(setIsVendedoresDropdownOpen)}
              className="flex items-center space-x-2 navLink"
            >
              <span>Vendedores</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isVendedoresDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isVendedoresDropdownOpen && (
              <div className="absolute top-full left-0 bg-green-600 shadow-lg rounded mt-2 z-10 transition-all">
                <ul className="flex flex-col p-2">
                  <li>
                    <a
                      href="/vendedores"
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Mostrar
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vendedores/cadastrar"
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Cadastrar
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Seu Perfil */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown(setIsMenuOpen)}
              className="flex items-center space-x-2 navLink"
            >
              <span>{authState.user?.name || "Perfil"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-full left-0 bg-green-600 shadow-lg rounded mt-2 z-10 transition-all">
                <ul className="flex flex-col p-2">
                  <li>
                    <a
                      href="/perfil"
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Perfil
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(logout())}
                      className="block px-4 py-2 text-white hover:bg-green-500 rounded"
                    >
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
                className="block text-white hover:text-green-700 transition duration-200"
              >
                Mostrar
              </a>
            </li>
            <li>
              <a
                href="/vendas/lancamento"
                className="block text-white hover:text-green-700 transition duration-200"
              >
                Nova
              </a>
            </li>
            <li>
              <a
                href="/vendedores"
                className="block text-white hover:text-green-700 transition duration-200"
              >
                Mostrar
              </a>
            </li>
            <li>
              <a
                href="/vendedores/cadastrar"
                className="block text-white hover:text-green-700 transition duration-200"
              >
                Cadastrar
              </a>
            </li>
            <li>
              <a
                href="/perfil"
                className="block text-white hover:text-green-700 transition duration-200"
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
