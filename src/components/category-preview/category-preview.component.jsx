
import ProductCard from '../product-card/product-card.component';

import { 
  CategoryPreviewContainer, 
  CategoryTitle, 
  CategoryPreviewProduct
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{ title.toUpperCase() }</CategoryTitle>
      </h2>
      <CategoryPreviewProduct>
        {
          products
            .filter((_, idx) => idx < 4)
            .map((product) => 
              <ProductCard key={product.id} product={product} />
            )
        }
      </CategoryPreviewProduct>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
