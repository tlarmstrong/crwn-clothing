
import { createContext, useState, useEffect } from 'react';
import { 
  // addCollectionAndDocuments,
  getCategoriesAndDouments 
} from '../utils/firebase/firebase.utils';

// initially used to add products
// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);

  // used to add products to the database; one time use
/*  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA)
  }, []);*/

  useEffect(() => {
    // if connecting to async function in useEffect, 
    // need to wrap call in async function
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDouments();
      console.log(categoryMap);
    }
    getCategoriesMap();
  }, [])

  const value = {products};
  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}
