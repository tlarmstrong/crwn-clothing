
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  ImageContainer,
  ItemImage,
  ItemDetail,
  ItemQuantity,
  ItemArrow,
  ItemValue,
  RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const { 
    addItemToCart,
    removeItemFromCart, 
    clearItemFromCart 
  } = useContext(CartContext);

  const { name, imageUrl, price, quantity } = cartItem;

  const incrementItemQuantityHandler = () => addItemToCart(cartItem);
  const decrementItemQuantityHandler = () => removeItemFromCart(cartItem);
  const clearCartItemHandler = () => clearItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ItemImage src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <ItemDetail>{name}</ItemDetail>
      <ItemQuantity>
        <ItemArrow onClick={decrementItemQuantityHandler}>&#10094;</ItemArrow>
        <ItemValue>{quantity}</ItemValue>
        <ItemArrow onClick={incrementItemQuantityHandler}>&#10095;</ItemArrow>
      </ItemQuantity>
      <ItemDetail>{price}</ItemDetail>
      <RemoveButton onClick={clearCartItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
