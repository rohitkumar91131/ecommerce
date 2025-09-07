"use client"
const { createContext, useState, useContext } = require("react");

const ProductsContext = createContext();
export const ProductsProvider = ({children}) =>{
    const [allProducts , setAllProducts] = useState([]);
    const [filteredProducts , setFilteredProducts ] = useState([]);
    return <ProductsContext.Provider value={{allProducts , setAllProducts ,filteredProducts , setFilteredProducts }}>
        {children}
    </ProductsContext.Provider>
}

export const useProduct = () => useContext(ProductsContext);