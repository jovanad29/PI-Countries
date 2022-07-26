import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import FormActivity from './components/FormActivity';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/home' component={Home} exact />
        <Route path='/home/:id' children={(props) => <CountryDetail {...props} />} />
        <Route path='/activity' component={FormActivity} />
        <Route path='/' exact>
          <div className='text-container'>
            <h1>Henry Countries</h1>
            <h2>Individual Proyect</h2>
            <Link to='/home' className='btn btn-enter'>Let's Travel!</Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
