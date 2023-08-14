
import './product-card.styles.scss';

import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  console.log(product);
  // destructure off the product object
  const { name, price, imageUrl } = product;
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
        inputOptions = {{
          type: "button",
        }} 
      />
    </div>
  )
}

export default ProductCard;
