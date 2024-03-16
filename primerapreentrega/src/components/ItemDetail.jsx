import ItemCount from "./ItemCount";

export const ItemDetail = ({ item }) => {
  const handleAdd = () => {
    console.log('Agregar al carrito');
  }

  const { id, nombre, descripcion, precio, stock, imagen, isOnDiscount, categoria } = item;

  return (
    <div className="max-w-6xl mx-auto my-8 overflow-hidden rounded-lg shadow-lg border border-gray-200 mt-8">
      <div className="flex">
        <img src={imagen} alt={nombre} className="w-1/2 h-auto object-cover" />
        <div className="p-6 flex flex-col justify-between w-1/2">
          <div>
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">{nombre}</h3>
            <p className="text-lg md:text-2xl text-gray-900 mb-2">Precio: ${precio.toFixed(2)}</p>
            {isOnDiscount && (
              <span className="inline-block bg-red-500 text-white text-lg font-semibold px-2 py-1 rounded-full mb-2">
                ¡Descuento!
              </span>
            )}
            <p className="text-base md:text-lg text-gray-700 mb-2">Categoría: {categoria.nombre}</p>
            <p className="text-base md:text-lg text-gray-700 mb-2">
              Disponibilidad: 
              <span className={`inline-block ml-2 ${stock > 0 ? 'bg-green-500' : 'bg-red-500'} text-white text-lg font-semibold px-2 py-1 rounded-full`}>
                {stock > 0 ? 'Disponible' : 'No disponible'}
              </span>
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-8">{descripcion}</p>
          </div>
          <ItemCount stock={stock} initial={0} onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}
