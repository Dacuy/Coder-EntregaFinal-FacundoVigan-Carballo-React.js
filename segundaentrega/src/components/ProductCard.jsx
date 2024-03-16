import { Link } from "react-router-dom";

const ProductCard = ({ producto }) => {
  return (
    <Link to={`/item/${producto.id}`}>
      <div className="max-w-xs mx-auto overflow-hidden bg-white shadow-lg rounded-lg">
        <img className="w-full h-48 object-cover" src={producto.imagen} alt={producto.nombre} />
        <div className="py-4 px-6">
          <h2 className="text-gray-800 text-xl font-semibold mb-2">{producto.nombre}</h2>
          <p className="text-gray-700">{producto.descripcion}</p>
          <p className="text-gray-700 mt-2">Precio: ${producto.precio.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
