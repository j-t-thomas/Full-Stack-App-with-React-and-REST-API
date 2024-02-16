import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';
import { api } from '../utils/apiHelper';
import axios from 'axios';

//COMPONENT
const UpdateCourse = () => {
  // Authenticated user.
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [updateCourse, setUpdateCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: authUser.id
  });
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

//DATA FETCHING
useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
      const data = await response.data[0];
      setCourse(data);
      setUpdateCourse(data);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  };
  fetchCourse();
}, []);



//EVENT HANDLERS
  

  // Event handler for the 'Cancel' button.
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

   // Event handler for form submission. 
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateCourse);
      const response = await api(`/courses/${id}`, 'PUT', updateCourse, authUser);
      console.log(response.status);
      if (response.status === 204) {
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } 
  };

//PAGE RENDERING
  if (course) {
    return (
      <main>
        <div className='wrap'>
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className='main--flex'>
              <div>
                <label htmlFor='courseTitle'>Course Title</label>
                <input id='courseTitle' name='title' 
                onChange={(e) =>
                  setUpdateCourse({ ...updateCourse, title: e.target.value })
                }
                type='text' value={updateCourse.title} />
                <p>By Joe Smith</p>
                <label htmlFor='courseDescription'>Course Description</label>
                <textarea id='courseDescription' name='description' 
                 onChange={(e) =>
                  setUpdateCourse({ ...updateCourse, description: e.target.value })
                }
                value={updateCourse.description} />
              </div>
              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input id='estimatedTime' name='estimatedTime' type='text' 
                onChange={(e) =>
                  setUpdateCourse({ ...updateCourse, estimatedTime: e.target.value })
                }
                value={updateCourse.estimatedTime} />
                <label htmlFor='materialsNeeded'>Materials Needed</label>
                <textarea id='materialsNeeded' name='materialsNeeded' 
                onChange={(e) =>
                  setUpdateCourse({ ...updateCourse, materialsNeeded: e.target.value })
                }
                value={updateCourse.materialsNeeded} />
              </div>
            </div>
            <button className='button' type='submit'>Update Course</button><button className='button button-secondary' onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </main>
    );
  }
};

export default UpdateCourse;