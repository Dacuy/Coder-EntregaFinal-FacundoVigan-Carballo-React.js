import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Form from './Form';
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, clearCart, removeItem } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);

  const generatePassword = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleSubmit = async (formData) => {
    const db = getFirestore();
    const ordersCollection = collection(db, 'orders');
    const password = generatePassword();
    const status = formData.paymentMethod === "pay_later" ? "pending" : "approved";

    const newOrder = {
      buyer: formData,
      items: cart.map(item => ({
        id: item.item.id,
        name: item.item.nombre,
        price: item.item.precio,
        quantity: item.quantity,
        image: item.item.imagen,
      })),
      date: Timestamp.fromDate(new Date()),
      status: status,
      password: password,
      paymentMethod: formData.paymentMethod
    };

    try {
      const docRef = await addDoc(ordersCollection, newOrder);
      const orderNumber = docRef.id;
      toast.success(`Orden agregada con éxito, anota estos datos para poder rastrearla. Orden: ${orderNumber}, Password: ${password}`, {
        autoClose: 8000,
        onClose: () => {
          clearCart();
          setShowForm(false);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error adding order: ", error);
      toast.error('Error al agregar la orden');
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.item.precio * item.quantity), 0);
  const totalWithTax = total * 1.22;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item.item.id} className="flex items-center justify-between border-b pb-2 mb-2">
            <img src={item.item.imagen} alt={item.item.nombre} className="w-16 h-16 object-cover rounded-md" />
            <div className="ml-4">
              <p className="font-semibold">{item.item.nombre}</p>
              <p>Precio: ${item.item.precio}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
            <button className="text-red-500" onClick={() => removeItem(item.item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mb-4">
        <p className="text-gray-700">Subtotal: ${total.toFixed(2)}</p>
        <p className="text-gray-700">IVA (22%): ${((total * 0.22)).toFixed(2)}</p>
      </div>

      {showForm ? (
        <Form handleSubmit={handleSubmit} />
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>Finalizar Compra</button>
      )}

    </div>
  );
};

export default CartPage;
