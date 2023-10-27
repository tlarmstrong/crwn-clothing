
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {
  ProductCardContainer,
  ProductImage,
  // ProductButton,
  ProductFooter,
  ProductName,
  ProductPrice
} from './product-card.styles';

const ProductCard = ({ product }) => {
  // destructure off the product object
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={`${name}`}/>
      <ProductFooter>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </ProductFooter>
      <Button 
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        displayText="Add to cart"
        options = {{
          type: "button",
          onClick: addProductToCart
        }} 
      />
    </ProductCardContainer>
  )
}

export default ProductCard;
