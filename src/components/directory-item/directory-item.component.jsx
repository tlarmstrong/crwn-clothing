
import { useNavigate } from 'react-router-dom';

import { 
  DirectoryItemContainer, 
  BackgroundImage, 
  DirectoryItemBodyContainer 
} from './directory-item.styles';

const DirectoryItem = ({category}) => {
  const { title, imageUrl } = category;
  
  const navigate = useNavigate();
  const route = 'shop/'+title;

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <DirectoryItemBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBodyContainer>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
