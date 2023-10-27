
import { createContext, useState, useEffect } from 'react';
import { 
  // addCollectionAndDocuments,
  getCategoriesAndDouments 
} from '../utils/firebase/firebase.utils';

// initially used to add products
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // used to add products to the database; one time use
/*  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA)
  }, []);*/

  useEffect(() => {
    // if connecting to async function in useEffect, 
    // need to wrap call in async function
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDouments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [])

  const value = {categoriesMap};
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
}
