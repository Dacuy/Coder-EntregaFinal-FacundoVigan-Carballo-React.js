import Cart from '../assets/carrito.svg'
const CartWidget = () => {
    return (  
        <>
        <div className='flex'>
            <img width={30} className='' src={Cart} alt='cart'></img>
            <span className='text-white'>(10)</span>
        </div>
        </>
    );
}
 
export default CartWidget;