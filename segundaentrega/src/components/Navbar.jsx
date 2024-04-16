import { useEffect, useState, useContext } from "react";
import CartWidget from "./CartWidget";
import Unicornio from '../../public/Unicorn.svg';
import { NavLink } from "react-router-dom";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useContext(CartContext);
  const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const db = getFirestore();
    const getItemsByDoc = collection(db, 'categorias');
    getDocs(getItemsByDoc).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('no resultado');
      }
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="text-white font-bold text-xl flex items-center">
          <img src={Unicornio} alt="" className="w-8 h-8 mr-2" />
        </NavLink>

        <div className="flex-grow mx-8">
          <form className="bg-white p-2 rounded-lg flex items-center">
            <input type="text" placeholder="Buscar productos" className="w-full p-2 rounded-md outline-none" />
            <button type="submit" className="ml-2 bg-blue-700 text-white p-2 rounded-md">
              Buscar
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink to="/order-search" className="text-white text-xl">
            Buscar Orden
          </NavLink>

          <div className="relative">
            <button 
              className="text-white text-xl"
              onClick={toggleCategories}
            >
              Categorías
            </button>
            {showCategories && (
              <div className="absolute left-0 mt-2 bg-white text-blue-600 text-xl p-2 rounded-lg shadow-lg z-10 border border-gray-200">
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <NavLink
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block hover:bg-blue-200 py-1 px-4 rounded-md"
                    >
                      {cat.nombre}
                    </NavLink>
                  ))}
              </div>
            )}
          </div>

          <NavLink to="/items" className="text-white text-xl">
            Productos
          </NavLink>
          <NavLink to="/contact" className="text-white text-xl">
            Contacto
          </NavLink>
          <NavLink to="/cart" className="text-white text-xl">
            <CartWidget totalProducts={totalProducts} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
