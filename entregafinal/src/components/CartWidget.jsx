import { useContext } from 'react';
import Cart from '../assets/Cart.svg';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.item.precio * item.quantity), 0);
  const totalWithIva = totalPrice * 1.22;

  return (
    <div className="flex items-center">
      <img src={Cart} alt='carrito' width={'30'} />
      <span className="ml-2 bg-blue-400 text-white rounded-full px-2">
        {totalProducts}
      </span>

    </div>
  );
};

export default CartWidget;