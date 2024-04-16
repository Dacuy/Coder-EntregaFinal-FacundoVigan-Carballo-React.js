import { toast } from "react-toastify";
import ItemCount from "./ItemCount";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const ItemDetail = ({ item }) => {
  const { nombre, imagen, precio, isOnDiscount, descripcion, stock } = item;

  const { addItem, cart, removeItem } = useContext(CartContext);

  const onAdd = (quantity) => {
    addItem(item, quantity);
    toast('El item fue agregado correctamente');
  };

  const onRemove = (quantity) => {
    removeItem(item.id, quantity);
    toast('El item fue eliminado correctamente');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 p-8">
            <img src={imagen} alt={nombre} className="w-full h-full object-cover rounded-lg" />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h1 className="font-bold text-4xl mb-6">{nombre}</h1>
            <p className="text-gray-700 text-3xl mb-4">${precio}</p>
            <p className={`text-${isOnDiscount ? 'red' : 'green'}-500 text-3xl mb-6`}>
              {isOnDiscount ? `¡En descuento!` : `Precio regular`}
            </p>
            <p className="text-gray-700 text-3xl mb-6">Stock: {stock}</p>
            <p className="text-gray-700 text-xl mb-6">{descripcion}</p>
            <ItemCount stock={stock} initial={0} item={item} onAdd={onAdd} onRemove={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;