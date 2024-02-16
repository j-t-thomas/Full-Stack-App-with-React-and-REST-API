import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

//COMPONENT
const UserSignOut = () => {
  const { actions } = useContext(UserContext);
    useEffect(() => {

      if (actions && actions.signOut) {
      actions.signOut(); 
    }
  }, [actions]);

  return <Navigate to='/' replace />;
}

export default UserSignOut;