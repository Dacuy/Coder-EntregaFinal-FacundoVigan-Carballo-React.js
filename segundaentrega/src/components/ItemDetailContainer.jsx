//agrupador de componentes

import { useEffect, useState } from "react";
import { ItemDetail } from "./ItemDetail";
import { useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
const ItemDetailContainer = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() =>{
    const db = getFirestore();
    if(id){
      const getProduct = query(collection(db, 'productos'), where("id", "==", parseInt(id)))
      getDocs(getProduct).then((snapshot) => {
        if(snapshot.size === 0) {
          console.log("No hay categorias")
        }
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
        setLoading(false)
      })
    }else{
      const getProducts = collection(db, 'productos')
      getDocs(getProducts).then((snapshot) => {
        if(snapshot.size === 0) {
          console.log("No hay categorias")
        }
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
        setLoading(false)
      })        
    }
    
  }, [id])





  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div>
      {products && products.map((item, index) => <ItemDetail key={index} item={item} />)}
    </div>
  );
};


export default ItemDetailContainer;