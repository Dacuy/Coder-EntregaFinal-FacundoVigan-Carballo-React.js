import { useState } from "react";
import CartWidget from "./CartWidget";
import logo from "../assets/logo.svg"
const Navbar = () => {
const [showCategories, setShowCategories] = useState(false)


    return (
        <nav className="bg-cyan-600 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="mr-20">
                    <img width={40} className="logo" src={logo} alt="Logo"></img>
                </div>
                <div className="flex items-center justify-center flex-grow">
                    <img src="" alt=""></img>
                    <form className="bg-white p-2 h-[20%] w-full rounded-lg" action="">
                        <input type="text"></input>
                    </form>
                </div>
                <div className="ml-20 flex items-center justify-end">
                    <ul className="flex space-x-4 justify-end">
                        <li>
                            <button className="text-white text-xl" onClick={() => setShowCategories(!showCategories)}>Categorias</button>
                            {showCategories &&(
                                <ul className="absolute bg-white text-xl w-[20%] rounded-lg">
                                    <li><button className="hover:underline">Categoria1</button></li>
                                    <li><button className="hover:underline">Categoria2</button></li>
                                    <li><button className="hover:underline">Categoria3</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button className="text-white text-xl">Productos</button>
                        </li>
                        <li>
                        <button className="text-white text-xl">Contacto</button>
                        </li>
                        <li>
                        <CartWidget/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;