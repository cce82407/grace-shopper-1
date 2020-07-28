import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input } from "@chakra-ui/core";

const Cart = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <Input
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder='quantity'
                size='s'
                variant='outline'
            />
        </div>
    );
}



export default connect(null)(Cart);