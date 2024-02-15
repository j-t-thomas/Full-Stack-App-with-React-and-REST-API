import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

//COMPONENT AND ROUTES
function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail/>} />
          <Route element={<PrivateRoute />}>
            <Route path='/courses/create' element={<CreateCourse/>} />
            <Route path='/courses/:id/update' element={<UpdateCourse />}/>
          </Route>
          <Route path='/signin' element={<UserSignIn />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/signout' element={<UserSignOut  />} />
        </Routes>
      </div>
  );
};

export default App;

