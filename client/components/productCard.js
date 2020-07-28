import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
            <p>${product.price}</p>
        </div>
    );
}


export default ProductCard;