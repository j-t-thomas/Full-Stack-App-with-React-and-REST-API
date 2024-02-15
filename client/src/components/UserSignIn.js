import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';
import UserContext from '../context/UserContext';

//COMPONENT
const UserSignIn = () => {
  const actions = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();


  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

//EVENT HANDLERS
  // Event handler for form submission. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let from = '/';
    if (location.state) {
      from = location.state.from;
    }
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(['Sign-in was unsuccessful']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Event handler for the 'Cancel' button.
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

//PAGE RENDERING
  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' ref={emailAddress} />
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={password} />
          <button className='button' type='submit'>Sign In</button><button className='button button-secondary' onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
      </div>
    </main>
  );
}

export default UserSignIn;