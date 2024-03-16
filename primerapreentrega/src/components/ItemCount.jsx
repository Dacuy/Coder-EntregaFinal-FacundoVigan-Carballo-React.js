import { useState } from "react";
import Swal from "sweetalert2";

const generateRandomNumber = () => {
  return Math.floor(10000 + Math.random() * 90000); // Genera un número aleatorio de 5 dígitos
};

const ItemCount = ({ stock, initial, productName, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleCountChange = (value) => {
    const newCount = count + value;
    if (newCount >= 0 && newCount <= stock) {
      setCount(newCount);
    }
  };

  const handleAdd = () => {
    if (count > 0) {
      const orderNumber = generateRandomNumber();
      Swal.fire({
        icon: "success",
        title: "¡Producto agregado al carrito!",
        html: `Se han agregado ${count} ${productName}(s) al carrito.<br> Número de encargo: ${orderNumber}`,
        footer: `Stock restante: ${stock - count}`,
        showCancelButton: true,
        confirmButtonText: "Proceder con el pago",
        cancelButtonText: "Seguir comprando",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Compra completada",
            text: `Número de encargo: ${orderNumber}`,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500 // Duración del mensaje en milisegundos
          });
        }
      });
      onAdd(count);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar al menos 1 producto para agregar al carrito.",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none w-full"
            onClick={() => handleCountChange(-1)}
          >
            -
          </button>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <span className="px-4">{count}</span>
        </div>
        <div className="col-span-1">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none w-full"
            onClick={() => handleCountChange(1)}
            disabled={count >= stock}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none w-full"
        onClick={handleAdd}
        disabled={count === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
