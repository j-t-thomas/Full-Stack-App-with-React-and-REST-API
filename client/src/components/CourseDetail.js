import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '../utils/apiHelper';
import Markdown from 'react-markdown';
import UserContext from '../context/UserContext';

//COMPONENT
const CourseDetail = () => {
  const [course, setCourse] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

//DATA FETCHING
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.log('Error fetching and parsing data', error);
      }
    };
    fetchCourse();
  }, [id]);

//EVENT HANDLERS
   // Event handler for the 'Delete' button.
   const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api(`/courses/${id}`, 'DELETE', course, authUser);
      if (response.status === 204) {
        console.log(`Your course '${course.title}' has been deleted!`);
        navigate('/');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

//PAGE RENDERING
  if (course) {
    return (
      <main>
        <div className='actions--bar'>
          <div className='wrap'>
            {authUser && authUser.id === course.User.id ? (
              <>
                <Link to={`/courses/${id}/update`} className='button'>Update Course</Link>
                <Link to='/' className='button' onClick={handleDelete}>Delete Course</Link>
              </>
            ) : (
              <>
              </>
            )}

            <Link to={`/courses/${id}/update`}className='button' style={{ display: 'none' }}>Update Course</Link>
            <Link to='/' className='button' onClick={handleDelete} style={{ display: 'none' }}>Delete Course</Link>
            <Link to='/' className='button button-secondary'>Return to List</Link>
          </div>
        </div>
        <div className='wrap'>
          <h2>Course Detail</h2>
          <form>
            <div className='main--flex'>
              <div>
                <h3 className='course--detail--title'>Course</h3>
                <h4 className='course--name'>{course.title}</h4>
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
                <Markdown>{course.description}</Markdown>
              </div>
              <div>
                <h3 className='course--detail--title'>Estimated Time</h3>
                <p>{course.estimatedTime}</p>
                <h3 className='course--detail--title'>Materials Needed</h3>
                <ul className='course--detail--list'>
                  <Markdown>{course.materialsNeeded}</Markdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  };
};

export default CourseDetail; 