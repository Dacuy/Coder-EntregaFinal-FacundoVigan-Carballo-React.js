import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const ItemListContainer = () => {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    
    const getCategorias = collection(db, 'categorias');
    getDocs(getCategorias).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('No hay categorías');
      }
      setCategorias(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const getProductosByCategoria = query(collection(db, 'productos'), where("categoria", "==", parseInt(id)));
    getDocs(getProductosByCategoria).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('No hay productos');
      }
      setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Categorías</h1>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {categorias.map((categoria, index) => (
          <Link key={index} to={`/category/${categoria.id}`}>
            <div className={`p-2 rounded shadow-md hover:bg-blue-500 hover:text-white ${parseInt(id) === categoria.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <h2 className="text-lg font-semibold">{categoria.nombre}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">{productos.length > 0 ? `Productos de la categoría` : 'No hay productos disponibles en esta categoría'}</h2>
        <div className="grid grid-cols-3 gap-4">
          {productos.map((producto, index) => (
            <Link key={index} to={`/item/${producto.id}`}>
              <div className="bg-white p-4 rounded shadow-md flex flex-col items-center justify-center">
                <img src={producto.imagen} alt={producto.nombre} className="mb-2 w-24 h-24 object-cover bg-white rounded-full p-1" />
                <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemListContainer;
