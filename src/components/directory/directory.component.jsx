
import { useState, useEffect } from 'react';

import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer} from './directory.styles';

const Directory = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://cdn.fs.teachablecdn.com/jXxMUj86Qf2pChV37EzI')
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  return (
    <DirectoryContainer>
      {categories.map((category) => {
        return (
          <DirectoryItem key={category.id} category={category} />
        );
      })}
    </DirectoryContainer>
  );
} 

export default Directory;
