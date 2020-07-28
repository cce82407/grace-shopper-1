import React from 'react';
import { Stack, Heading, Button } from "@chakra-ui/core";

const ProductCard = ({ product }) => {
    return (
        <div style={{ margin: '1em' }}>
            <Stack spacing='3'>
                <Heading as='h2' size='xl'>{product.name}</Heading>
                <Heading as='h4' size='md'>{product.description}</Heading>
                <p>${product.price}</p>
            </Stack>
            <Button
                variantColor='green'
                size='xs'
            >
                Add to Cart
            </Button>
        </div>
    );
}


export default ProductCard;