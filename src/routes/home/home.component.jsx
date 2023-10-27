
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

// import './categories.styles.scss';
// initial error loading sass, used npm rebuild node-sass to fix

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
}

export default Home;
