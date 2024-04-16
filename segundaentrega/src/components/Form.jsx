import { useRef } from "react";

const Form = ({ handleSubmit }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const paymentMethodRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      paymentMethod: paymentMethodRef.current.value,
    };
    handleSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Datos de Pago</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre</label>
          <input ref={nameRef} id="name" type="text" placeholder="Nombre" className="w-full p-2 mt-1 rounded-md border" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input ref={emailRef} id="email" type="email" placeholder="Email" className="w-full p-2 mt-1 rounded-md border" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">Dirección</label>
          <input ref={addressRef} id="address" type="text" placeholder="Dirección" className="w-full p-2 mt-1 rounded-md border" required />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-600">Método de Pago</label>
          <select ref={paymentMethodRef} id="paymentMethod" className="w-full p-2 mt-1 rounded-md border" required>
            <option value="paypal">PayPal</option>
            <option value="debit">Debito</option>
            <option value="credit">Credito</option>
            <option value="pay_later">Pagar mas tarde</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Form;
