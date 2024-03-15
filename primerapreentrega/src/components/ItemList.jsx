import { useEffect ,useState } from 'react';
import products from '../utils/MockAsync.json';
import { Item } from './Item';
import { fakeApiCall } from '../utils/fakeapicall.js';

const ItemList = () => {
    const [productsCharged, setProductsCharged] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fakeApiCall(products).then(resp => { setProductsCharged(resp); setLoading(false) });
    }, []);

    if (loading) return <h1>Cargando...</h1>;

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsCharged.productos.map((item, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md transition-shadow hover:shadow-lg">
                        <Item item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
