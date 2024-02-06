import styles from './App.module.css'
import { NavBar } from './components/NavBar';
// import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'; 
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import Home from './pages/home/Home';

function App() {

  return (
        <div>
          <NavBar />
          <div className={styles.Main} >
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route exact path='/courses' render={() => <h1>Courses</h1>} />
              <Route exact path='/about' render={() => <h1>About us</h1>} />
              <Route exact path='/contact' render={() => <h1>Contact</h1>} />
              <Route exact path='/signin' render={() => <SignInForm />} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </div>
        </div>
  );
}

export default App;