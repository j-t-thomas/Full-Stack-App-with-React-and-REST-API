import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

//COMPONENT
const Header = () => {
  const { authUser } = useContext(UserContext);

//PAGE RENDERING
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'><Link to='/'>Courses</Link></h1>
        <nav>
          {authUser === null?
          <>
            <ul className='header--signedout'>
              <li><Link to='/signup'>Sign up</Link></li>
              <li><Link to='/signin'>Sign in</Link></li>
            </ul>
          </>
          :
          <>
            <ul className='header--signedin'>
            <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
              <li><Link to='/signout'>Sign out</Link></li>
            </ul>
          </>
        }
        </nav>
      </div>
    </header>
  );
};

export default Header;