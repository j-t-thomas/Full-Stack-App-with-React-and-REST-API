import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import ErrorsDisplay from './ErrorsDisplay';
import UserContext from '../context/UserContext';

//COMPONENT
const UserSignUp = () => {
  const actions = useContext(UserContext);

  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

//EVENT HANDLERS
  // Event handler for form submission. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }
    try {
      const response = await api('/users', 'POST', user);
      if (response.status === 201) {
        console.log(`${user.emailAddress} is successfully signed up and authenticated!`);
        await actions.signIn(user);
        navigate('/signin');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
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
        <h2>Sign Up</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' ref={firstName} />
          <label htmlFor='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' ref={lastName} />
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' ref={emailAddress} />
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={password} />
          <button className='button' type='submit'>Sign Up</button><button className='button button-secondary' onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
      </div>
    </main>
  );
}

export default UserSignUp;