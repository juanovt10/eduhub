import React from 'react';
import styles from './App.module.css'
import { NavBar } from './components/NavBar';
import './index.css';
// import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'; 
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import Home from './pages/home/Home';
import CourseCreateForm from './pages/courses/CourseCreateForm';
import CoursePage from './pages/courses/CoursePage';
import CoursesPage from './pages/courses/CoursesPage';
import ProfilePage from './pages/profiles/ProfilePage';
import CreateProfileForm from './pages/profiles/CreateProfileForm';
import Authenticator from './pages/auth/Authenticator';


function App() {

  return (
        <div className={styles.background}>
          <NavBar />
          <div className={styles.Main} >
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route exact path='/courses' render={() => <CoursesPage />} />
              <Route exact path='/courses/create' render={() => <CourseCreateForm />} />
              <Route exact path='/courses/:id' render={() => <CoursePage />} />
              <Route exact path='/about' render={() => <h1>About us</h1>} />
              <Route exact path='/contact' render={() => <h1>Contact</h1>} />
              <Route exact path='/auth' render={() => <Authenticator />} />
              <Route exact path='/signin' render={() => <SignInForm />} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route exact path='/profiles/create' render={() => <CreateProfileForm mode='create'/>} />
              <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </div>
        </div>
  );
}

export default App;