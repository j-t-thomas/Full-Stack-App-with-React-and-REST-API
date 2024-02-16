// import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Header = () => {
  const { authUser } = useContext(UserContext);

  return (
      <header>
          <div className="wrap header--flex">
              <h1 className="header--logo"><a href="/">Courses</a></h1>
              <nav>
                  <ul className="header--signedout">
                  { authUser === null ?
                  <>
                      <li><a href="/signup">Sign Up</a></li>
                      <li><a href="/signin">Sign In</a></li>
                  </>
                  :
                  <>
                      <span>Welcome {authUser.firstName}</span>
                      <li><a href="/signout">Sign Out</a></li>
                  </>
                  }
                  </ul>
              </nav>
          </div>
      </header>
  );
};

export default Header;