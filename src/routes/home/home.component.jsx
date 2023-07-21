
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Directory from '../../components/directory/directory.component';

// import './categories.styles.scss';
// initial error loading sass, used npm rebuild node-sass to fix

const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://cdn.fs.teachablecdn.com/jXxMUj86Qf2pChV37EzI')
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);
  console.log(categories);

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
}

export default Home;
