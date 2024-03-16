import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from '../utils/MockAsync.json';
import { ItemDetail } from "./ItemDetail";
import { fakeApiCall } from "../utils/fakeApiCall";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(products)
      .then(response => {
        const foundProduct = response.productos.find(item => item.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Producto con ID ${id} no encontrado.`);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del producto:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-20 h-20 mb-4 animate-spin rounded-full border-t-4 border-blue-500"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      {product ? (
        <ItemDetail item={product} />
      ) : (
        <p className="text-red-600">Producto no encontrado</p>
      )}
    </div>
  );
}

export default ItemDetailContainer;
