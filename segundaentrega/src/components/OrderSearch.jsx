import { useState } from "react";
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const OrderSearch = () => {
  const [formData, setFormData] = useState({ email: "", orderId: "", password: "" });
  const [orderData, setOrderData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const ordersCollection = collection(db, 'orders');

    const q = query(ordersCollection, 
                    where("buyer.email", "==", formData.email),
                    where("password", "==", parseInt(formData.password, 10)));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.find(doc => doc.id === formData.orderId)?.data();
        if (data) {
          setOrderData(data);
        } else {
          toast.error("El número de orden, el password o el correo electrónico son incorrectos.");
        }
      } else {
        toast.error("El número de orden, el password o el correo electrónico son incorrectos.");
      }
    } catch (error) {
      console.error("Error searching order:", error);
      toast.error("Error al buscar la orden.");
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Buscar Orden</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 mt-1 rounded-md border" 
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-600">Número de Orden</label>
          <input 
            id="orderId" 
            name="orderId" 
            type="text" 
            placeholder="Número de Orden" 
            className="w-full p-2 mt-1 rounded-md border" 
            value={formData.orderId} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 mt-1 rounded-md border" 
            value={formData.password} 
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Buscar Orden
        </button>
      </form>
      {orderData && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Detalles de la Orden</h3>
          <p><strong>Fecha:</strong> {orderData.date.toDate().toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${calculateTotal(orderData.items)} {orderData.paymentMethod === "pay_later" && <span className="bg-red-500 text-white rounded-md px-2 py-1 ml-2 text-xs">Falta pagar</span>}</p>
          <p><strong>Estado:</strong> {orderData.status === 'pending' ? <span className="bg-yellow-300 text-yellow-800 rounded-md px-2 py-1 text-xs">Pendiente</span> : "Aprobado"}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Ítems de la Orden</h4>
            <ul>
              {orderData.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 mb-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearch;
