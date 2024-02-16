import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';
import { api } from '../utils/apiHelper';

//COMPONENT
const CreateCourse  =  () => {
  // Creates a navigate function used to navigate to different pages.
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: authUser.id
  });
  const [errors, setErrors] = useState([]);

//EVENT HANDLERS
  // Event handler that updates the state based on the user's input. 
  const handleInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Event handler for form submission. 
  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await api('/courses', 'POST', course, authUser);
      if (response.status === 201) {
        console.log(`Your new course '${course.title}' has been added!`);
        navigate('/');
      } else {
        const errorsResponse = await response.json();
        setErrors(errorsResponse.errors);
      }
  };
    
  // Event handler for the 'Cancel' button.
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

//PAGE RENDERING
  // Renders the new Course page.
    return (
        <main>
          <div className='wrap'>
            <h2>Create Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
              <div className='main--flex'>
                <div>
                  <label htmlFor='title'>Course Title</label>
                  <input id='title' onChange={handleInput} name='title' type='text' />
                  <p>By {authUser.firstName} {authUser.lastName}</p>
                  <label htmlFor='description'>Course Description</label>
                  <textarea id='description' onChange={handleInput} name='description' />
                </div>
                <div>
                  <label htmlFor='estimatedTime'>Estimated Time</label>
                  <input id='estimatedTime' onChange={handleInput} name='estimatedTime' type='text' />
                  <label htmlFor='materialsNeeded'>Materials Needed</label>
                  <textarea id='materialsNeeded' onChange={handleInput} name='materialsNeeded' />
                </div>
              </div>
              <button className='button' type='submit'>Create Course</button>
              <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </main>
    );
  }

export default CreateCourse;