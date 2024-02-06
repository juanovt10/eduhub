import styles from './App.module.css'
import { NavBar } from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'; 
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div>
          <NavBar />
          <Container className={styles.Main} >
            <Switch>
              <Route exact path='/' render={() => <h1>Home</h1>} />
              <Route exact path='/courses' render={() => <h1>Courses</h1>} />
              <Route exact path='/about' render={() => <h1>About us</h1>} />
              <Route exact path='/contact' render={() => <h1>Contact</h1>} />
              <Route exact path='/signin' render={() => <SignInForm />} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;