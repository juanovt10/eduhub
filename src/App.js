import React from 'react';
import styles from './App.module.css'
import { NavBar } from './components/NavBar';
import './index.css';
import { Route, Switch } from 'react-router-dom'; 
import './api/axiosDefaults';
import Home from './pages/home/Home';
import CoursePage from './pages/courses/CoursePage';
import CoursesPage from './pages/courses/CoursesPage';
import ProfilePage from './pages/profiles/ProfilePage';
import Authenticator from './pages/auth/Authenticator';

function App() {

  return (
        <div className={styles.background}>
          <NavBar />
          <div className={styles.Main} >
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route exact path='/courses' render={() => <CoursesPage />} />
              <Route exact path='/courses/:id' render={() => <CoursePage />} />
              <Route exact path='/auth' render={() => <Authenticator />} />
              <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </div>
        </div>
  );
}

export default App;