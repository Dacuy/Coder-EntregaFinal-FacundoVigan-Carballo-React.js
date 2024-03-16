import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import categories from '../utils/MockAsync.json';
import { fakeApiCall } from "../utils/fakeApiCall";

const ItemListContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(categories).then(res => {
      setResponse(res);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-20 h-20 mb-4 animate-spin rounded-full border-t-4 border-blue-500"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  );

  const getProductosByCategory = (catId) => {
    if (catId) {
      return response.productos.filter((product) => product.categoria === parseInt(catId));
    } else {
      return response.productos;
    }
  };

  const productsPorCategoria = getProductosByCategory(id);

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Categorías</h1>
        <div className="flex flex-wrap justify-center">
          {response.categorias && response.categorias.map((cat, index) => (
            <Link key={`cat_${index}_${cat.id}`} to={`/category/${cat.id}`} className="mx-4 my-2 px-4 py-2 bg-gray-200 rounded-md text-lg">
              <h2>{cat.nombre}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Productos</h1>
        <div className="grid grid-cols-3 gap-4">
          {productsPorCategoria && productsPorCategoria.map((producto, index) => (
            <Link key={`producto_${index}_${producto.id}`} to={`/item/${producto.id}`} className="w-full">
              <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-32 object-cover mb-4" />
                <h2 className="text-xl font-bold">{producto.nombre}</h2>
                <p className="text-gray-700 mt-2">Precio: ${producto.precio.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {location.pathname !== "/" && (
        <div className="container mx-auto mt-8">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">Ver Todo</Link>
        </div>
      )}
    </>
  );
}

export default ItemListContainer;
