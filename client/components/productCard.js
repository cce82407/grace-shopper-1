import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Stack, Heading, Button, Input } from "@chakra-ui/core";
import { addToCartThunk } from '../store/actionCreators'

const ProductCard = ({ product, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = (e, productId, quantity) => {
        e.preventDefault();
        addToCart(productId, quantity)
    }
    return (
        <div style={{ margin: '1em' }}>
            <Stack spacing='3'>
                <Heading as='h2' size='xl'>{product.name}</Heading>
                <Heading as='h4' size='md'>{product.description}</Heading>
                <p>${product.price}</p>
            </Stack>
            <Input
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            ></Input>
            <Button
                variantColor='green'
                size='xs'
                onClick={(e) => handleAddToCart(e, product.id, quantity)}
            >
                Add to Cart
            </Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity))
    }
}

export default connect(null, mapDispatchToProps)(ProductCard);