import { useState } from "react";
import CartWidget from "./CartWidget";
import Unicorn from '../../public/Unicorn.svg';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //busqueda
    console.log('Buscar:', searchInput);
  };

  return (
    <nav className="bg-blue-700 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={Unicorn} alt="Unicorn" className="w-12 h-12" />
          <Link to="/" className="text-white text-lg font-semibold hover:text-blue-200">
            Volver al Inicio
          </Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center flex-grow mx-6">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
            className="px-4 py-2 rounded-l-md focus:outline-none flex-grow"
          />
          <button type="submit" className="bg-white text-blue-700 px-4 py-2 rounded-r-md rounded-l-none focus:outline-none hover:bg-blue-100">
            Buscar
          </button>
        </form>

        <div className="flex items-center space-x-6">
          <Link to="/products" className="text-white text-lg hover:text-blue-200">Productos</Link>
          <Link to="/contact" className="text-white text-lg hover:text-blue-200">Contacto</Link>
          <div className="relative">
            <button className="text-white text-lg focus:outline-none" onClick={() => setShowCategories(!showCategories)}>
              Categorías
            </button>
            {showCategories && (
              <ul className="absolute bg-white text-lg rounded-lg shadow-md py-2 mt-2 w-48 z-10">
                <li>
                  <Link to="/category/1" className="block px-4 py-2 hover:bg-blue-100">Yerbas</Link>
                </li>
                <li>
                  <Link to="/category/2" className="block px-4 py-2 hover:bg-blue-100">Dulces</Link>
                </li>
                <li>
                  <Link to="/category/3" className="block px-4 py-2 hover:bg-blue-100">Termos</Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        <CartWidget />
      </div>
    </nav>
  );
}

export default Navbar;
