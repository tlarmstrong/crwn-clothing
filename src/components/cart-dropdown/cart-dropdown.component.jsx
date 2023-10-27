
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      { cartItems.length ?
        (<CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItems>) :
        (<EmptyMessage>Cart is empty</EmptyMessage>)
      }
      { cartItems.length ?
        (<Button 
          buttonType={BUTTON_TYPE_CLASSES.base}
          displayText="CHECKOUT"
          options = {{
            type: "button",
            onClick: goToCheckout
          }} >
        </Button>) : ''
      }
    </CartDropdownContainer>
  );
}

export default CartDropdown;
