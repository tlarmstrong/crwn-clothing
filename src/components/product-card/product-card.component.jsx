
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
  console.log(product);
  // destructure off the product object
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button 
        buttonType="inverted"
        displayText="Add to cart"
        options = {{
          type: "button",
          onClick: addProductToCart
        }} 
      />
    </div>
  )
}

export default ProductCard;
